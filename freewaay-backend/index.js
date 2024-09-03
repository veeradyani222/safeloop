const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const AWS = require('aws-sdk');
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Initialize AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableNameProducts = 'Products';
const tableNameUsers = 'Users';

app.use(express.json());
app.use(cors());

// S3 configuration
const upload = multer({
    storage: multer.memoryStorage(), // Using memory storage to upload to S3 directly
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

// Upload endpoint for images
app.post("/upload", upload.single('product'), (req, res) => {
    const file = req.file;
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `images/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error("Error uploading to S3:", err);
            return res.status(500).json({ success: false, error: "Failed to upload image" });
        }
        res.json({
            success: true,
            image_url: data.Location
        });
    });
});

// Helper functions for DynamoDB operations
const getNextProductId = async () => {
    const params = {
        TableName: tableNameProducts,
        ScanIndexForward: false,
        Limit: 1
    };
    const result = await dynamodb.scan(params).promise();
    const lastProduct = result.Items[0];
    return lastProduct ? lastProduct.id + 1 : 1;
};

const getUser = async (email) => {
    const params = {
        TableName: tableNameUsers,
        Key: { email }
    };
    const result = await dynamodb.get(params).promise();
    return result.Item;
};

const saveProduct = async (product) => {
    const params = {
        TableName: tableNameProducts,
        Item: product
    };
    return dynamodb.put(params).promise();
};

const deleteProduct = async (id) => {
    const params = {
        TableName: tableNameProducts,
        Key: { id }
    };
    return dynamodb.delete(params).promise();
};

const updateUser = async (email, update) => {
    const params = {
        TableName: tableNameUsers,
        Key: { email },
        UpdateExpression: 'set #cartData = :cartData',
        ExpressionAttributeNames: {
            '#cartData': 'cartData'
        },
        ExpressionAttributeValues: {
            ':cartData': update
        }
    };
    return dynamodb.update(params).promise();
};

// Endpoints
app.get("/", (req, res) => {
    res.send("Express app is running");
});

app.post('/addproduct', async (req, res) => {
    try {
        const id = await getNextProductId();
        const product = {
            id,
            ...req.body,
            date: new Date().toISOString(),
            available: true
        };
        await saveProduct(product);
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: "Failed to add product" });
    }
});

app.post('/removeproduct', async (req, res) => {
    try {
        await deleteProduct(req.body.id);
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ error: "Failed to remove product" });
    }
});

app.get('/allproducts', async (req, res) => {
    const params = {
        TableName: tableNameProducts
    };
    const result = await dynamodb.scan(params).promise();
    res.send(result.Items);
});

app.post('/signup', async (req, res) => {
    try {
        const user = await getUser(req.body.email);
        if (user) {
            return res.status(400).json({ success: false, errors: "This user already exists." });
        }
        const cart = Array(300).fill(0);
        const newUser = {
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
            Date: new Date().toISOString()
        };
        await dynamodb.put({ TableName: tableNameUsers, Item: newUser }).promise();
        const token = jwt.sign({ user: { email: newUser.email } }, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ error: "Failed to sign up user" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await getUser(req.body.email);
        if (user && req.body.password === user.password) {
            const token = jwt.sign({ user: { email: user.email } }, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login user" });
    }
});

app.get('/newcollections', async (req, res) => {
    try {
        const result = await dynamodb.scan({ TableName: tableNameProducts }).promise();
        const products = result.Items;
        const newCollections = products.slice(-9);
        res.send(newCollections);
    } catch (error) {
        console.error("Error fetching new collections:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/popularnow', async (req, res) => {
    try {
        const result = await dynamodb.scan({ TableName: tableNameProducts }).promise();
        const products = result.Items;
        const popularNow = products.sort(() => 0.5 - Math.random()).slice(0, 6);
        res.send(popularNow);
    } catch (error) {
        console.error("Error fetching popular now collections:", error);
        res.status(500).send("Internal Server Error");
    }
});

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: 'Please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
};

app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        const user = await getUser(req.user.email);
        const cart = user.cartData;
        cart[req.body.itemId] = (cart[req.body.itemId] || 0) + 1;
        await updateUser(req.user.email, cart);
        res.send({ message: 'Added' });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        const user = await getUser(req.user.email);
        const cart = user.cartData;
        if (cart[req.body.itemId] > 1) {
            cart[req.body.itemId] -= 1;
        } else {
            delete cart[req.body.itemId];
        }
        await updateUser(req.user.email, cart);
        res.send({ message: 'Removed' });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/getcart', fetchUser, async (req, res) => {
    try {
        const user = await getUser(req.user.email);
        res.send(user.cartData);
    } catch (error) {
        console.error("Error getting cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on " + port);
    } else {
        console.log("Server is not running, error - " + error);
    }
});

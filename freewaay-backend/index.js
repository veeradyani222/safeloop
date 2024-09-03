const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: 'https://f-way-1-frontend.onrender.com',
    methods: ['GET', 'POST'],
    credentials: true
}));

// MongoDB connection
mongoose.connect('mongodb+srv://veeradyani2:S%40nju_143@cluster0.uafyz.mongodb.net/freeway?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../freeway-frontend/build')));

// Serve images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

app.get("/", (req, res) => {
    res.send("Express app is running");
});

// Multer storage configuration
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Image upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `https://f-way.onrender.com/images/${req.file.filename}`
    });
});

// Schema for creating Products
const Product = mongoose.model("Product", new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
}));

app.post('/addproduct', async (req, res) => {
    try {
        const lastProduct = await Product.findOne({}, {}, { sort: { id: -1 } });
        const id = lastProduct ? lastProduct.id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            description: req.body.description,
        });

        await product.save();

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: "Failed to add product" });
    }
});

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });

    res.json({
        success: true,
        name: req.body.name,
    });
});

app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        res.send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Schema for creating Users
const Users = mongoose.model('Users', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "This user already exists." });
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });
        await user.save();

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            const passwordCompare = req.body.password === user.password;
            if (passwordCompare) {
                const data = { user: { id: user.id } };
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                res.status(400).json({ success: false, errors: "Wrong Password" });
            }
        } else {
            res.status(400).json({ success: false, errors: "Wrong Email Id" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Fetch user middleware
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

// Add to cart endpoint
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findById(req.user.id);
        if (userData.cartData[req.body.itemId]) {
            userData.cartData[req.body.itemId] += 1;
        } else {
            userData.cartData[req.body.itemId] = 1;
        }
        await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
        res.send({ message: 'Added' });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Remove from cart endpoint
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findById(req.user.id);

        if (userData.cartData[req.body.itemId] > 1) {
            userData.cartData[req.body.itemId] -= 1;
        } else {
            delete userData.cartData[req.body.itemId];
        }

        await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
        res.send({ message: 'Removed' });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Get cart data endpoint
app.get('/getcart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findById(req.user.id);
        res.send(userData.cartData);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Fetch new collections endpoint
app.get('/newcollections', async (req, res) => {
    try {
        let products = await Product.find({});
        let new_collections = products.slice(-9);
        res.send(new_collections);
    } catch (error) {
        console.error("Error fetching new collections:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/popularnow', async (req, res) => {
    try {
        // Fetch all products from the database
        let products = await Product.find({});

        // Shuffle the array of products
        const shuffled = products.sort(() => 0.5 - Math.random());

        // Get the first 6 products from the shuffled array
        let popularProducts = shuffled.slice(0, 6);

        res.send(popularProducts);
    } catch (error) {
        console.error("Error fetching popular products:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

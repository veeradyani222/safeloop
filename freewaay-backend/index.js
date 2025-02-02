const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require('fs');

app.use(express.json({ limit: '10mb' }));


// Middleware for parsing URL-encoded bodies with a size limit

app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://veeradyani2:S%40nju_143@cluster0.uafyz.mongodb.net/SafeLoop?retryWrites=true&w=majority');


app.get("/", (req, res) => {
    res.send("Express app is running");
});

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: './upload/images' || './upload/m-images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });


app.use('/images', express.static(path.join(__dirname, 'upload/images')));


app.post("/upload", upload.single('image'), (req, res) => {

    fs.readFile(req.file.path, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: "Failed to process image" });
        }

        // Convert the file data to a base64 string
        const base64Image = Buffer.from(data).toString('base64');
        const mimeType = req.file.mimetype; // Get the MIME type of the image
        const base64String = `data:${mimeType};base64,${base64Image}`;

        // Optionally, delete the file after conversion
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
        });

        // Send the base64 string as the response
        res.json({
            success: 1,
            image_url: base64String
        });
    });
});

// For faculty

app.post("/upload-faculty", upload.single('image'), (req, res) => {

    fs.readFile(req.file.path, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: "Failed to process image" });
        }

        // Convert the file data to a base64 string
        const base64Image = Buffer.from(data).toString('base64');
        const mimeType = req.file.mimetype; // Get the MIME type of the image
        const base64String = `data:${mimeType};base64,${base64Image}`;

        // Optionally, delete the file after conversion
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
        });

        // Send the base64 string as the response
        res.json({
            success: 1,
            image_url: base64String
        });
    });
});


const SliderImages = mongoose.model("SliderImages", new mongoose.Schema({
    id: { type: Number, required: true },  // 
    image: { type: String, required: true }   ,
    date: { type: Date, default: Date.now },    
}));

app.post('/addSliderImages', upload.single('image'), async (req, res) => {
    try {
       
        const lastSliderImages = await SliderImages.findOne({}, {}, { sort: { id: -1 } });
        const id = lastSliderImages ? lastSliderImages.id + 1 : 1;

     
        const sliderImages = new SliderImages({
            id: id,
            image: req.file ? `http://localhost:${port}/images/${req.file.filename}` : req.body.image,
        });

        // Save the new product in the database
        await sliderImages.save();

        res.json({
            success: true,
            image: sliderImages.image,
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: "Failed to add product" });
    }
        
});


app.get('/allsliderImages', async (req, res) => {
    let sliderImages = await SliderImages.find({});
    res.send(sliderImages);
});

app.post('/removeslider', async (req, res) => {
    try {
        const result = await SliderImages.findOneAndDelete({ id: req.body.id });

        if (!result) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        res.json({
            success: true,
            message: 'Image removed successfully',
            id: req.body.id,
        });
    } catch (error) {
        console.error("Error removing image:", error);
        res.status(500).json({ success: false, error: "Failed to remove image" });
    }
});

// Schema for creating Products
const Incident_Admin = mongoose.model("Incident_Admin", new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    sub_category: { type: String, required: true },
    tips: { type: String, required: true },
    description: { type: String, required: true },
    location:{ type: String, required: true },
    date: { type: Date, required: true },
    time:{type: String, required: true },
    date_upload:{ type: Date, default: Date.now },
}));

// Endpoint for adding a product
app.post('/addincident_admin', upload.single('image'), async (req, res) => {
    try {
        // Fetch the last product by id
        const lastIncident = await Incident_Admin.findOne({}, {}, { sort: { id: -1 } });
        const id = lastIncident ? lastIncident.id + 1 : 1;

        // Create a new product with data from the request
        const incident_admin = new Incident_Admin({
            id: id,
            name: req.body.name,
            image: req.file ? `http://localhost:${port}/images/${req.file.filename}` : req.body.image,
            category: req.body.category,
            sub_category: req.body.sub_category,
            tips:req.body.tips,
            location:req.body.location,
            date:req.body.date,
            time:req.body.time,
            description: req.body.description,
            
        });

        // Save the new product in the database
        await incident_admin.save();

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving incident:", error);
        res.status(500).json({ error: "Failed to add incident" });
    }
});

app.get('/allincidents_admin', async (req, res) => {
    let incidents = await Incident_Admin.find({});
    res.send(incidents);
});



// Endpoint for removing a product
app.post('/removeincident', async (req, res) => {
    await Incident_Admin.findOneAndDelete({ id: req.body.id });

    res.json({
        success: true,
        name: req.body.name,
    });
});

const Volunteer = mongoose.model("Volunteer", new mongoose.Schema({
    id: { type: Number, required: true },
    image: { type: String, required: true },
    volunteer: { type: String, required: true },
    about_volunteer:{ type: String, required: true },
    date: { type: Date, default: Date.now },
}));



// Endpoint for adding a product
app.post('/addvolunteer', upload.single('image'), async (req, res) => {
    try {
        // Fetch the last product by id
        const lastVolunteer = await Volunteer.findOne({}, {}, { sort: { id: -1 } });
        const id = lastVolunteer ? lastVolunteer.id + 1 : 1;

        // Create a new product with data from the request
        const volunteer = new Volunteer({
            id: id,
            image: req.file ? `http://localhost:${port}/images/${req.file.filename}` : req.body.image,
            volunteer: req.body.volunteer,
            about_volunteer: req.body.about_volunteer,
        });

        // Save the new product in the database
        await volunteer.save();

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving faculty:", error);
        res.status(500).json({ error: "Failed to add faculty" });
    }
});

app.get('/allvolunteers', async (req, res) => {
    let volunteer = await Volunteer.find({});
    res.send(volunteer);
});



// Endpoint for removing a faculty
app.post('/removevolunteer', async (req, res) => {
    await Volunteer.findOneAndDelete({ id: req.body.id });

    res.json({
        success: true,
        name: req.body.name,
    });
});



const Content = mongoose.model("Content", new mongoose.Schema({
    id: { type: Number, required: true },
    about_sections: { type: [String], required: true }, 
    terms_conditions: { type: [String], required: false }, 
    contact_numbers: { type: [String], required: true }, 
    email_ids: { type: [String], required: true }, 
    addresses: { type: [String], required: false }, 
    instagram: { type: String, required: false },
    github: { type: String, required: false },
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    promo_code: { type: String, required: false }, 
    offer_percentage: { type: Number, required: false },
    date: { type: Date, default: Date.now },
}));

// Endpoint for adding a content
app.post('/addContent', async (req, res) => {
    try {
        // Fetch the last content by id
        const lastContent = await Content.findOne({}, {}, { sort: { id: -1 } });
        const id = lastContent ? lastContent.id + 1 : 1;

        // Create a new content with data from the request (arrays sent directly from frontend)
        const content = new Content({
            id: id,
            about_sections: req.body.about_sections, // Directly use the array
            terms_conditions: req.body.terms_conditions,
            contact_numbers: req.body.contact_numbers,
            email_ids: req.body.email_ids,
            addresses: req.body.addresses,
            instagram: req.body.instagram,
            github: req.body.github,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            promo_code: req.body.promo_code,
            offer_percentage: req.body.offer_percentage
        });

        await content.save();

        res.json({
            success: true,
            content: content, // Return the newly created content or _id
        });
    } catch (error) {
        console.error("Error saving content:", error);
        res.status(500).json({ error: "Failed to add content" });
    }
});
// Endpoint for fetching all content
app.get('/allContent', async (req, res) => {
    try {
        let content = await Content.find({});
        res.json(content);
    } catch (error) {
        console.error("Error fetching content:", error);
        res.status(500).json({ error: "Failed to fetch content" });
    }
});

app.put('/updateContent/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedContent = req.body;
      const result = await Content.findByIdAndUpdate(id, updatedContent, { new: true });
  
      if (result) {
        res.json({ success: true, content: result });
      } else {
        res.status(404).json({ success: false, message: 'Content not found' });
      }
    } catch (error) {
      console.error("Error updating content:", error);
      res.status(500).json({ success: false, error: "Failed to update content" });
    }
  });
  

// Schema for User Data
const Users = mongoose.model('Users', new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    buyData: { type: Object },
    wishlistData: { type: Object },
    Date: { type: Date, default: Date.now }
}));

// Endpoint for user signup
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "This user already exists." });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    let buy = {};
    for (let i = 0; i < 300; i++) {
        buy[i] = 0;
    }

    let wishlist = {};
    for (let i = 0; i < 300; i++) {
        wishlist[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
        buyData: buy,
        wishlistData: wishlist,
    });

    await user.save();

    const data = {
        user: {
            id: user.id,
        }
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

// Endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passwordCompare = req.body.password === user.password;
        if (passwordCompare) {
            const data = {
                user: {
                    id: user.id,
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
});



// Middleware to fetch user
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

// Endpoint for adding products to cart
app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findById(req.user.id);
    if (userData.cartData[req.body.itemId]) {
        userData.cartData[req.body.itemId] += 1;
    } else {
        userData.cartData[req.body.itemId] = 1;
    }
    await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
    res.send({ message: 'Added' });
});

app.post('/addtowishlist', fetchUser, async (req, res) => {
    let userData = await Users.findById(req.user.id);
    if (userData.wishlistData[req.body.itemId]) {
        userData.wishlistData[req.body.itemId] += 1;
    } else {
        userData.wishlistData[req.body.itemId] = 1;
    }
    await Users.findByIdAndUpdate(req.user.id, { wishlistData: userData.wishlistData });
    res.send({ message: 'Added' });
});

// Endpoint for removing products from cart
app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await Users.findById(req.user.id);

    if (userData.cartData[req.body.itemId] > 1) {
        userData.cartData[req.body.itemId] -= 1;
    } else {
        delete userData.cartData[req.body.itemId];
    }

    await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
    res.send({ message: 'Removed' });
});

app.post('/removefromWishlist', fetchUser, async (req, res) => {
    let userData = await Users.findById(req.user.id);

    if (userData.wishlistData[req.body.itemId] > 1) {
        userData.wishlistData[req.body.itemId] -= 1;
    } else {
        delete userData.wishlistData[req.body.itemId];
    }

    await Users.findByIdAndUpdate(req.user.id, { wishlistData: userData.wishlistData });
    res.send({ message: 'Removed' });
});

// Endpoint for getting user cart
app.get('/getcart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findById(req.user.id);
        if (!userData) {
            return res.status(404).send({ errors: "User not found" });
        }
        res.send(userData.cartData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send({ errors: "Internal Server Error" });
    }
});

app.get('/getwishlist', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findById(req.user.id);
        if (!userData) {
            return res.status(404).send({ errors: "User not found" });
        }
        res.send(userData.wishlistData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send({ errors: "Internal Server Error" });
    }
});


// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on " + port);
    } else {
        console.log("Server is not running, error - " + error);
    }
});

const Faculty = mongoose.model("Faculty", new mongoose.Schema({
    id: { type: Number, required: true },
    image: { type: String, required: true },
    lecturer: { type: String, required: true },
    about_faculty:{ type: String, required: true },
    date: { type: Date, default: Date.now },
}));



// Endpoint for adding a product
app.post('/addFaculty', upload.single('image'), async (req, res) => {
    try {
        // Fetch the last product by id
        const lastFaculty = await Faculty.findOne({}, {}, { sort: { id: -1 } });
        const id = lastFaculty ? lastFaculty.id + 1 : 1;

        // Create a new product with data from the request
        const faculty = new Faculty({
            id: id,
            image: req.file ? `http://localhost:${port}/images/${req.file.filename}` : req.body.image,
            lecturer: req.body.lecturer,
            about_faculty: req.body.about_faculty,
            product_link: req.body.product_link,
        });

        // Save the new product in the database
        await faculty.save();

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving faculty:", error);
        res.status(500).json({ error: "Failed to add faculty" });
    }
});

app.get('/allFaculties', async (req, res) => {
    let faculty = await Faculty.find({});
    res.send(faculty);
});



// Endpoint for removing a product
app.post('/removefaculty', async (req, res) => {
    await Faculty.findOneAndDelete({ id: req.body.id });

    res.json({
        success: true,
        name: req.body.name,
    });
});
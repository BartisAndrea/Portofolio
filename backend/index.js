const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware to parse JSON requests and enable CORS for cross-origin requests
app.use(express.json());
app.use(cors());

// Database connection with MongoDB Atlas using Mongoose
mongoose.connect("mongodb+srv://bartisandrea21:8Pzfamv8IpWMB1LP@cluster0.egrne.mongodb.net/project")
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

// Define the Project schema for MongoDB (used to store portfolio projects)
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    client_link: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['hidden', 'shown'], // Can either be 'hidden' or 'shown'
        default: 'shown',
    },
    date: {
        type: Date,
        default: Date.now, // Automatically sets the date to the current time
    },
});

// Define a model called 'Project' using the schema
const Project = mongoose.model("Project", projectSchema);

// Define the Contact schema for MongoDB (used to store contact form messages)
const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    message: String,
    date: {
        type: Date,
        default: Date.now, // Automatically sets the date to the current time
    },
});

// Define a model called 'Contact' using the schema
const Contact = mongoose.model("Contact", contactSchema);

// Base route to check if the server is running
app.get("/", (req, res) => {
    res.send("Express App is running");
});

// Configure Multer to store uploaded images in the 'upload/images' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'upload/images'));
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using the fieldname and the current timestamp
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve static images from the 'upload/images' directory
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// API to handle image uploads (using Multer)
app.post("/upload", upload.single('project'), (req, res) => {
    try {
        // Check if an image was uploaded
        if (!req.file) {
            return res.status(400).json({ success: 0, error: 'No file uploaded' });
        }
        // Construct the URL to the uploaded image
        const image_url = `http://localhost:${port}/images/${req.file.filename}`;
        // Return the image URL in the response
        res.json({
            success: 1,
            image_url: image_url
        });
    } catch (error) {
        console.error("Error during file upload:", error);
        res.status(500).json({ success: 0, error: 'Internal server error' });
    }
});
// API to add a new project to the database
app.post('/addproject', async (req, res) => {
    try {
        // Create a new Project object with data from the request body
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            client_link: req.body.client_link,
            status: req.body.status || 'shown',
            date: new Date(),
        });

        console.log("Project object:", project);
        await project.save();
        console.log("Project saved");

        res.json({
            success: true,
            title: req.body.title,
        });
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// API to remove a project from the database
app.post('/removeproject', async (req, res) => {
    try {
        // Ensure that the project _id is provided
        if (!req.body._id) {
            return res.status(400).json({ success: false, error: 'Project _id is required' });
        }

       // Find the project by _id and delete it
        const result = await Project.findByIdAndDelete(req.body._id);

        if (result) {
            console.log("Project removed:", result);
            res.json({
                success: true,
                message: "Project removed successfully",
                title: result.title
            });
        } else {
            res.status(404).json({
                success: false,
                error: "Project not found"
            });
        }
    } catch (error) {
        console.error("Error removing project:", error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// API to retrieve all projects from the database
app.get('/allprojects', async (req, res) => {
    try {
        let projects = await Project.find({});
        console.log("All Projects Fetched");
        res.send(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API to update an existing project
app.post('/updateproject', async (req, res) => {
    try {
        const { _id, title, description, image, client_link, status } = req.body;

       // Validate that the project _id is valid
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ success: false, error: 'Invalid project ID' });
        }

         // Update the project with new data
        const updatedProject = await Project.findByIdAndUpdate(
            _id, 
            {
                title,
                description,
                image,
                client_link,
                status
            },
            { new: true } // Return the updated document
        );

        if (!updatedProject) {
            return res.status(404).json({ success: false, error: 'Project not found or failed to update' });
        }

        res.json({
            success: true,
            message: 'Project updated successfully',
            updatedProject,
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API to save a contact message to the database
app.post('/contact', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.json({ code: 200, message: 'Message sent successfully' });
    } catch (error) {
        console.error("Error saving contact message:", error);
        res.status(500).json({ code: 500, message: 'Internal server error' });
    }
});

// API to retrieve all contact messages from the database
app.get('/allcontacts', async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.json(contacts);
    } catch (error) {
        console.error("Error fetching contact messages:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API to remove a contact message
app.post('/removecontact', async (req, res) => {
    try {
        const { _id } = req.body;

        // Validate the contact _id
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ success: false, error: 'Invalid contact ID' });
        }

        // Deleting contact
        const result = await Contact.findByIdAndDelete(_id);

        if (result) {
            res.json({ success: true, message: 'Contact removed successfully' });
        } else {
            res.status(404).json({ success: false, error: 'Contact not found' });
        }
    } catch (error) {
        console.error('Error removing contact:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Start the server and listen on port 4000
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Error " + error);
    }
});

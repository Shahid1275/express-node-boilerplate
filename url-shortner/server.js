// Basic setup and configuration
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config(); // Loads environment variables

// Database and route imports
import connectDB from './config/db.js'; // MongoDB connection
import Url from './models/url.js'; // URL model
import urlRouter from './routes/url.js'; // URL shortening routes
import staticRoute from './routes/staticRoute.js'; // Static routes

const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
connectDB(); // Connects to MongoDB

// View engine setup (EJS)
app.set('view engine', 'ejs'); // Uses EJS for templating
app.set('views', path.resolve('./views')); // Sets views directory

// Middleware
app.use(express.json()); // Parses JSON requests
app.use(express.urlencoded({ extended: true })); // Parses form data

// Routes
app.get("/test", async (req, res) => { // Test route to show all URLs
    const allUrls = await Url.find({});
    return res.render('home', { urls: allUrls });
});

app.use('/url', urlRouter); // URL shortening endpoints

// URL redirection
app.get("/:shortId", async (req, res) => { // Handles short URL visits
    const entry = await Url.findOneAndUpdate(
        { shortId: req.params.shortId },
        { $push: { visitHistory: { timeStamp: Date.now() } } }
    );
    entry ? res.redirect(entry.redirectUrl) : res.status(404).send("URL not found");
});

app.use('/', staticRoute); // Static routes

// Basic root route
app.get('/', (req, res) => {
    res.send("Hello Shahid i am working Good");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
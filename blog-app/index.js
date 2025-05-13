// Basic setup and configuration
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js'; // MongoDB connection
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

// In your route handler (e.g., app.js or routes file)
app.get("/", (req, res) => {
    res.render("home", {
        title: "Home Page",
        description: "Welcome to my blog app!" // Add this line
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
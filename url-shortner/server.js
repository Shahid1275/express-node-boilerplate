import express from 'express';
import urlRouter from './routes/url.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import Url from './models/url.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies - MUST come before routes
app.use(express.json());  // This line is crucial
app.use(express.urlencoded({ extended: true }));  // For form data

// Use your URL router
app.use('/url', urlRouter);
app.get("/:shortId" , async (req, res) =>{
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate({ shortId}, { $push: { visitHistory: { timeStamp: Date.now() } } });
    res.redirect(entry.redirectUrl);
})



app.get('/', (req, res) => {
    res.send("Hello Shahid i am working Good");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
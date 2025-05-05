import Url from '../models/url.js';
import { nanoid } from 'nanoid';

export const handleGenerateNewUrl = async (req, res) => {
    // First check if body exists
    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "Request body is missing"
        });
    }

    // Then destructure the url property
    const { url } = req.body;

    // Validate URL exists and is a string
    if (!url || typeof url !== 'string') {
        return res.status(400).json({
            success: false,
            message: "A valid URL string is required in the request body"
        });
    }

    try {
        const shortId = nanoid(8);
        
        const createdUrl = await Url.create({
            shortId: shortId,
            redirectUrl: url,
            visitHistory: [],
            createdBy:req.user._id 
        });
           return res.render('home' ,{ id: shortId})
    } catch (error) {
        console.error("URL creation error:", error);
        
        // Handle duplicate shortId errors
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Short URL already exists, please try again"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create short URL",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


export const handlegetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory }); 
}
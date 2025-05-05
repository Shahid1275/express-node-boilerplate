// controllers/user.js
import userModel from "../models/userModel.js";
import { v4 as uuid } from 'uuid';
import { setUser } from "../service/auth.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await userModel.create({ name, email, password });
        res.redirect("/login");
    } catch (error) {
        res.status(400).render('signup', { error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        
        if (!user) {
            return res.status(401).render('login', { 
                error: "Invalid username or password" 
            });
        }

        const sessionId = uuid();
        setUser(sessionId, user);
        res.cookie("sessionId", sessionId, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        res.redirect("/");
    } catch (error) {
        res.status(500).render('login', { error: "Server error" });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie('sessionId');
    res.redirect('/login');
};
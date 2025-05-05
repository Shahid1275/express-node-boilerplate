import express from 'express';

import Url from '../models/url.js';
const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.user) return res.redirect('/login');
    const allUrls = await Url.find({createdBy: req.user._id});
    res.render('home',
        { urls: allUrls }
    );
});

router.get('/signup', (req, res) => {
    res.render('signup');
})
router.get('/login', (req, res) => {
    res.render('login');
})
export default router;
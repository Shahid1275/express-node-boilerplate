// middleware/auth.js
import { getUser } from '../service/auth.js';

// Main authentication middleware (redirects if not authenticated)
 const isAuthenticated = async (req, res, next) => {
    const sessionId = req.cookies?.sessionId;
    
    if (!sessionId) {
        return res.redirect('/login');
    }
    
    const user = getUser(sessionId);
    if (!user) {
        return res.redirect('/login');
    }
    
    req.user = user;
    next();
};

// Optional authentication checker (doesn't redirect, just attaches user if exists)
 const checkAuth = async (req, res, next) => {
    const sessionId = req.cookies?.sessionId;
    
    if (sessionId) {
        req.user = getUser(sessionId);
    }
    
    next();
};

// Export both middlewares
export { isAuthenticated, checkAuth };
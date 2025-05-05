// middleware/auth.js
import { getUser } from '../service/auth.js';

 const isAuthenticated = async (req, res, next) => {
    const sessionId = req.cookies?.sessionId;
    if (!sessionId) return res.redirect('/login');
    
    const user = getUser(sessionId);
    if (!user) return res.redirect('/login');
    
    req.user = user;
    next();
};
export default isAuthenticated;
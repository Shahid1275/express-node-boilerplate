import express from 'express';
import { handleGenerateNewUrl ,handlegetAnalytics } from '../controllers/url.js';

const router = express.Router();

router.post('/', handleGenerateNewUrl);
router.get('/analytics/:shortId', handlegetAnalytics);

export default router;
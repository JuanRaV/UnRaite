import express from 'express'
import { checkDriversAuth } from '../middleware/checkAuth.js';
import { getTowns } from '../controllers/townRoutes.js';

const router = express.Router()

router.get("/get-towns", getTowns)

export default router 
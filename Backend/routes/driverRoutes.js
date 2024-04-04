import express from 'express'
import { createRaite } from "../controllers/driverController.js";
import { checkDriversAuth } from '../middleware/checkAuth.js';

const router = express.Router()

router.post("/create-raite", checkDriversAuth, createRaite)

export default router
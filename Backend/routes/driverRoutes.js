import express from 'express'
import { createRaite, getRaites, getRaite } from "../controllers/driverController.js";
import { checkDriversAuth } from '../middleware/checkAuth.js';

const router = express.Router()

router.post("/create-raite", checkDriversAuth, createRaite)
router.get("/get-raites", checkDriversAuth, getRaites)
router.get("/get-raites/:id",checkDriversAuth, getRaite)

export default router
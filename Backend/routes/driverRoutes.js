import express from 'express'
import { createRaite } from "../controllers/driverController.js";

const router = express.Router()

router.post("/create_raite", createRaite)

export default router
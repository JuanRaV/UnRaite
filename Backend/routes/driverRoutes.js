import express from 'express'
import { createRaite, getRaites, getRaite, editRaite, deleteRaite, completeRaite, strike } from "../controllers/driverController.js";
import { checkDriversAuth } from '../middleware/checkAuth.js';

const router = express.Router()

router.post("/create-raite", checkDriversAuth, createRaite)
router.get("/get-raites", checkDriversAuth, getRaites)
router.get("/get-raite/:id",checkDriversAuth, getRaite)
router.put("/edit-raite/:id",checkDriversAuth,editRaite)
router.delete("/delete-raite/:id",checkDriversAuth, deleteRaite)
router.put("/complete-raite/:id",checkDriversAuth,completeRaite)
router.post("/strike-passenger/:passengerId/:raiteId", checkDriversAuth, strike )

export default router 
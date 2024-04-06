import express from 'express'
import { getAllRaites,acceptRaite, cancelRaite } from '../controllers/passengerController.js';
import { checkPassengersAuth } from '../middleware/checkAuth.js';

const router = express.Router()

router.get('/',checkPassengersAuth, getAllRaites)
router.put("/accept-raite/:id", checkPassengersAuth, acceptRaite)
router.delete("/cancel-raite", checkPassengersAuth, cancelRaite)

export default router
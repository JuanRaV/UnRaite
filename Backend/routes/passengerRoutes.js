import express from 'express'
import { getAllRaites,getOneRaite,acceptRaite, cancelRaite, strike } from '../controllers/passengerController.js';
import { checkPassengersAuth } from '../middleware/checkAuth.js';

const router = express.Router()

router.get('/',checkPassengersAuth, getAllRaites)
router.get('/:id',checkPassengersAuth, getOneRaite)
router.put("/accept-raite/:id", checkPassengersAuth, acceptRaite)
// router.get("/current-raite",checkPassengersAuth, current)
router.delete("/cancel-raite/:id", checkPassengersAuth, cancelRaite)
router.post("/strike-driver/:driverId/:raiteId", checkPassengersAuth, strike )

export default router
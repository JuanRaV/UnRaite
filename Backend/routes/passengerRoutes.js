import express from 'express'
<<<<<<< HEAD
import { getAllRaites,getOneRaite,acceptRaite, cancelRaite, strike, getRideHistory } from '../controllers/passengerController.js';
=======
import { getAllRaites,getOneRaite,acceptRaite, cancelRaite, strike, current } from '../controllers/passengerController.js';
>>>>>>> a89e2d4dcb3a140db62a2702cbaf052f31e94a19
import { checkPassengersAuth } from '../middleware/checkAuth.js';

const router = express.Router()

router.get('/',checkPassengersAuth, getAllRaites)
router.get('/:id',checkPassengersAuth, getOneRaite)
router.get('/ride-history', checkPassengersAuth, getRideHistory);
router.put("/accept-raite/:id", checkPassengersAuth, acceptRaite)
router.get("/current-raite/:id",checkPassengersAuth, current)
router.delete("/cancel-raite/:id", checkPassengersAuth, cancelRaite)
router.post("/strike-driver/:driverId/:raiteId", checkPassengersAuth, strike )

export default router
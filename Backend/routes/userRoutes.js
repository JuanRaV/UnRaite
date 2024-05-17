import express from 'express'
import { registerUser, passengerLogin, driverLogin, forgotPassword, checkToken, newPassword, driverProfile, passengerProfile } from '../controllers/userController.js'
import { checkDriversAuth, checkPassengersAuth } from '../middleware/checkAuth.js'
import { upload } from '../utils/upload.js'

const router = express.Router()


router.post("/signup/passenger",upload.fields([{ name: 'frontStudentCredential', maxCount: 1 }, { name: 'backStudentCredential', maxCount: 1 }]), registerUser)
router.post("/signup/driver", registerUser)
router.post("/passenger-login", passengerLogin )
router.post("/driver-login", driverLogin )
router.post("/forgot-password", forgotPassword)
router.get("/forgot-password/:token", checkToken)
router.post("/forgot-password/:token", newPassword)

//Private Endpoint
router.get("/driver-profile", checkDriversAuth, driverProfile)
router.get("/passenger-profile", checkPassengersAuth, passengerProfile)

export default router
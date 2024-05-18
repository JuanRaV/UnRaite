import express from 'express'
import { registerUser, passengerLogin, driverLogin, DriverForgotPassword, PassengerForgotPassword, passengerCheckToken,driverCheckToken, passengerNewPassword,driverNewPassword, driverProfile, passengerProfile } from '../controllers/userController.js'
import { checkDriversAuth, checkPassengersAuth } from '../middleware/checkAuth.js'
import { upload } from '../utils/upload.js'

const router = express.Router()


router.post("/signup/passenger",upload.fields([{ name: 'frontStudentCredential', maxCount: 1 }, { name: 'backStudentCredential', maxCount: 1 }]), registerUser)
router.post("/signup/driver", registerUser)
router.post("/passenger-login", passengerLogin )
router.post("/driver-login", driverLogin )
router.post("/forgot-password/passenger", PassengerForgotPassword)
router.post("/forgot-password/driver", DriverForgotPassword)
router.get("/forgot-password/passenger/:token", passengerCheckToken)
router.get("/forgot-password/driver/:token", driverCheckToken)
router.post("/forgot-password/passenger/:token", passengerNewPassword)
router.post("/forgot-password/driver/:token", driverNewPassword)

//Private Endpoint
router.get("/driver-profile", checkDriversAuth, driverProfile)
router.get("/passenger-profile", checkPassengersAuth, passengerProfile)

export default router
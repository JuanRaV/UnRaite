import express from 'express'
import { registerUser, login, forgotPassword, checkToken, newPassword, driverProfile, passengerProfile } from '../controllers/userController.js'
import { checkDriversAuth } from '../middleware/checkAuth.js'

const router = express.Router()

router.post("/signup/passenger", registerUser)
router.post("/signup/driver", registerUser)
router.post("/login", login )
router.post("/forgot-password", forgotPassword)
router.get("/forgot-password/:token", checkToken)
router.post("/forgot-password/:token", newPassword)

router.get("/driver-profile", checkDriversAuth, driverProfile)
// router.get("/passenger-profile", checkAuth, passengerProfile)

export default router
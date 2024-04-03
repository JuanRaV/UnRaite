import express from 'express'
import { registerUser, login, forgotPassword, checkToken, newPassword } from '../controllers/userController.js'

const router = express.Router()

router.post("/signup/passenger", registerUser)
router.post("/signup/driver", registerUser)
router.post("/login", login )
router.post("/forgot-password", forgotPassword)
router.get("/forgot-password/:token", checkToken)
router.post("/forgot-password/:token", newPassword)

export default router
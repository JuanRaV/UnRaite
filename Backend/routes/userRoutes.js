import express from 'express'
import { registerUser, login } from '../controllers/userController.js'

const router = express.Router()

router.post("/signup/passenger", registerUser)
router.post("/signup/driver", registerUser)
router.post("/login", login )

export default router
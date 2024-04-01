import express from 'express'
import { registerUser } from '../controllers/userController.js'

const router = express.Router()

router.post("/signup/passenger", registerUser)
router.post("/signup/driver", registerUser)

export default router
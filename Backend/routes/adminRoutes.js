import express from 'express'
import { getPassengers, getDrivers, getAllUsers } from '../controllers/adminController.js'

const router = express.Router()
router.get("/get-passengers",getPassengers)
router.get("/get-drivers",getDrivers)
router.get("",getAllUsers)


export default router
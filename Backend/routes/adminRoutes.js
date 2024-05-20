import express from 'express'
import {login, getPassengers, getDrivers, getAllUsers,getImage } from '../controllers/adminController.js'
import { checkAdminAuth } from '../middleware/checkAuth.js'

const router = express.Router()
router.get("/",login )
router.get("/get-passengers",getPassengers)
router.get("/get-drivers",getDrivers)
router.get("/get-users",getAllUsers)
router.get("/get-image/:id/:userType/:imageType",getImage)


export default router
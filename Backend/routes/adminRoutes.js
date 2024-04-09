import express from 'express'
import {login, getPassengers, getDrivers, getAllUsers } from '../controllers/adminController.js'
import { checkAdminAuth } from '../middleware/checkAuth.js'

const router = express.Router()
router.get("/",login )
router.get("/get-passengers",checkAdminAuth,getPassengers)
router.get("/get-drivers",checkAdminAuth,getDrivers)
router.get("/get-users",checkAdminAuth,getAllUsers)


export default router
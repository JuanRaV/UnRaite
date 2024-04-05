import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';
// import User from '../models/User.js';

const prisma = new PrismaClient()


//Custome middleware
const checkDriversAuth = async(req,res,next) =>{
    // console.log(req.headers.authorization)
    // return
    console.log("check drivers")
    
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            
             console.log("token" + token)
            // console.log(decoded.id)
            // return
            // Busca al conductor por su id y excluye los campos que no deseas devolver
 
            try {
                const driver = await prisma.driver.findUnique({
                    where: { driverId:decoded.id },
                    select: {
                      driverId:true,
                      name: true,
                      email: true,
                      phoneNumber: true,
                      raites: true
                    },
                  });
                  if(!driver)
                    return res.status(404).json({msg:"Driver not found"})
                  

                req.driver = driver
                console.log("Sesion guardada con exito")
            } catch (error) {
                console.log(error)
            }

            return next()
        } catch (error) {
            return res.status(404).json({msg:"There was an error"})
        }
    }

    if(!token){
        const error = new Error("Invalid Token ")
        return res.status(401).json({msg :error.message})
    }

    next()
}

const checkPassengersAuth = async(req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            try {
                const passenger = await prisma.passenger.findUnique({
                    where: { passengerId:decoded.id },
                    select: {
                      passengerId:true,
                      name: true,
                      email: true,
                      phoneNumber: true,
                      raite: true
                    },
                  });
                if(!passenger)
                  return res.status(404).json({msg:"Driver not found"})
                console.log(passenger)
                req.passenger = passenger
                console.log("Sesion guardada con exito")
            } catch (error) {
                console.log(error)
            }

            return next()
        } catch (error) {
            return res.status(404).json({msg:"There was an error"})
        }
    }

    if(!token){
        console.log(token,"!")
        const error = new Error("Invalid Token")
        return res.status(401).json({msg :error.message})
    }

    next()
}

export {
    checkDriversAuth,
    checkPassengersAuth
}
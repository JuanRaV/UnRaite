import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';
// import User from '../models/User.js';

const prisma = new PrismaClient()


//Custome middleware
const checkDriversAuth = async(req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
             
              
              // Busca al conductor por su id y excluye los campos que no deseas devolver
            req.driver = await prisma.driver.findUnique({
                where: { id: decoded.iid },
                select: {
                  name: true,
                  email: true,
                },
              });
            
            return next()
        } catch (error) {
            return res.status(404).json({msg:"There was an error"})
        }
    }

    if(!token){
        const error = new Error("Invalid Token")
        return res.status(401).json({msg :error.message})
    }

    next()
}

export {
    checkDriversAuth
}
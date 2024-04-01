import { Prisma, PrismaClient } from "@prisma/client";
import generateID from "../helpers/generateID.js";

const prisma = new PrismaClient()

const registerUser = async(req,res) =>{
    console.log(req.body)
    //Avoid duplicates
    const {name, email, password, phoneNumber, frontStudentCredential, backStudentCredential, verified} = req.body
    const existingUser = await prisma.passenger.findUnique({where:{email}})

    if(existingUser){
        const error = new Error("Account already registered")
        return res.status(400).json({msg:error.message})
    }
    try{
        const passenger = await prisma.passenger.create({
            data:{
                passengerId:'p' + generateID(),
                name,
                email,
                password, 
                phoneNumber,
                frontStudentCredential,
                backStudentCredential,
                verified: false,
                
            }
        })
        // res.json({msg:"User created successfully, check your email to confirm your account"})
        res.json(passenger)
    }catch(error){
        console.log(error)
        res.json({msg:"Error"})
    }
}

export{
    registerUser
}
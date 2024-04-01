import { Prisma, PrismaClient } from "@prisma/client";
import generateID from "../helpers/generateID.js";

const prisma = new PrismaClient()

//PASSENGER SIGNUP
const passengersSignUp = async (req,res)=>{
    // Avoid duplicates
    const {name, email, password, phoneNumber, frontStudentCredential, backStudentCredential, verified} = req.body

    const existingPassengerEmail = await prisma.passenger.findUnique({where:{email}})
    const existingPassengerNumber = await prisma.passenger.findUnique({where:{phoneNumber}})

    if(existingPassengerEmail){
        const error = new Error("Account already registered")
        return res.status(400).json({msg:error.message})
    }else if(existingPassengerNumber){
        const error = new Error("Phone number already used")
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
        console.log(passenger)
        res.json({msg:"User created successfully, check your email to confirm your account"})
    }catch(error){
        console.log(error)
        res.json({msg:"Error"})
    }
}

//DRIVER SIGNUP
const dirversSignUp = async (req,res)=>{
    // Avoid duplicates
    const {name, email, password, phoneNumber, frontDriversLicence,backDriversLicence,frontStudentCredential, backStudentCredential, verified} = req.body

    const existingPassengerEmail = await prisma.passenger.findUnique({where:{email}})
    const existingPassengerNumber = await prisma.passenger.findUnique({where:{phoneNumber}})

    const existingDriverEmail = await prisma.driver.findUnique({where:{email}})
    const existingDriverNumber = await prisma.driver.findUnique({where:{phoneNumber}})

    if(existingPassengerEmail||existingDriverEmail){
        const error = new Error("Account already registered")
        return res.status(400).json({msg:error.message})
    }else if(existingPassengerNumber||existingDriverNumber){
        const error = new Error("Phone number already used")
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
        console.log(passenger)
        const driver = await prisma.driver.create({
            data:{
                driverId:'d' + generateID(),
                name,
                email,
                password, 
                phoneNumber,
                frontDriversLicence,
                backDriversLicence,
                frontStudentCredential,
                backStudentCredential,
                verified: false,
            }
        })
        console.log(driver)
        res.json({msg:"User created successfully, check your email to confirm your account"})
    }catch(error){
        console.log(error)
        res.json({msg:"Error"})
    }
} 
 
const registerUser = async(req,res) =>{
    if(req.originalUrl == '/api/users/signup/passenger')
        passengersSignUp(req,res)
    
    
    else if(req.originalUrl == '/api/users/signup/driver')
        dirversSignUp(req,res)
    
    else
        res.status(400).json({ msg: 'Invalid endpoint' });
}

export{
    registerUser
}
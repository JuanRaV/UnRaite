import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import generateID from "../helpers/generateID.js";
import generateJWT from "../helpers/generateJWT.js";

const prisma = new PrismaClient()

//PASSENGER SIGNUP
const passengersSignUp = async (req,res)=>{
    // Avoid duplicates
    // console.log("----------------------------")
    // console.log("req.body", req.body)
    // console.log("req files: ",req.files)
    // console.log("----------------------------")
    const {name, email, password, phoneNumber, verified} = req.body
    const frontStudentCredential = req.files && req.files.frontStudentCredential ? req.files.frontStudentCredential[0] : undefined;
    const backStudentCredential = req.files && req.files.backStudentCredential ? req.files.backStudentCredential[0] : undefined;
    const existingPassengerEmail = await prisma.passenger.findUnique({where:{email}})
    let phoneNum = parseInt(phoneNumber)
    const existingPassengerNumber = await prisma.passenger.findUnique({where:{phoneNumber:phoneNum}})

    // console.log("----------------------------")
    console.log("frontStudentCredential: ", ) 
    console.log("backStudentCredential: ",backStudentCredential) 
    
    if(existingPassengerEmail){ 
        const error = new Error("Account already registered")
        return res.status(400).json({msg:error.message})
    }else if(existingPassengerNumber){
        const error = new Error("Phone number already used")
        return res.status(400).json({msg:error.message})
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const passenger = await prisma.passenger.create({
            data:{
                passengerId:'p' + generateID(),
                name,
                email,
                password:hashedPassword, 
                phoneNumber:phoneNum,
                frontStudentCredential:'uploads/frontStudentCredentials/'+frontStudentCredential.filename,
                backStudentCredential:`uploads/backStudentCredentials/${backStudentCredential.filename}`,
                verified: false,
                // token: 'p' + generateID()
            }
        })  
       
        res.json({msg:"User created successfully, wait until the admin verified you account"})
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
    
    const token = generateID()

    if(existingPassengerEmail||existingDriverEmail){
        const error = new Error("Account already registered")
        return res.status(400).json({msg:error.message})
    }else if(existingPassengerNumber||existingDriverNumber){
        const error = new Error("Phone number already used")
        return res.status(400).json({msg:error.message})
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const passenger = await prisma.passenger.create({
            data:{
                passengerId:'p' + generateID(),
                name,
                email,
                password:hashedPassword, 
                phoneNumber,
                frontStudentCredential,
                backStudentCredential,
                verified: false,
                // token: 'p' + token
            }
        })
        console.log(passenger)
        const driver = await prisma.driver.create({
            data:{
                driverId:'d' + generateID(),
                name,
                email,
                password:hashedPassword, 
                phoneNumber,
                frontDriversLicence,
                backDriversLicence,
                frontStudentCredential,
                backStudentCredential,
                verified: false,
                // token: 'd' + token
            }
        })
        console.log(driver)
        res.json({msg:"User created successfully, wait until the admin verified you account"})
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

const checkPassword = async function(user, password){
    return await bcrypt.compare(password, user.password)
}

const login = async (req,res) =>{
    const {email}= req.body

    //Check if that user exists:
    const passenger = await prisma.passenger.findFirst({where:{email}})
    const driver = await prisma.driver.findFirst({where:{email}})
    const driverStrike = driver?.strike
    const passengerStrike = passenger?.strike
    const user = passenger || driver
    console.log(driverStrike)
    console.log(passengerStrike)
    

    if(!user){
        const error = new Error("User not found")
        return res.status(404).json({msg:error.message})
    }

    //Check if the account iths verified
    if(!passenger.verified && !driver?.verified){
        const error = new Error("User not verified")
        return res.status(404).json({msg:error.message})
    }

    //Check password
    if(driver){
        if(driverStrike>=2){
            const error = new Error("Account blocked, your number of strikes exceds the number of 2")
            return res.status(404).json({msg:error.message}) 
        }else{
            if(await checkPassword(driver,req.body.password)){
                // return res.json({msg:"Driver LOGIN"})
                res.json({
                    driverId:driver.driverId,
                    name:driver.name,
                    email: driver.email,
                    phoneNumber: driver.phoneNumber,
                    token: generateJWT(driver.driverId)
                })
            }else{
                const error = new Error("Incorrect Password")
                return res.status(404).json({msg:error.message})
            } 
        }
    }
    else if(passenger){
        if(passengerStrike>=2){
            const error = new Error("Account blocked, your number of strikes exceds the number of 2")
            return res.status(404).json({msg:error.message}) 
        }else{
            if(await checkPassword(passenger,req.body.password)){
                // return res.json({msg:"Passenger LOGIN"})
                res.json({
                    passengerId:passenger.passengerId,
                    name:passenger.name,
                    email: passenger.email,
                    phoneNumber: passenger.phoneNumber,
                    token: generateJWT(passenger.passengerId)
                })
            }else{
                const error = new Error("Incorrect Password")
                return res.status(404).json({msg:error.message})
            }
        }
    }
}

const forgotPassword = async (req,res)=>{
    const {email} = req.body
    //Check if that user exists:
    const passenger = await prisma.passenger.findFirst({where:{email}})
    const driver = await prisma.driver.findFirst({where:{email}})
    
    const user = passenger || driver
    console.log(user)
    
    const id = generateID()

    if(!user){
        const error = new Error("User not found")
        return res.status(404).json({msg:error.message})
    }
    try{
        if(driver){
            driver.token = 'd' + id
            await prisma.driver.update({
                where: { email },
                data: { token: driver.token }
            })
            await prisma.passenger.update({
                where: { email },
                data: { token: driver.token }
            })
            //TODO SEND EMAIL
            //Send email

            res.json({msg:"We've sent an email with further instructions"})
        }
        else if(passenger){
            passenger.token = 'p' + id
            await prisma.passenger.update({
                where: { email },
                data: { token: passenger.token }
            })
            //TODO SEND EMAIL
            //Send email

            res.json({msg:"We've sent an email with further instructions"})
        }
    }catch(error){
        console.log(error)
    }
}

const checkToken = async (req,res)=>{
    const {token} = req.params
    const passenger = await prisma.passenger.findFirst({where:{token}})
    const driver = await prisma.driver.findFirst({where:{token}})

    const user = passenger || driver
    if(user)
        res.json({msg:"Valid token and user exists"})
    else{
        const error = new Error("User not found")
        return res.status(404).json({msg:error.message})
    }
    console.log("Hola ADIOS")
}

const newPassword = async(req,res)=>{
    const {token} = req.params
    const {password} = req.body

    const passenger = await prisma.passenger.findFirst({where:{token}})
    const driver = await prisma.driver.findFirst({where:{token}})
    // const passenger = await prisma.passenger.findFirst({ where: { OR: [{ token }, { email: token }] } });
    // const driver = await prisma.driver.findFirst({ where: { OR: [{ token }, { email: token }] } });
    const hashedPassword = await bcrypt.hash(password, 10);
    if(driver){
        try {
            await prisma.driver.update({
                where: { email: driver.email, token },
                data: { password:hashedPassword ,token: "" }
            })
            await prisma.passenger.update({
                where: { email: driver.email, token },
                data: { password:hashedPassword,token: "" }
            })
            res.json({msg:"Password changed correctly"})
        } catch (error) {
            console.log(error)
        }
    }else if(passenger){
        // passenger.password = password
        // passenger.token = ""
        try {
            await prisma.passenger.update({
                where: { email: passenger.email, token },
                data: { password:hashedPassword,token: "" }
            })
            res.json({msg:"Password changed correctly"})
        } catch (error) {
            console.log(error)
        }
    }
    else{
        const error = new Error("Invalid Token")
        return res.status(404).json({msg:error.message}) 
    }

}

const driverProfile = async(req,res)=>{
    const {driver} = req
    res.json(driver)
}

const passengerProfile = async(req,res)=>{
    const {passenger} = req
    res.json(passenger)
}

export{
    registerUser,
    login,
    forgotPassword,
    checkToken,
    newPassword,
    driverProfile,
    passengerProfile
}
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'
import generateJWT from "../helpers/generateJWT.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkPassword = async function (admin, password) {
    return await bcrypt.compare(password, admin.password)
}

const login = async (req, res) => {
    const { adminUsername } = req.body

    //Check if that user exists:
    const admin = await prisma.admin.findFirst({ where: { adminUsername } })

    // console.log(admin)

    //Check if its correct username
    if (!admin) {
        const error = new Error("User not found")
        return res.status(404).json({ msg: error.message })
    }


    if (await checkPassword(admin, req.body.password)) {
        // return res.json({msg:"Driver LOGIN"})
        res.json({
            adminUsername,
            token: generateJWT(admin.adminUsername)
        })
    } else {
        const error = new Error("Incorrect Password")
        return res.status(404).json({ msg: error.message })
    }
}

const getPassengers = async (req, res) => {
    try {
        const allDrivers = await prisma.driver.findMany();
        // const driverIds = allDrivers.map(driver => driver.driverId);
        // return console.log(driverIds)
        const allPassengers = await prisma.passenger.findMany({
            where: {
                audited: false,
                NOT: {
                    email: {
                        in: allDrivers.map(driver => driver.email)
                    }
                }
            }
        });
        res.json(allPassengers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getDrivers = async (req, res) => {
    try {
        const allDrivers = await prisma.driver.findMany({
            where:{
                audited: false,
            }
        })
        // const passenger 
        res.json(allDrivers)
    } catch (error) {
        console.log(error)
        res.status(500).json({ mg: "Internal server error" })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allDrivers = await prisma.driver.findMany();
        // const driverIds = allDrivers.map(driver => driver.driverId);
        // return console.log(driverIds)
        const allPassengers = await prisma.passenger.findMany({
            where: {
                NOT: {
                    email: {
                        in: allDrivers.map(driver => driver.email)
                    }
                }
            }
        });
        const allUsers = allPassengers.concat(allDrivers);
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const getImage= async (req,res) => {
    try{
        const id = req.params.id
        const imageType = req.params.imageType 
        const userType = req.params.userType
        let typeId;

        if(userType == 'driver'){
            typeId = "driverId"
        }else{
            typeId = "passengerId"
        }

        let imagePath = await prisma[userType].findUnique({
            where: {
                [typeId]: id,
              },
              select: {
                [imageType]: true,
              },
        })
        
        if (!imagePath) {
            return res.status(404).send('Image not found');
          }
        let file = path.join(__dirname, '..', imagePath[imageType]);
   
        if (fs.existsSync(file)) {
            res.sendFile(file);
        } else {
            res.status(404).send('La imagen de perfil no se encuentra');
        }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener la imagen');
    }
}

const declineUser = async(req,res)=>{
    try{
        const id = req.params.id
        const userType = req.params.userType 
        let typeId;

        if(userType == 'driver'){
            typeId = "driverId"
        }else{
            typeId = "passengerId"
        }

        let declineUser = await prisma[userType].update({
            where: {
                [typeId]: id,
              },
            data:{
                audited:true,
                verified: false
            }
        })

        if(declineUser){
            res.status(200)
        }
    }catch(error){
        console.error(error);
      res.status(500).send('Error al obtener la imagen de perfil del estudiante');
    }
}

const acceptUser = async(req,res)=>{
    try{
        const id = req.params.id
        const userType = req.params.userType 
        let typeId;

        if(userType == 'driver'){
            typeId = "driverId"
        }else{
            typeId = "passengerId"
        }

        let acceptUser = await prisma[userType].update({
            where: {
                [typeId]: id,
              },
            data:{
                audited:true,
                verified: true
            }
        })

        if(acceptUser){
            res.status(200)
        }
    }catch(error){
        console.error(error);
      res.status(500).send('Error al obtener la imagen de perfil del estudiante');
    }
}
export {
    login,
    getPassengers,
    getDrivers,
    getAllUsers,
    getImage,
    acceptUser,
    declineUser
}
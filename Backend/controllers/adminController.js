import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import generateJWT from "../helpers/generateJWT.js";

const prisma = new PrismaClient()
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
        const allDrivers = await prisma.driver.findMany()
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

export {
    login,
    getPassengers,
    getDrivers,
    getAllUsers
}
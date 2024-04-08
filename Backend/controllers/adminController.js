import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

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

const getDrivers = async (req,res)=>{
    try {
        const allDrivers = await prisma.driver.findMany()
        // const passenger 
        res.json(allDrivers)
    } catch (error) {
        console.log(error)
        res.status(500).json({mg:"Internal server error"})
    }
}

const getAllUsers = async (req,res) =>{
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

export{
    getPassengers,
    getDrivers,
    getAllUsers
}
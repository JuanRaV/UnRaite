import { Prisma, PrismaClient } from "@prisma/client";

const createRaite = async (req,res) =>{
    const {startHour, date, start, startingPoint, destination, arrivalPoint, capacity, price, driverId } = req.body
    const passenger = await prisma.passenger.create({
        data:{
            startHour,
            date,
            start, 
            startingPoint,
            destination,
            arrivalPoint,
            capacity,
            price,
            driverId
            // token: 'p' + generateID()
        }
    }
    )
}

export{
    createRaite
}
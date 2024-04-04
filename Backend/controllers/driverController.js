import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const createRaite = async (req,res) =>{
    const {startHour, date, start, startingPoint, destination, arrivalPoint, capacity, price } = req.body
    const {driverId} = req.driver

    // console.log(startHour)
    // const sh = new Date(startHour)
    // console.log(sh)
    // return


    try {
        const formattedStartHour = new Date(startHour).toISOString();;
        const formattedDate = new Date(date).toISOString();;

        const raite = await prisma.raite.create({
            startHour: formattedStartHour,
            date:formattedDate,
            start,
            startingPoint,
            destination,
            arrivalPoint,
            capacity,
            price,
            driver: { connect: { driverId } }, // Asocia el raite con el conductor que lo está creando,
            driverId  
        }) 
        console.log(raite)
        res.json({msg:"Raite created successfully"})
    } catch (error) {
        console.error(error); 
        res.status(500).json({ msg: "Failed to create Raite" });
    }

}

export{
    createRaite
}
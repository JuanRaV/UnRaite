import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const createRaite = async (req,res) =>{
    const {startHour, date, start, startingPoint, destination, arrivalPoint, capacity, price } = req.body
    const {driverId} = req.driver

    const array = [startHour, date, start, destination, capacity, price].every(field => field && field !== '');

    if(!array)
        return res.status(400).json({ error: 'All fields are required' });

    

    try {

        const raite = await prisma.raite.create({
            data:{
                startHour,
                date,
                start,
                startingPoint,
                destination,
                arrivalPoint,
                capacity,
                price,
                driver: { connect: { driverId } }, // Asocia el raite con el conductor que lo está creando,
                // driverId 
            }
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
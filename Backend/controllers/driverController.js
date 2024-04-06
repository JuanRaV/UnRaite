import { PrismaClient } from "@prisma/client";
import set from 'date-fns/set'

const prisma = new PrismaClient()

const createRaite = async (req,res) =>{
    const {startHour, date, start, startingPoint, destination, arrivalPoint, capacity, price, passengers, passagnerReports, driverReports } = req.body
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
                passengers,
                passagnerReports,
                driverReports
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

const getRaites = async (req,res)=>{
    const {driverId} = req.driver

    const raites = await prisma.raite.findMany({where:{driverId}})
    if(raites.length == 0)
        res.status(500).json({ msg: "Start creating one Raite!" });

    res.json(raites)
}

//Gets data from specific raite
const getRaite = async(req,res) =>{
    const{id} = req.params
    const num = parseInt(id)
    try {
        const raite = await prisma.raite.findFirst({
            where: { id: num },
            include: { 
              passengers: { 
                include: { 
                  passenger: true 
                } 
              } 
            }
          });

        if(!raite)
            return res.status(500).json({ msg: "Raite not found" });
        else if(raite.driverId != req.driver.driverId)
            return res.status(500).json({ msg: "This is not your Raite" });
        return res.json(raite)
    } catch (error) {
        console.log(error)
    }
}

const editRaite = async (req, res) => {
    try {
      const { id } = req.params;
      const num = parseInt(id);

      const raite = await prisma.raite.findFirst({
        where: { id: num }
      });
  
      if (!raite) {
        return res.status(404).json({ error: 'Raite not found' });
      }
 
      const { startHour, date, start, startingPoint, destination, arrivalPoint, capacity, price, completed } = req.body;
  
      const updatedRaite = await prisma.raite.update({
        where: { id: num },
        data: {
          startHour,
          date,
          start,
          startingPoint,
          destination,
          arrivalPoint,
          capacity,
          price,
          completed
        }
      });

      res.json(updatedRaite);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
  const deleteRaite = async (req, res) => {
    try {
      const { id } = req.params;
      const num = parseInt(id);

      const raite = await prisma.raite.findFirst({
        where: { id: num }
      });

      if (!raite) {
        return res.status(404).json({ error: 'Raite not found' });
      }

      await prisma.raite.delete({
        where: { id: num }
      });

      res.json({ message: 'Raite deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

export{
    createRaite,
    getRaites,
    getRaite
}
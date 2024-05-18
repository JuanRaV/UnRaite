import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const createRaite = async (req, res) => {
  const { startHour, date, start, startingPoint, destination, arrivalPoint, capacity, price, passengers, passagnerReports, driverReports } = req.body
  const { driverId } = req.driver

  const array = [startHour, date, start, destination, capacity, price].every(field => field && field !== '');

  if (!array)
    return res.status(400).json({ msg: 'All fields are required' });

  try {

    const raite = await prisma.raite.create({
      data: {
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
    res.json({ msg: "Raite created successfully" })
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to create Raite" });
  }

}

const getRaites = async (req, res) => {
  const { driverId } = req.driver

  const raites = await prisma.raite.findMany({ where: { driverId } })
  if (raites.length == 0)
    res.status(500).json({ msg: "Start creating one Raite!" });

  res.json(raites)
}

//Gets data from specific raite
const getRaite = async (req, res) => {
  const { id } = req.params
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

    if (!raite)
      return res.status(500).json({ msg: "Raite not found" });
    else if (raite.driverId != req.driver.driverId)
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

    if (!raite)
      return res.status(404).json({ msg: 'Raite not found' });
    else if (raite.driverId != req.driver.driverId)
      return res.status(500).json({ msg: "This is not your Raite" });

    const { startHour, date, start, startingPoint, destination, arrivalPoint, capacity, price, completed } = req.body;
    // raite.startHour = startHour || raite.startHour

    const updatedRaite = await prisma.raite.update({
      where: { id: num },
      data: {
        startHour: startHour || raite.startHour,
        date: date || raite.date,
        start: start || raite.start,
        startingPoint: startingPoint || raite.startingPoint,
        destination: destination || raite.destination,
        arrivalPoint: arrivalPoint || raite.arrivalPoint,
        capacity: capacity || raite.capacity,
        price: price || raite.price,
        completed: completed || raite.completed
      }
    });

    res.json(updatedRaite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

//TODO Add functionality of delete raite before 2 day of the trip
const deleteRaite = async (req, res) => {
  try {
    const { id } = req.params;
    const num = parseInt(id);

    const raite = await prisma.raite.findFirst({
      where: { id: num },
      include: {
        passengers: true,
        passagnerReports: true,
        driverReports: true
      }
    });

    if (!raite)
      return res.status(404).json({ msg: 'Raite not found' });
    else if (raite.driverId != req.driver.driverId)
      return res.status(500).json({ msg: "This is not your Raite" });

    await prisma.passengerRaite.deleteMany({
      where: { raiteId: num }
    });
    await prisma.passengerReport.deleteMany({
      where: { raiteId: num }
    });
    await prisma.driverReport.deleteMany({
      where: { raiteId: num }
    });

    // console.log(raite)
    // console.log(req.driver)
    // return
    const deletedRaite = await prisma.raite.delete({
      where: { id: num }
    });
    console.log(deletedRaite)
    return res.json({ msg: 'Raite deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const completeRaite = async (req, res) => {
  const { id } = req.params;
  const num = parseInt(id);

  const raite = await prisma.raite.findFirst({
    where: { id: num }
  });

  if (!raite)
    return res.status(404).json({ msg: 'Raite not found' });
  else if (raite.driverId != req.driver.driverId)
    return res.status(500).json({ msg: "This is not your Raite" });
  else if (raite.completed)
    return res.status(500).json({ msg: "Raite already completed" });
  try {
    await prisma.raite.update({
      where: { id: num },
      data: {
        completed: true
      }
    })
    return res.json({ message: 'Finish of the road, thanks for join' });
  } catch (error) {
    consolelog(error)
  }

}

const strike = async (req, res) => {
  const { passengerId, raiteId } = req.params
  const num = parseInt(raiteId);

  const passengerRaite = await prisma.passengerRaite.findFirst({ where: { passengerId, raiteId: num } })

  const raite = await prisma.raite.findFirst({where:{id:num}})

  const report = await prisma.driverReport.findFirst({where:{raiteId:num,accusedPassengerId:passengerId}})

  // console.log(report)
  if(report)
    return res.status(404).json({ msg: "Report Already Created" })

  if ((!passengerRaite) || (raite.driverId!= req.driver.driverId))
    return res.status(404).json({ msg: "You Can Not Do This Action" })

  // Crear el reporte del conductor
  try {
    await prisma.driverReport.create({
      data: {
        raiteId: num,
        reporterDriverId: req.driver.driverId,
        accusedPassengerId: passengerId
      }
    });
    //Increment number of passenger strikes
    const passenger = await prisma.passenger.update({
      where:{passengerId},
      data: {
        strike:{
          increment: 1
        }
      } 
    })
    return res.json({ msg: `Report to ${passenger.name} created successfully` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Internal server error' });
  }
}


export {
  createRaite,
  getRaites,
  getRaite,
  editRaite,
  deleteRaite,
  completeRaite,
  strike
}
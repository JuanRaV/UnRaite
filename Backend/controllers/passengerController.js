import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const acceptRaite = async (req, res) => {
  try {
    const { id } = req.params;
    const num = parseInt(id);
    const passengerId = req.passenger.passengerId

    const raite = await prisma.raite.findFirst({
      where: { id :num }
    });

    if (!raite) 
      return res.status(404).json({ error: 'Raite not found' });
    
    console.log(raite)
    // Crea el registro en PassengerRaite
    const passengerRaite = await prisma.passengerRaite.create({
        data: {
          passengerId,
          raiteId: raite.id
        }
      });
  
      console.log(passengerRaite);
  
      res.json({ message: 'Raite accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const cancelRaite = async(req,res)=>{

}

export {
  acceptRaite,
  cancelRaite
}

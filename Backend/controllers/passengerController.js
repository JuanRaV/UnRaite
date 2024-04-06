import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const acceptRaite = async (req, res) => {
    try {
        const { id } = req.params;
        const num = parseInt(id);
        const passengerId = req.passenger.passengerId

        const raite = await prisma.raite.findFirst({
            where: { id: num }
        });

        if (!raite)
            return res.status(404).json({ error: 'Raite not found' });
        else if (raite.completed == true)
            return res.status(404).json({ error: 'Raite already completed' });
        else if (raite.capacity == 0)
            return res.status(404).json({ error: 'This raite is full' });

        await prisma.passengerRaite.create({
            data: {
                passengerId,
                raiteId: raite.id
            }
        });
        await prisma.raite.update({
            where: { id: num },
            data: {
                capacity: raite.capacity-1
            }
        });
        

        res.json({ message: 'Raite accepted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const cancelRaite = async (req, res) => {

}

export {
    acceptRaite,
    cancelRaite
}

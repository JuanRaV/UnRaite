import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getAllRaites = async (req, res) => {
    const allRaites = await prisma.raite.findMany({
        where: {
            capacity: {
                not: 0
            }
        }
    });
    if (!allRaites)
        return res.status(404).json({ error: "There are no Raites available" });
    res.json({ allRaites })
}

const getOneRaite = async (req, res) => {
    const { id } = req.params
    const num = parseInt(id)
    try {
        const raite = await prisma.raite.findFirst({
            where: { id: num },
            include: {
                driver: true,
                passengers: {
                    include: {
                        passenger: true
                    }
                }

            }
        });

        if (!raite)
            return res.status(500).json({ msg: "Raite not found" });

        return res.json(raite)
    } catch (error) {
        console.log(error)
    }
}

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
                capacity: raite.capacity - 1
            }
        });


        res.json({ message: 'Raite accepted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const cancelRaite = async (req, res) => {
    const { id } = req.params
    const num = parseInt(id);
    const passengerId = req.passenger.passengerId


    try {

        const raite = await prisma.passengerRaite.findFirst({
            where: {
                passengerId,
                raiteId: num,
            }
        });

        if (!raite)
            return res.status(404).json({ error: 'Raite not found' });

        await prisma.passengerRaite.delete({
            where: {
                passengerId_raiteId: {
                    passengerId,
                    raiteId: num,
                }
            }
        });

        await prisma.raite.update({
            where: { id: num },
            data: {
                capacity: {
                    increment: 1
                }
            }
        });
        res.json({ message: 'Raite canceled successfully' });
    } catch (error) {
        console.log(error)
    }

}

export {
    getAllRaites,
    getOneRaite,
    acceptRaite,
    cancelRaite
}

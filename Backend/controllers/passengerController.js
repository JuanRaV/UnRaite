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
        return res.status(404).json({ msg: "There are no Raites available" });
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
        const passengerRaite = await prisma.passengerRaite.findFirst({ where: { passengerId, raiteId: num } })

        if (!raite)
            return res.status(404).json({ msg: 'Raite not found' });
        else if (passengerRaite)
            return res.status(404).json({ msg: 'You are already in this trip' });
        else if (raite.completed == true)
            return res.status(404).json({ msg: 'Raite already completed' });
        else if (raite.capacity == 0)
            return res.status(404).json({ msg: 'This raite is full' });

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


        res.json({ msg: 'Raite accepted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
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
            return res.status(404).json({ msg: 'Raite not found' });

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
        res.json({ msg: 'Raite canceled successfully' });
    } catch (error) {
        console.log(error)
    }

}

const strike = async (req, res) => {
    const { driverId, raiteId } = req.params
    const num = parseInt(raiteId)

    const raite = await prisma.raite.findFirst({
        where: { id: num },
        include: {
          passengers: {
            where: { passengerId: req.passenger.passengerId }
          },
        },
      });

    const passengerRaite = await prisma.passengerRaite.findFirst({
        where: { passengerId: req.passenger.passengerId, raiteId: num },
    });

    const report = await prisma.passengerReport.findFirst({ where: { raiteId: num, accusedDriverId: driverId } })

    // console.log(report)
    if (report)
        return res.status(404).json({ msg: "Report Already Created" })

    if ((!passengerRaite) || (raite.passengers.length == 0))
        return res.status(404).json({ msg: "You Can Not Do This Action" })

}

export {
    getAllRaites,
    getOneRaite,
    acceptRaite,
    cancelRaite,
    strike
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getAllRaites = async (req, res) => {
    const allRaites = await prisma.raite.findMany({
        where: {
            capacity: {
                not: 0
            },
            completed:false
        }
    });
    if (!allRaites)
        return res.status(404).json({ msg: "There are no Raites available" });
    res.json({ allRaites })
}
// const getStoryRaite = async (req, res) => {
//     const allRaites = await prisma.raite.findMany({
//         where: {
//             capacity: {
//                 not: 0
//             },
//             completed:true
//         },
//         include:{
//             passengers:true
//         }
//     });
//     if (!allRaites)
//         return res.status(404).json({ msg: "There are no Raites available" });
//     res.json({ allRaites })
// }
// const getStoryRaite = async (req,res) =>{
//     const allRaites = await prisma.raite.findMany({
//         where: {
//             completed:true,
//         },
//         include:{
//             passengers:true
//         }
//     });
//     if (!allRaites)
//         return res.status(404).json({ msg: "There are no Raites available" });
//     res.json({ allRaites })
// }

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
        const passengerWithRaite = await prisma.passengerRaite.findFirst({where :{passengerId, raiteId:{not:num}, raite:{completed:false}}})
        if (!raite)
            return res.status(404).json({ msg: 'Raite not found' });
        else if (passengerRaite)
            return res.status(404).json({ msg: 'You are already in this trip' });
        else if(passengerWithRaite)
            return res.status(404).json({ msg: 'You are in other trip' });
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
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
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

    const driver = await prisma.passengerRaite.findFirst({
        where: { passengerId: req.passenger.passengerId, raiteId: num },
        include: {
            raite: {
                include: {
                    driver: true
                }
            }
        }
    });
    if (!driver)
        return res.status(404).json({ msg: "Something went wrong" })

    const raiteDriverId = driver?.raite.driverId

    const report = await prisma.passengerReport.findFirst({ where: { raiteId: num, accusedDriverId: driverId, reporterPassengerId: req.passenger.passengerId } })

    if (raiteDriverId != driverId || raiteDriverId == null)
        return res.status(404).json({ msg: "This is not the driver for this raite" })

    // console.log(report)
    if (report)
        return res.status(404).json({ msg: "Report Already Created" })

    if ((!passengerRaite) || (raite.passengers.length == 0))
        return res.status(404).json({ msg: "You Can Not Do This Action" })

    try {
        await prisma.passengerReport.create({
            data: {
                raiteId: num,
                reporterPassengerId: req.passenger.passengerId,
                accusedDriverId: driverId
            }
        });
        const count = await prisma.passengerReport.count({
            where: { accusedDriverId: driverId, raiteId: num },
        });
        console.log(count)
        if (count >= 2) {
            const driver = await prisma.driver.update({
                where: { driverId },
                data: {
                    strike: {
                        increment: 1
                    }
                }
            })
        }
        return res.json({ msg: `Report created successfully` })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

// const getRideHistory = async (req, res) => {
//     const passengerId = req.passenger.passengerId;

//     try {
//         const rideHistory = await prisma.passengerRaite.findMany({
//             where: { passengerId },
//             include: {
//                 raite: {
//                     include: {
//                         driver: {
//                             select: {
//                                 name: true,
//                                 email: true,
//                                 phoneNumber: true
//                             }
//                         } 
//                     }
//                 }
//             }
//         });

//         res.status(200).json(rideHistory);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch ride history' });
//     }
// };

export {
    getAllRaites,
    // getStoryRaite,
    getOneRaite,
    acceptRaite,
    cancelRaite,
    strike,
   
    // getStoryRaite
    // getRideHistory 
}

import { PrismaClient } from "@prisma/client";
import generateID from "../helpers/generateID.js";
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()


async function main() {
  // const allProperties = Reflect.ownKeys(Object.getPrototypeOf(prisma))
  // const modelNames = allProperties.filter(x => x != "constructor" && x != "on" && x != "connect" && x != "runDisconnect" && x != "disconnect")

  // for (modelName of modelNames) {

  //   // handle async stuff
  //   prisma[modelName].deleteMany()
  // }

  const hashedPassword = await bcrypt.hash('123', 10);
  const driver1 = await prisma.driver.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      driverId: 'd' + generateID(),
      name: 'Alice',
      email: 'alice@example.com',
      password: hashedPassword,
      phoneNumber: 42,
      frontDriversLicence: '/alice_license_front.png',
      backDriversLicence: '/alice_license_back.png',
      frontStudentCredential: '/alice_student_front.png',
      backStudentCredential: '/alice_student_back.png',
      verified: true
    },
  });

  const driverpass1 = await prisma.passenger.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      passengerId: 'p' + generateID(),
      name: 'Alice',
      email: 'alice@example.com',
      password: hashedPassword,
      phoneNumber: 42,
      frontStudentCredential: '/alice_student_front.png',
      backStudentCredential: '/alice_student_back.png',
      verified: true
    },
  });

  const driver2 = await prisma.driver.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      driverId: 'd' + generateID(),
      name: 'Bob',
      email: 'bob@example.com',
      password: hashedPassword,
      phoneNumber: 43,
      frontDriversLicence: '/bob_license_front.png',
      backDriversLicence: '/bob_license_back.png',
      frontStudentCredential: '/bob_student_front.png',
      backStudentCredential: '/bob_student_back.png',
      verified: true
    },
  });

  const driverpass2 = await prisma.passenger.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      passengerId: 'p' + generateID(),
      name: 'Bob',
      email: 'bob@example.com',
      password: hashedPassword,
      phoneNumber: 43,
      frontStudentCredential: '/bob_student_front.png',
      backStudentCredential: '/bob_student_back.png',
      verified: true
    },
  });

  const driver3 = await prisma.driver.upsert({
    where: { email: 'eva@example.com' },
    update: {},
    create: {
      driverId: 'd' + generateID(),
      name: 'Eva',
      email: 'eva@example.com',
      password: hashedPassword,
      phoneNumber: 44,
      frontDriversLicence: '/eva_license_front.png',
      backDriversLicence: '/eva_license_back.png',
      frontStudentCredential: '/eva_student_front.png',
      backStudentCredential: '/eva_student_back.png'
    },
  });

  const driverpass3 = await prisma.passenger.upsert({
    where: { email: 'eva@example.com' },
    update: {},
    create: {
      passengerId: 'p' + generateID(),
      name: 'Eva',
      email: 'eva@example.com',
      password: hashedPassword,
      phoneNumber: 44,
      frontStudentCredential: '/eva_student_front.png',
      backStudentCredential: '/eva_student_back.png'
    },
  });

  const passenger1 = await prisma.passenger.upsert({
    where: { email: 'emma@example.com' },
    update: {},
    create: {
      passengerId: 'p' + generateID(),
      name: 'Emma',
      email: 'emma@example.com',
      password: hashedPassword,
      phoneNumber: 55,
      frontStudentCredential: '/emma_student_front.png',
      backStudentCredential: '/emma_student_back.png',
      verified: true
    },
  });

  const passenger2 = await prisma.passenger.upsert({
    where: { email: 'daniel@example.com' },
    update: {},
    create: {
      passengerId: 'p' + generateID(),
      name: 'Daniel',
      email: 'daniel@example.com',
      password: hashedPassword,
      phoneNumber: 66,
      frontStudentCredential: '/daniel_student_front.png',
      backStudentCredential: '/daniel_student_back.png',
      verified: true
    },
  });

  const raite1 = await prisma.raite.upsert({
    where: { id: 1 },
    update: {},
    create: {

      startHour: "2024-04-06T10:45:00.000Z",
      start: "San Miguel el Alto",
      date: "2024-04-06T10:45:00.000Z",
      startingPoint: "",
      destination: "Guadalajara",
      arrivalPoint: "",
      capacity: 3,
      price: 23,
      driverId: driver1.driverId

    }
  })

  const raite2 = await prisma.raite.upsert({
    where: { id: 2 },
    update: {},
    create: {

      startHour: "2024-04-06T10:45:00.000Z",
      start: "Arandas",
      startingPoint: "",
      date: "05-04-2024",
      destination: "Guadalajara",
      arrivalPoint: "",
      capacity: 2,
      price: 60,
      driverId: driver2.driverId

    }
  })

  const raite3 = await prisma.raite.upsert({
    where: { id: 3 },
    update: {},
    create: {

      startHour: "2024-04-06T10:45:00.000Z",
      start: "Guadalajara",
      date: "05-04-2024",
      startingPoint: "",
      destination: "Tequila",
      arrivalPoint: "",
      capacity: 4,
      price: 160,
      driverId: driver1.driverId

    }
  })

  const raite4 = await prisma.raite.upsert({
    where: { id: 4 },
    update: {},
    create: {

      startHour: "2024-04-06T10:45:00.000Z",
      start: "Guadalajara",
      date: "05-04-2024",
      startingPoint: "",
      destination: "San Sebastian",
      arrivalPoint: "",
      capacity: 1,
      price: 110,
      driverId: driver2.driverId

    }
  })

  const passraite1 = await prisma.passengerRaite.upsert({
    where: {
      passengerId_raiteId: {
        passengerId: passenger1.passengerId,
        raiteId: raite1.id
      }
    },
    update: {},
    create: {
      passengerId: passenger1.passengerId,
      raiteId: raite1.id
    }
  })

  const passraite2 = await prisma.passengerRaite.upsert({
    where: {
      passengerId_raiteId: {
        passengerId: passenger2.passengerId,
        raiteId: raite1.id
      }
    },
    update: {},
    create: {
      passengerId: passenger2.passengerId,
      raiteId: raite1.id
    }
  })

  const passraite3 = await prisma.passengerRaite.upsert({
    where: {
      passengerId_raiteId: {
        passengerId: passenger1.passengerId,
        raiteId: raite3.id
      }
    },
    update: {},
    create: {
      passengerId: passenger1.passengerId,
      raiteId: raite3.id
    }
  })
  console.log({ driver1, driver2, driver3, passenger1, passenger2, driverpass1 });
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

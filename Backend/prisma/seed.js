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
  const adminHashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD,10)

  const admin = await prisma.admin.create({
    data:{
      adminUsername: "JuanRaV231102",
      password: adminHashedPassword
    }
  })

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
  const passenger3 = await prisma.passenger.upsert({
    where: { email: 'edu@example.com' },
    update: {},
    create: {
      passengerId: 'p' + generateID(),
      name: 'Eduardo',
      email: 'edu@example.com',
      password: hashedPassword,
      phoneNumber: 77,
      frontStudentCredential: '/edu_student_front.png',
      backStudentCredential: '/edu_student_back.png',
      verified: true
    },
  });

  const raite1 = await prisma.raite.upsert({
    where: { id: 1 },
    update: {},
    create: {

      startHour: "12:30",
      start: "San Miguel el Alto",
      date: "21-08-2024",
      startingPoint: "Plaza de Toros",
      destination: "Guadalajara",
      arrivalPoint: "Midtown",
      capacity: 3,
      price: 23,
      driverId: driver1.driverId

    }
  })

  const raite2 = await prisma.raite.upsert({
    where: { id: 2 },
    update: {},
    create: {

      startHour: "17:45",
      start: "Arandas",
      startingPoint: "Bramido",
      date: "05-04-2024",
      destination: "Guadalajara",
      arrivalPoint: "RIU",
      capacity: 2,
      price: 60,
      driverId: driver2.driverId

    }
  })

  const raite3 = await prisma.raite.upsert({
    where: { id: 3 },
    update: {},
    create: {

      startHour: "11:15",
      start: "Guadalajara",
      date: "05-04-2024",
      startingPoint: "La Cima",
      destination: "Tequila",
      arrivalPoint: "Cantaritos el Guero",
      capacity: 4,
      price: 160,
      driverId: driver1.driverId

    }
  })

  const raite4 = await prisma.raite.upsert({
    where: { id: 4 },
    update: {},
    create: {

      startHour: "15:30",
      start: "Guadalajara",
      date: "05-04-2024",
      startingPoint: "La Gran Plaza",
      destination: "San Sebastian",
      arrivalPoint: "Plaza",
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
  const passraite4 = await prisma.passengerRaite.upsert({
    where: {
      passengerId_raiteId: {
        passengerId: passenger3.passengerId,
        raiteId: raite2.id
      }
    },
    update: {},
    create: {
      passengerId: passenger3.passengerId,
      raiteId: raite2.id
    }
  })

  await prisma.townToGdl.upsert({ where: { id: 1 }, update:{}, create:{ townName: "Acatic", price: 283 } })
  await prisma.townToGdl.upsert({ where: { id: 2 }, update:{}, create:{ townName: "Acatlán de Juárez", price: 99 } })
  await prisma.townToGdl.upsert({ where: { id: 3 }, update:{}, create:{ townName: "Ahualulco de Mercado", price: 163 } })
  await prisma.townToGdl.upsert({ where: { id: 4 }, update:{}, create:{ townName: "Amacueca", price: 333 } })
  await prisma.townToGdl.upsert({ where: { id: 5 }, update:{}, create:{ townName: "Amatitán", price: 106 } })
  await prisma.townToGdl.upsert({ where: { id: 6 }, update:{}, create:{ townName: "Ameca", price: 189 } })
  await prisma.townToGdl.upsert({ where: { id: 7 }, update:{}, create:{ townName: "San Juanito de Escobedo", price: 191 } })
  await prisma.townToGdl.upsert({ where: { id: 8 }, update:{}, create:{ townName: "Arandas", price: 536 } })
  await prisma.townToGdl.upsert({ where: { id: 9 }, update:{}, create:{ townName: "El Arenal", price: 90 } })
  await prisma.townToGdl.upsert({ where: { id: 10 }, update:{}, create:{ townName: "Atemajac de Brizuela", price: 207 } })
  await prisma.townToGdl.upsert({ where: { id: 11 }, update:{}, create:{ townName: "Atengo", price: 315 } })
  await prisma.townToGdl.upsert({ where: { id: 12 }, update:{}, create:{ townName: "Atenguillo", price: 336 } })
  await prisma.townToGdl.upsert({ where: { id: 13 }, update:{}, create:{ townName: "Atotonilco el Alto", price: 298 } })
  await prisma.townToGdl.upsert({ where: { id: 14 }, update:{}, create:{ townName: "Atoyac", price: 315 } })
  await prisma.townToGdl.upsert({ where: { id: 15 }, update:{}, create:{ townName: "Autlán de Navarro", price: 437 } })
  await prisma.townToGdl.upsert({ where: { id: 16 }, update:{}, create:{ townName: "Ayotlán", price: 355 } })
  await prisma.townToGdl.upsert({ where: { id: 17 }, update:{}, create:{ townName: "Ayutla", price: 354 } })
  await prisma.townToGdl.upsert({ where: { id: 18 }, update:{}, create:{ townName: "La Barca", price: 494 } })
  await prisma.townToGdl.upsert({ where: { id: 19 }, update:{}, create:{ townName: "Bolaños", price: 510 } })
  await prisma.townToGdl.upsert({ where: { id: 20 }, update:{}, create:{ townName: "Cabo Corrientes", price: 1823 } })
  await prisma.townToGdl.upsert({ where: { id: 21 }, update:{}, create:{ townName: "Casimiro Castillo", price: 895 } })
  await prisma.townToGdl.upsert({ where: { id: 22 }, update:{}, create:{ townName: "Cihuatlán", price: 1136 } })
  await prisma.townToGdl.upsert({ where: { id: 23 }, update:{}, create:{ townName: "Zapotlán el Grande", price: 497 } })
  await prisma.townToGdl.upsert({ where: { id: 24 }, update:{}, create:{ townName: "Cocula", price: 163 } })
  await prisma.townToGdl.upsert({ where: { id: 25 }, update:{}, create:{ townName: "Colotlán", price: 485 } })
  await prisma.townToGdl.upsert({ where: { id: 26 }, update:{}, create:{ townName: "Concepción de Buenos Aires", price: 253 } })
  await prisma.townToGdl.upsert({ where: { id: 27 }, update:{}, create:{ townName: "Cuautitlán de García Barragán", price: 616 } })
  await prisma.townToGdl.upsert({ where: { id: 28 }, update:{}, create:{ townName: "Cuautla", price: 423 } })
  await prisma.townToGdl.upsert({ where: { id: 29 }, update:{}, create:{ townName: "Cuquío", price: 175 } })
  await prisma.townToGdl.upsert({ where: { id: 30 }, update:{}, create:{ townName: "Chapala", price: 117 } })
  await prisma.townToGdl.upsert({ where: { id: 31 }, update:{}, create:{ townName: "Chimaltitán", price: 499 } })
  await prisma.townToGdl.upsert({ where: { id: 32 }, update:{}, create:{ townName: "Chiquilistlán", price: 294 } })
  await prisma.townToGdl.upsert({ where: { id: 33 }, update:{}, create:{ townName: "Degollado", price: 662 } })
  await prisma.townToGdl.upsert({ where: { id: 34 }, update:{}, create:{ townName: "Ejutla", price: 400 } })
  await prisma.townToGdl.upsert({ where: { id: 35 }, update:{}, create:{ townName: "Encarnación de Díaz", price: 843 } })
  await prisma.townToGdl.upsert({ where: { id: 36 }, update:{}, create:{ townName: "Etzatlán", price: 198} })
  await prisma.townToGdl.upsert({ where: { id: 37 }, update:{}, create:{ townName: "El Grullo", price: 515 } })
  await prisma.townToGdl.upsert({ where: { id: 38 }, update:{}, create:{ townName: "Guachinango", price: 292 } })
  await prisma.townToGdl.upsert({ where: { id: 39 }, update:{}, create:{ townName: "Hostotipaquillo", price: 218 } })
  await prisma.townToGdl.upsert({ where: { id: 40 }, update:{}, create:{ townName: "Huejúcar", price: 559 } })
  await prisma.townToGdl.upsert({ where: { id: 41 }, update:{}, create:{ townName: "Huejuquilla el Alto", price: 863 } })
  await prisma.townToGdl.upsert({ where: { id: 42 }, update:{}, create:{ townName: "La Huerta", price: 582 } })
  await prisma.townToGdl.upsert({ where: { id: 43 }, update:{}, create:{ townName: "Ixtlahuacán de los Membrillos", price: 99 } })
  await prisma.townToGdl.upsert({ where: { id: 44 }, update:{}, create:{ townName: "Ixtlahuacán del Río", price: 117 } })
  await prisma.townToGdl.upsert({ where: { id: 45 }, update:{}, create:{ townName: "Jalostotitlán", price: 640 } })
  await prisma.townToGdl.upsert({ where: { id: 46 }, update:{}, create:{ townName: "Jamay", price: 415 } })
  await prisma.townToGdl.upsert({ where: { id: 47 }, update:{}, create:{ townName: "Jesús María", price: 784 } })
  await prisma.townToGdl.upsert({ where: { id: 48 }, update:{}, create:{ townName: "Jilotlán de los Dolores", price: 713 } })
  await prisma.townToGdl.upsert({ where: { id: 49 }, update:{}, create:{ townName: "Jocotepec", price: 138 } })
  await prisma.townToGdl.upsert({ where: { id: 50 }, update:{}, create:{ townName: "Juanacatlán", price: 80 } })
  await prisma.townToGdl.upsert({ where: { id: 51 }, update:{}, create:{ townName: "Juchitlán", price: 285 } })
  await prisma.townToGdl.upsert({ where: { id: 52 }, update:{}, create:{ townName: "Lagos de Moreno", price: 853 } })
  await prisma.townToGdl.upsert({ where: { id: 53 }, update:{}, create:{ townName: "El Limón", price: 697 } })
  await prisma.townToGdl.upsert({ where: { id: 54 }, update:{}, create:{ townName: "Magdalena", price: 361 } })
  await prisma.townToGdl.upsert({ where: { id: 55 }, update:{}, create:{ townName: "Santa María del Oro", price: 662 } })
  await prisma.townToGdl.upsert({ where: { id: 56 }, update:{}, create:{ townName: "La Manzanilla de la Paz", price: 258 } })
  await prisma.townToGdl.upsert({ where: { id: 57 }, update:{}, create:{ townName: "Mascota", price: 460 } })
  await prisma.townToGdl.upsert({ where: { id: 58 }, update:{}, create:{ townName: "Mazamitla", price: 304 } })
  await prisma.townToGdl.upsert({ where: { id: 59 }, update:{}, create:{ townName: "Mexticacán", price: 582 } })
  await prisma.townToGdl.upsert({ where: { id: 60 }, update:{}, create:{ townName: "Mezquitic", price: 1034 } })
  await prisma.townToGdl.upsert({ where: { id: 61 }, update:{}, create:{ townName: "Mixtlán", price: 310 } })
  await prisma.townToGdl.upsert({ where: { id: 62 }, update:{}, create:{ townName: "Ocotlán", price: 387 } })
  await prisma.townToGdl.upsert({ where: { id: 63 }, update:{}, create:{ townName: "Ojuelos de Jalisco", price: 1023 } })
  await prisma.townToGdl.upsert({ where: { id: 64 }, update:{}, create:{ townName: "Pihuamo", price: 625 } })
  await prisma.townToGdl.upsert({ where: { id: 65 }, update:{}, create:{ townName: "Poncitlán", price: 154 } })
  await prisma.townToGdl.upsert({ where: { id: 66 }, update:{}, create:{ townName: "Puerto Vallarta", price: 1713 } })
  await prisma.townToGdl.upsert({ where: { id: 67 }, update:{}, create:{ townName: "Villa Purificación", price: 534 } })
  await prisma.townToGdl.upsert({ where: { id: 68 }, update:{}, create:{ townName: "Quitupan", price: 600 } })
  await prisma.townToGdl.upsert({ where: { id: 69 }, update:{}, create:{ townName: "El Salto", price: 75 } })
  await prisma.townToGdl.upsert({ where: { id: 70 }, update:{}, create:{ townName: "San Cristóbal de la Barranca", price: 133 } })
  await prisma.townToGdl.upsert({ where: { id: 71 }, update:{}, create:{ townName: "San Diego de Alejandría", price: 691 } })
  await prisma.townToGdl.upsert({ where: { id: 72 }, update:{}, create:{ townName: "San Juan de los Lagos", price: 759 } })
  await prisma.townToGdl.upsert({ where: { id: 73 }, update:{}, create:{ townName: "San Julián", price: 645 } })
  await prisma.townToGdl.upsert({ where: { id: 74 }, update:{}, create:{ townName: "San Marcos", price: 225 } })
  await prisma.townToGdl.upsert({ where: { id: 75 }, update:{}, create:{ townName: "San Martín de Bolaños", price: 535 } })
  await prisma.townToGdl.upsert({ where: { id: 76 }, update:{}, create:{ townName: "San Martín Hidalgo", price: 188 } })
  await prisma.townToGdl.upsert({ where: { id: 77 }, update:{}, create:{ townName: "San Miguel el Alto", price: 588 } })
  await prisma.townToGdl.upsert({ where: { id: 78 }, update:{}, create:{ townName: "Gómez Farías", price: 451 } })
  await prisma.townToGdl.upsert({ where: { id: 79 }, update:{}, create:{ townName: "San Sebastián del Oeste", price: 573 } })
  await prisma.townToGdl.upsert({ where: { id: 80 }, update:{}, create:{ townName: "Santa María de los Ángeles", price: 505 } })
  await prisma.townToGdl.upsert({ where: { id: 81 }, update:{}, create:{ townName: "Sayula", price: 260 } })
  await prisma.townToGdl.upsert({ where: { id: 82 }, update:{}, create:{ townName: "Tala", price: 105} })
  await prisma.townToGdl.upsert({ where: { id: 83 }, update:{}, create:{ townName: "Talpa de Allende", price: 453 } })
  await prisma.townToGdl.upsert({ where: { id: 84 }, update:{}, create:{ townName: "Tamazula de Gordiano", price: 565 } })
  await prisma.townToGdl.upsert({ where: { id: 85 }, update:{}, create:{ townName: "Tapalpa", price: 390 } })
  await prisma.townToGdl.upsert({ where: { id: 86 }, update:{}, create:{ townName: "Tecalitlán", price: 565 } })
  await prisma.townToGdl.upsert({ where: { id: 87 }, update:{}, create:{ townName: "Techaluta de Montenegro", price: 190 } })
  await prisma.townToGdl.upsert({ where: { id: 88 }, update:{}, create:{ townName: "Tecolotlán", price: 255 } })
  await prisma.townToGdl.upsert({ where: { id: 89 }, update:{}, create:{ townName: "Tenamaxtlán", price: 290 } })
  await prisma.townToGdl.upsert({ where: { id: 90 }, update:{}, create:{ townName: "Teocaltiche", price: 743 } })
  await prisma.townToGdl.upsert({ where: { id: 91 }, update:{}, create:{ townName: "Teocuitatlán de Corona", price: 315 } })
  await prisma.townToGdl.upsert({ where: { id: 92 }, update:{}, create:{ townName: "Tepatitlán de Morelos", price: 370 } })
  await prisma.townToGdl.upsert({ where: { id: 93 }, update:{}, create:{ townName: "Tequila", price: 340 } })
  await prisma.townToGdl.upsert({ where: { id: 94 }, update:{}, create:{ townName: "Teuchitlán", price: 131 } })
  await prisma.townToGdl.upsert({ where: { id: 95 }, update:{}, create:{ townName: "Tizapán el Alto", price: 246 } })
  await prisma.townToGdl.upsert({ where: { id: 96 }, update:{}, create:{ townName: "Tlajomulco de Zúñiga", price: 75 } })
  await prisma.townToGdl.upsert({ where: { id: 97 }, update:{}, create:{ townName: "San Pedro Tlaquepaque", price: 18 } })
  await prisma.townToGdl.upsert({ where: { id: 98 }, update:{}, create:{ townName: "Tolimán", price: 634 } })
  await prisma.townToGdl.upsert({ where: { id: 99 }, update:{}, create:{ townName: "Tomatlán", price: 1943 } })
  await prisma.townToGdl.upsert({ where: { id: 100 }, update:{}, create:{ townName: "Tonalá", price: 46 } })
  await prisma.townToGdl.upsert({ where: { id: 101 }, update:{}, create:{ townName: "Tonaya", price: 643 } })
  await prisma.townToGdl.upsert({ where: { id: 102 }, update:{}, create:{ townName: "Tonila", price: 515 } })
  await prisma.townToGdl.upsert({ where: { id: 103 }, update:{}, create:{ townName: "Totatiche", price: 487 } })
  await prisma.townToGdl.upsert({ where: { id: 104 }, update:{}, create:{ townName: "Tototlán", price: 229 } })
  await prisma.townToGdl.upsert({ where: { id: 105 }, update:{}, create:{ townName: "Tuxcacuesco", price: 643 } })
  await prisma.townToGdl.upsert({ where: { id: 106 }, update:{}, create:{ townName: "Tuxcueca", price: 210 } })
  await prisma.townToGdl.upsert({ where: { id: 107 }, update:{}, create:{ townName: "Tuxpan", price: 540 } })
  await prisma.townToGdl.upsert({ where: { id: 108 }, update:{}, create:{ townName: "Unión de San Antonio", price: 932 } })
  await prisma.townToGdl.upsert({ where: { id: 109 }, update:{}, create:{ townName: "Unión de Tula", price: 354 } })
  await prisma.townToGdl.upsert({ where: { id: 110 }, update:{}, create:{ townName: "Valle de Guadalupe", price: 472 } })
  await prisma.townToGdl.upsert({ where: { id: 111 }, update:{}, create:{ townName: "Valle de Juárez", price: 322 } })
  await prisma.townToGdl.upsert({ where: { id: 112 }, update:{}, create:{ townName: "San Gabriel", price: 538 } })
  await prisma.townToGdl.upsert({ where: { id: 113 }, update:{}, create:{ townName: "Villa Corona", price: 117 } })
  await prisma.townToGdl.upsert({ where: { id: 114 }, update:{}, create:{ townName: "Villa Guerrero", price: 531 } })
  await prisma.townToGdl.upsert({ where: { id: 115 }, update:{}, create:{ townName: "Villa Hidalgo", price: 808 } })
  await prisma.townToGdl.upsert({ where: { id: 116 }, update:{}, create:{ townName: "Cañadas de Obregón", price: 529 } })
  await prisma.townToGdl.upsert({ where: { id: 117 }, update:{}, create:{ townName: "Yahualica de González Gallo", price: 489 } })
  await prisma.townToGdl.upsert({ where: { id: 118 }, update:{}, create:{ townName: "Zacoalco de Torres", price: 151 } })
  await prisma.townToGdl.upsert({ where: { id: 119 }, update:{}, create:{ townName: "Zapopan", price: 16 } })
  await prisma.townToGdl.upsert({ where: { id: 120 }, update:{}, create:{ townName: "Zapotiltic", price: 317 } })
  await prisma.townToGdl.upsert({ where: { id: 121 }, update:{}, create:{ townName: "Zapotitlán de Vadillo", price: 435 } })
  await prisma.townToGdl.upsert({ where: { id: 122 }, update:{}, create:{ townName: "Zapotlán del Rey", price: 138 } })
  await prisma.townToGdl.upsert({ where: { id: 123 }, update:{}, create:{ townName: "Zapotlanejo", price: 85 } })
  await prisma.townToGdl.upsert({ where: { id: 124 }, update:{}, create:{ townName: "San Ignacio Cerro Gordo", price: 257 } })
  await prisma.townToGdl.upsert({ where: { id: 125 }, update:{}, create:{ townName: "Guadalajara", price: 0 } })



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

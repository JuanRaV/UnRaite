-- CreateTable
CREATE TABLE `Driver` (
    `driverId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `phoneNumber` INTEGER NULL,
    `frontDriversLicence` VARCHAR(191) NULL,
    `backDriversLicence` VARCHAR(191) NULL,
    `frontStudentCredential` VARCHAR(191) NULL,
    `backStudentCredential` VARCHAR(191) NULL,
    `verified` BOOLEAN NULL,
    `strike` INTEGER NULL,

    UNIQUE INDEX `Driver_email_key`(`email`),
    UNIQUE INDEX `Driver_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`driverId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passenger` (
    `passengerId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `phoneNumber` INTEGER NULL,
    `frontStudentCredential` VARCHAR(191) NULL,
    `backStudentCredential` VARCHAR(191) NULL,
    `verified` BOOLEAN NULL,
    `strike` INTEGER NULL,

    UNIQUE INDEX `Passenger_email_key`(`email`),
    UNIQUE INDEX `Passenger_password_key`(`password`),
    UNIQUE INDEX `Passenger_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`passengerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Raite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startHour` DATETIME(3) NULL,
    `date` DATETIME(3) NULL,
    `start` VARCHAR(191) NULL,
    `startingPoint` VARCHAR(191) NULL,
    `destination` VARCHAR(191) NULL,
    `arrivalPoint` VARCHAR(191) NULL,
    `capacity` INTEGER NULL,
    `price` INTEGER NULL,
    `driverId` VARCHAR(191) NULL,
    `strike` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PassengerRaite` (
    `passengerId` VARCHAR(191) NOT NULL,
    `raiteId` INTEGER NOT NULL,

    PRIMARY KEY (`passengerId`, `raiteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Raite` ADD CONSTRAINT `Raite_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`driverId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PassengerRaite` ADD CONSTRAINT `PassengerRaite_passengerId_fkey` FOREIGN KEY (`passengerId`) REFERENCES `Passenger`(`passengerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PassengerRaite` ADD CONSTRAINT `PassengerRaite_raiteId_fkey` FOREIGN KEY (`raiteId`) REFERENCES `Raite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

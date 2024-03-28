/*
  Warnings:

  - Made the column `name` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `frontDriversLicence` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `backDriversLicence` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `frontStudentCredential` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `backStudentCredential` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `verified` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `strike` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `frontStudentCredential` on table `passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `backStudentCredential` on table `passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `verified` on table `passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `strike` on table `passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startHour` on table `raite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `raite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start` on table `raite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `destination` on table `raite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `capacity` on table `raite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `raite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `driverId` on table `raite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `strike` on table `raite` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `raite` DROP FOREIGN KEY `Raite_driverId_fkey`;

-- DropIndex
DROP INDEX `Passenger_password_key` ON `passenger`;

-- AlterTable
ALTER TABLE `driver` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `phoneNumber` INTEGER NOT NULL,
    MODIFY `frontDriversLicence` VARCHAR(191) NOT NULL,
    MODIFY `backDriversLicence` VARCHAR(191) NOT NULL,
    MODIFY `frontStudentCredential` VARCHAR(191) NOT NULL,
    MODIFY `backStudentCredential` VARCHAR(191) NOT NULL,
    MODIFY `verified` BOOLEAN NOT NULL,
    MODIFY `strike` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `passenger` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `phoneNumber` INTEGER NOT NULL,
    MODIFY `frontStudentCredential` VARCHAR(191) NOT NULL,
    MODIFY `backStudentCredential` VARCHAR(191) NOT NULL,
    MODIFY `verified` BOOLEAN NOT NULL,
    MODIFY `strike` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `raite` MODIFY `startHour` DATETIME(3) NOT NULL,
    MODIFY `date` DATETIME(3) NOT NULL,
    MODIFY `start` VARCHAR(191) NOT NULL,
    MODIFY `destination` VARCHAR(191) NOT NULL,
    MODIFY `capacity` INTEGER NOT NULL,
    MODIFY `price` INTEGER NOT NULL,
    MODIFY `driverId` VARCHAR(191) NOT NULL,
    MODIFY `strike` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `PassengerReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `raiteId` INTEGER NOT NULL,
    `reporterPassengerId` VARCHAR(191) NOT NULL,
    `accusedDriverId` VARCHAR(191) NOT NULL,

    INDEX `PassengerReport_raiteId_idx`(`raiteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DriverReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `raiteId` INTEGER NOT NULL,
    `reporterDriverId` VARCHAR(191) NOT NULL,
    `accusedPassengerId` VARCHAR(191) NOT NULL,

    INDEX `DriverReport_raiteId_idx`(`raiteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Raite` ADD CONSTRAINT `Raite_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`driverId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PassengerReport` ADD CONSTRAINT `PassengerReport_raiteId_fkey` FOREIGN KEY (`raiteId`) REFERENCES `Raite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PassengerReport` ADD CONSTRAINT `PassengerReport_reporterPassengerId_fkey` FOREIGN KEY (`reporterPassengerId`) REFERENCES `Passenger`(`passengerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PassengerReport` ADD CONSTRAINT `PassengerReport_accusedDriverId_fkey` FOREIGN KEY (`accusedDriverId`) REFERENCES `Driver`(`driverId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DriverReport` ADD CONSTRAINT `DriverReport_raiteId_fkey` FOREIGN KEY (`raiteId`) REFERENCES `Raite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DriverReport` ADD CONSTRAINT `DriverReport_reporterDriverId_fkey` FOREIGN KEY (`reporterDriverId`) REFERENCES `Driver`(`driverId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DriverReport` ADD CONSTRAINT `DriverReport_accusedPassengerId_fkey` FOREIGN KEY (`accusedPassengerId`) REFERENCES `Passenger`(`passengerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `driver` MODIFY `token` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `passenger` MODIFY `token` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `raite` ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false;

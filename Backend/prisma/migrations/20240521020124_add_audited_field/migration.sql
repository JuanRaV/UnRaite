-- AlterTable
ALTER TABLE `driver` ADD COLUMN `audited` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `passenger` ADD COLUMN `audited` BOOLEAN NOT NULL DEFAULT false;

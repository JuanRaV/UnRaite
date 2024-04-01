/*
  Warnings:

  - You are about to drop the column `strike` on the `raite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `driver` MODIFY `strike` INTEGER NULL;

-- AlterTable
ALTER TABLE `passenger` MODIFY `strike` INTEGER NULL;

-- AlterTable
ALTER TABLE `raite` DROP COLUMN `strike`;

-- CreateTable
CREATE TABLE `TownToGdl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `townName` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

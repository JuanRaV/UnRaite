-- CreateTable
CREATE TABLE `Admin` (
    `adminUsername` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL DEFAULT '',

    PRIMARY KEY (`adminUsername`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

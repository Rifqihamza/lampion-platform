/*
  Warnings:

  - Added the required column `roadmapId` to the `UserProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `roadmap` MODIFY `difficulty` ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') NOT NULL DEFAULT 'BEGINNER';

-- AlterTable
ALTER TABLE `userprogress` ADD COLUMN `isEnrolled` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `roadmapId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `password_reset_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `password_reset_tokens_email_key`(`email`),
    UNIQUE INDEX `password_reset_tokens_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_roadmapId_fkey` FOREIGN KEY (`roadmapId`) REFERENCES `Roadmap`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

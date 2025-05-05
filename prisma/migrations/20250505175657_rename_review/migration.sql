/*
  Warnings:

  - You are about to drop the column `starPoint` on the `review` table. All the data in the column will be lost.
  - Added the required column `star_point` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `starPoint`,
    ADD COLUMN `star_point` INTEGER NOT NULL;

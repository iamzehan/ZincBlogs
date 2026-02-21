/*
  Warnings:

  - Added the required column `filename` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "filename" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `email` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Comments` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Comments_email_key";

-- DropIndex
DROP INDEX "Comments_username_key";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "email",
DROP COLUMN "username",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Comments_userId_idx" ON "Comments"("userId");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

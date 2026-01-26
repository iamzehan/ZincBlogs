/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Subscriber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_username_key" ON "Subscriber"("username");

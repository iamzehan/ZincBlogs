/*
  Warnings:

  - The primary key for the `TagsOnBlogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TagsOnBlogs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagsOnBlogs" DROP CONSTRAINT "TagsOnBlogs_blogId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnBlogs" DROP CONSTRAINT "TagsOnBlogs_tagId_fkey";

-- DropIndex
DROP INDEX "TagsOnBlogs_blogId_tagId_idx";

-- AlterTable
ALTER TABLE "TagsOnBlogs" DROP CONSTRAINT "TagsOnBlogs_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TagsOnBlogs_pkey" PRIMARY KEY ("tagId", "blogId");

-- CreateIndex
CREATE INDEX "TagsOnBlogs_blogId_idx" ON "TagsOnBlogs"("blogId");

-- CreateIndex
CREATE INDEX "TagsOnBlogs_tagId_idx" ON "TagsOnBlogs"("tagId");

-- AddForeignKey
ALTER TABLE "TagsOnBlogs" ADD CONSTRAINT "TagsOnBlogs_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnBlogs" ADD CONSTRAINT "TagsOnBlogs_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

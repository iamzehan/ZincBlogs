-- CreateTable
CREATE TABLE "PublishBlog" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PublishBlog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublishBlog_blogId_key" ON "PublishBlog"("blogId");

-- AddForeignKey
ALTER TABLE "PublishBlog" ADD CONSTRAINT "PublishBlog_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

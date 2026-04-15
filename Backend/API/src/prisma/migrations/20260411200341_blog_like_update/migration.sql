-- CreateTable
CREATE TABLE "Likes" (
    "blogId" TEXT NOT NULL,
    "subsId" TEXT NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("blogId","subsId")
);

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_subsId_fkey" FOREIGN KEY ("subsId") REFERENCES "Subscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

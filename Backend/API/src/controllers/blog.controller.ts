import { prisma } from "../config/prisma.js";
import { NextFunction, Request, Response } from "express";

// =================================== CREATE A BLOG ==============================================//
export const createBlogPOST = async (req: Request, res: Response) => {
  try {
    const {title, content, tags} = req.body
    const parsedTags = JSON.parse(tags).map((t: string) => t.toLowerCase());

    const result = await prisma.$transaction(async (prismaTx) => {
      // Upsert tags and collect their IDs
      const tagIds: string[] = [];

      for (const tag of parsedTags) {
        const t = await prismaTx.tags.upsert({
          where: { tag },
          update: {},
          create: { tag }
        });
        tagIds.push(t.id);
      }

      // Create the blog
      const blog = await prismaTx.blog.create({
        data: {
          title,
          content
        }
      });

      // Populate the junction table TagsOnBlogs
      const tagsOnBlogsData = tagIds.map((tagId) => ({
        blogId: blog.id,
        tagId
      }));

      await prismaTx.tagsOnBlogs.createMany({
        data: tagsOnBlogsData,
        skipDuplicates: true
      });

      return blog;
    });
    // when that's done return a 201 response
    res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Blog post failed!" });
  }
};

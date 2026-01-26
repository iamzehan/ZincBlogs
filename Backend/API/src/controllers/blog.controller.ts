import { prisma } from "../config/prisma.js";
import { Request, Response } from "express";
import { Blog, BlogTitles } from "../generated/prisma/client.js";
import { parameterIDProcessor, tagParser } from "../utils/processors.js";

// =================================== GET ALL BLOGS TITLE ==============================================//

export const allBlogsTitleGET = async (req: Request, res: Response) => {
  try {
    const titles: BlogTitles[] | null = await prisma.blogTitles.findMany();
    res.status(200).json(titles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not find blogs" });
  }
};

// =================================== GET ALL BLOGS ==============================================//

export const allBlogsGET = async (req: Request, res: Response) => {
  try {
    const blogs: Blog[] | [] = await prisma.blog.findMany({
      include: {
        comments: true,
        tags: {
          include: {
            tag: true
          }
        }
      }
    });
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not find blogs" });
  }
};

// =================================== GET A BLOG DETAIL ==============================================//

export const findOneBlogGET = async (req: Request, res: Response) => {
  try {
    const id = parameterIDProcessor(req);
    const blog: Blog | null = await prisma.blog.findFirst({
      include: {
        comments: true,
        tags: {
          include: {
            tag: true
          }
        }
      },
      where: {
        id: id
      }
    });
    // get profile
    const profile = await prisma.profile.findFirst({
      where: {
        authorId: blog?.authorId
      }
    });

    res.status(200).json({...blog, authorInfo: profile});

  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Could not find blog details" });
  }
};

// =================================== UPDATE A BLOG ==============================================//

export const updateOneBlogPUT = async (req: Request, res: Response) => {
  try {
    const id = parameterIDProcessor(req);
    const { title, content, tags } = req.body;
    // Transaction handling updates
    const parsedTags = tagParser(tags); // => parse the tags
    await prisma.$transaction(async (prismaTx) => {
      // update tag records create if not exists, skip if exists
      const tagRecords = await Promise.all(
        parsedTags.map(async (tag: string) => {
          return prismaTx.tags.upsert({
            where: { tag: tag },
            update: {},
            create: { tag: tag }
          });
        })
      );

      // update the blog and set tags relations
      await prismaTx.blog.update({
        where: { id: id },
        data: {
          title,
          content,
          tags: {
            // delete old existing tags
            deleteMany: {},
            // insert new tags
            create: tagRecords.map((tag) => ({
              tag: { connect: { id: tag.id } } // add all tags
            }))
          }
        }
      });
    });
    res.status(200).json({ message: "Blog updated!" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Could not find blog details" });
  }
};

// =================================== DELETE A BLOG ==============================================//

export const deleteBlogDELETE = async (req:Request, res: Response) => {
  try {
    const id = parameterIDProcessor(req);
    const blog = await prisma.blog.delete({
      where: {
        id: id
      }
    });

    if(blog) return res.status(200).json({message: `Blog ${id} was deleted`});
    else throw new Error;
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Could not delete blog!"});
  }
}

// =================================== CREATE A BLOG ==============================================//
export const createBlogPOST = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.userId; // get the currently logged in user
    const parsedTags = tagParser(tags);

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
          content,
          authorId: userId || ''
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

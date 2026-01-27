import { prisma } from "../config/prisma.js";
import { Request, Response } from "express";
import { Blog, BlogTitles, Subscriber } from "../generated/prisma/client.js";
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

// =================================== GET ALL PUBLISHED BLOGS ==============================================//

export const allPublishedBlogsGET = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {username: true, firstName:true, lastName: true},
        },
        comments: {
          select: {
            owner: {select: {username:true, firstName: true, lastName: true}},
            content: true, createdAt:true, 
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        tags: {
          select: {tag: true},
        },
        publish: true
      },
      omit: {
        authorId: true,
        updatedAt: true,
        publish: true
      },
      // Only get the published blogs
      where: {
        publish: {
          status: true
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not find blogs" });
  }
};

// =================================== GET ALL BLOGS (PUBLISHED/UNPUBLISHED) ==============================================//

export const allBlogsGET = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {username: true, firstName:true, lastName: true},
        },
        comments: {
          select: {
            owner: {select: {username:true, firstName: true, lastName: true}},
            content: true, createdAt:true, 
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        tags: {
          select: {tag: true},
        },
        publish: true
      },
      omit: {
        authorId: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
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
    const blog= await prisma.blog.findFirst({
      include: {
        author: {
          select: {username: true, firstName:true, lastName: true},
        },
        comments: {
          select: {
            owner: {select: { username:true, firstName: true, lastName: true}},
            id:true, content: true, createdAt:true, 
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        tags: {
          select: {tag: true}
        }
      },
      where: {
        id: id
      },
      omit: {
        authorId: true,
        updatedAt: true
      }
    });

    const formattedBlog = {
      ...blog,
      tags: blog?.tags.map(t=> ({
        id: t.tag.id,
        tag: t.tag.tag
      })) 
    }
    res.status(200).json(formattedBlog);

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

// =================================== PUBLISH/UNPUBLISH A BLOG ==============================================//
export const publishBlogPUT = async (req: Request, res: Response) => {
  try {
    const id = parameterIDProcessor(req);
    const {status} = req.query;

    if(status) {
      await prisma.publishBlog.update({
        data: {
          status: status==='true'? true: false 
        },
        where: {blogId: id}
      })
    }
    res.status(200).json({message: "Blog published!"});
  } catch(err){
    console.log(err);
    res.status(500).json({message: "Could not Publish blog, something went wrong"})
  }
}

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

      // publication status defaults to false
      await prismaTx.publishBlog.create({
        data: {
          blogId: blog.id
        }
      })

      return blog;
    });
    // when that's done return a 201 response
    res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Blog post failed!" });
  }
};


// ====================================== COMMENTS SECTION ==============================//

// Create comment
export const commentPOST = async (req: Request, res: Response) => {
  try{
    const id = parameterIDProcessor(req);
  const {content} = req.body;
  const comment = await prisma.comments.create({
    data: {
      blogId: id,
      userId: req.userId || '',
      content: content,
    }
  });
  return res.status(201).json({message: "Your comment was sent!"});
}catch(err){
  return res.status(500).json({message: "Your comment was not sent!"})
}
}

// Update comment
export const commentPUT = async (req: Request, res: Response) => {
  try{
    const id = parameterIDProcessor(req);
    const {commentId, content} = req.body;

    await prisma.comments.update({
      where: {id: commentId, blogId: id},
      data: {
        content: content
      }
    })
    res.status(200).json({message: "Comment updated!"});
  }catch(err){
    res.status(500).json({message: "Comment update failed!"})
  }
}
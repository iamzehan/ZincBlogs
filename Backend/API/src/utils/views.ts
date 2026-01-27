import { Client } from "pg";
import { env } from "../config/env.js";

const client = new Client({
  connectionString: env.DATABASE_URL
});

const createBlogTitleView = async () => {
  console.log("Conecting...");
  client.connect();
  console.log("Connected ✅");

  try {
    const SQL = `
    DROP VIEW IF EXISTS "BlogTitles";
    CREATE VIEW "BlogTitles" AS
    SELECT b.id, b.title, b."createdAt", p.status
    FROM "Blog" AS b
    LEFT JOIN "PublishBlog" as p
    ON p."blogId" = b.id
    WHERE p.status = true
    `;
    await client.query(SQL);
    console.log("BlogTitles view created!")
  } catch (err) {
    console.log(err);
  }

  client.end();
  console.log("Connection Closed! ❌");
};

createBlogTitleView();

import { Client } from "pg";
import { env } from "../config/env.js";
import console from "node:console";

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
    SELECT id, title, "createdAt"
    FROM "Blog"
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

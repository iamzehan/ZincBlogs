import router from "../src/routes/index.js";
import request from "supertest";
import express from "express";
import test from "node:test";

const app = express();

app.use(express.urlencoded({extended: false}));

app.use("/api", router);

test("Index route works", done=> {
  request(app)
  .get("/")
  .expect(200, done);
})
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { sessionMiddleware } from "./config/session.js";
import { env } from "./config/env.js";
import cookieParser from 'cookie-parser';
// cron jobs
//import './jobs/index.js';

const app = express();

// CORS setup
const allowedOrigins = [env.CLIENT_URL, env.CMS_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

app.use((helmet as unknown as typeof import('helmet').default)());
app.use(compression());
app.use(morgan("dev"));

// api routes
app.use("/api", routes);

app.use(errorHandler);

export default app;

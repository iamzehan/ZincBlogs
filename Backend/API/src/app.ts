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

const allowedOrigins = [
  env.CMS_URL,
  env.CLIENT_URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// CRITICAL for preflight (Vercel-safe)
app.options("*", cors());

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

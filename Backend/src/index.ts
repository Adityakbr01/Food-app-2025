import express from "express";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import { connectDB, gracefulShutdown } from "./db/DBConnection";
import { _config } from "./utills/Config";
import { logger } from "./utills/logger";
import userRouter from "./routes/users";

// Load environment variables
dotenv.config();

const app = express();

// Middleware Setup
app.use(compression());
app.use(cors({
  origin: ["http://localhost:5000", "http://localhost:3000"]
}));

app.use(express.json({ limit: "50kb", strict: true }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the FoodExpress API",
  });
})


app.use("/api/users", userRouter);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
async function main() {
  try {
    // Start the server
    app.listen(_config.port, () => {
      logger.info(`Server is running on port ${_config.port}`);
      connectDB();
    });
  } catch (error: unknown) {
    gracefulShutdown();
    if (error instanceof Error) {
      logger.error(`Server failed to start: ${error.message}`);
    } else {
      logger.error('Unknown error occurred while starting the server');
    }
    process.exit(1);
  }
}
main();

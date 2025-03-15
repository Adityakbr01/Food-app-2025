import express from "express";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB, gracefulShutdown } from "./db/DBConnection";
import { _config } from "./utills/Config";
import { logger } from "./utills/logger";

// Load environment variables
dotenv.config();

const app = express();

// Middleware Setup
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));







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

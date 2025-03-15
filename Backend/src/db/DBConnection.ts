import mongoose from 'mongoose';
  // Assuming _config contains environment variables like mongoURI
import { logger } from '../utills/logger';
import { _config } from '../utills/Config';


const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(_config.mongoURI);
    logger.info('MongoDB Connected successfully');
  } catch (error) {
    if (error instanceof Error) {
        logger.error(`MongoDB connection failed: ${error.message}`);
      } else {
        // If error is not an instance of Error, log a generic message
        logger.error('Unknown error occurred during MongoDB connection.');
      }
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};


const gracefulShutdown = () => {
  mongoose.connection.on('connected', () => {
    logger.info('Mongoose connection established');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`Mongoose connection error: ${err}`);
  });


  process.on('SIGINT', async () => {
    logger.info('Received SIGINT, closing MongoDB connection...');
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
    process.exit(0); // Exit the process
  });

  process.on('SIGTERM', async () => {
    logger.info('Received SIGTERM, closing MongoDB connection...');
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
    process.exit(0);
  });
};

export { connectDB, gracefulShutdown };

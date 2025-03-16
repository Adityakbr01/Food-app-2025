import type{ Response } from "express";


const sendErrorResponse = (res: Response, status: number, message: string) => {
   res.status(status).json({
    success: false,
    message,
  });
  return
};

export default sendErrorResponse
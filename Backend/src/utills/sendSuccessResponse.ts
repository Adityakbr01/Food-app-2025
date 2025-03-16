import type { Response } from "express";

const sendSuccessResponse = (res: Response, status: number, message: string, data: object = {}) => {
     res.status(status).json({
      success: true,
      message,
      data,
    });
    return
  };


  export default sendSuccessResponse
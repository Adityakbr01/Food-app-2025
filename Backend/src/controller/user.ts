import type { Request, Response } from "express";
import { User } from "../models/user";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { _config } from "../utills/Config";
import sendSuccessResponse from "../utills/sendSuccessResponse";
import sendErrorResponse from "../utills/sendErrorResponse";

const registerUser = async (req: Request, res: Response): Promise<void> => {

  const { name, email, password, phoneNumber } = req.body;
  try {

    const existingUser = await User.findOne({
      $or: [
        { email },
        { phoneNumber }
      ]
    }).lean();
    if (existingUser) {
      sendErrorResponse(res, 400, "User with this email or phone number already exists.");
      return
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      isActive: true
    });

    await newUser.save();

    sendSuccessResponse(res, 201, "User registered successfully", {
      user: {
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        isActive: newUser.isActive
      },
    });
    return
  } catch (error) {
    console.error("Error during user registration:", error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email }).select('+password').lean();

    if (!user) {
      sendErrorResponse(res, 400, "User not found");
      return
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      sendErrorResponse(res, 400, "Invalid credentials");
      return
    }
    const token = jwt.sign({ userId: user._id }, _config.jwt_Secret as string, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days rakhega ye
      sameSite: "strict"
    });

    return sendSuccessResponse(res, 200, "Login successful", { token, user: { id: user._id, email: user.email } })
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

export { registerUser, loginUser };

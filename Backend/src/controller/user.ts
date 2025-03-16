import type { Request, Response } from "express";
import { User } from "../models/user";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { _config } from "../utills/Config";

const registerUser = async (req: Request, res: Response): Promise<void> => {
 
  const { name, email, password, phoneNumber } = req.body;
  try {

    const existingUser = await User.findOne({ 
      $or:[
        {email},
        {phoneNumber}
      ]
     }).lean();
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User with this email or phone number already exists.",
      });
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

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        isActive: newUser.isActive

      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);

    // Send an error response
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Could not register the user.",
    });
  }
};

const loginUser = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body;

  try {
 
    const user = await User.findOne({ email }).select('+password').lean();

    if (!user) {
       res.status(400).json({ success: false, message: 'User not found' });
       return
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
       res.status(400).json({success: false, message: 'Invalid credentials' });
       return
    }
    const token = jwt.sign({ userId: user._id }, _config.jwt_Secret!, { expiresIn: '24h' });
    res.cookie('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 7*24 * 60 * 60 * 1000, // 7 days rakhega ye
    });


    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { registerUser, loginUser };

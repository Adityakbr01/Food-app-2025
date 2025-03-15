import type { Request, Response } from "express";
import { User } from "../models/user";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

const createUser = async (req: Request, res: Response): Promise<void> => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(400).json({
      success: false,
      errors: errors.array(),
    });
    return
  }

  const { name, email, password, phoneNumber } = req.body;

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(400).json({
        success: false,
        message: "User with this email already exists.",
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

export { createUser };

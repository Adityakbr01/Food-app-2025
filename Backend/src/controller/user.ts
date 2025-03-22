import type { Request, Response } from "express";
import { User, type IUser } from "../models/user";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { _config } from "../utills/Config";
import sendSuccessResponse from "../utills/sendSuccessResponse";
import sendErrorResponse from "../utills/sendErrorResponse";
import type { AuthRequest } from "../middleware/userAuthMiddleware";
import cloudinary from "../utills/cloudinary";
import { uploadImageToCloudinary } from "../utills/multerUpload";

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
    const token = jwt.sign({ userId: user._id,role:user.role }, _config.jwt_Secret as string, { expiresIn: '7d' });
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

const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      sendErrorResponse(res, 401, "Unauthorized");
      return;
    }
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      sendErrorResponse(res, 404, "User not found");
      return;
    }

    sendSuccessResponse(res, 200, "User profile fetched successfully", { user });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

const updateUserProfile = async (req: AuthRequest, res: Response):Promise<void>  => {
  try {
    const userId = req.userId;
    if (!userId) return sendErrorResponse(res, 401, "Unauthorized");

    const user = await User.findById(userId);
    if (!user) return sendErrorResponse(res, 404, "User not found");


    const { userName, phone, bio, address } = req.body;
    let profileImage = user.profileImage;

    if (req.file) {
      if (user.profileImage?.publicId) {
        await cloudinary.uploader.destroy(user.profileImage.publicId.toString());
      }

      const uploadedImage: any = await uploadImageToCloudinary(req.file.path);
      profileImage = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    }
    console.log(req.body.deliveryAddresses && "Ha hai")


    // if(!req.body.deliveryAddresses){
    //   sendErrorResponse(res,400,"mat bheje ji")
    // }

    const newAddresses = req.body.deliveryAddresses
    ? Array.isArray(req.body.deliveryAddresses)
      ? req.body.deliveryAddresses
      : [req.body.deliveryAddresses]
    : [];  // Agar deliveryAddresses `undefined` hai to empty array assign hoga
  
  // ✅ Append only if newAddresses is not empty
  const updatedAddresses = req.body.deliveryAddresses
    ? [...(user.deliveryAddresses || []), ...newAddresses]
    : user.deliveryAddresses;
  

    // ✅ Ensure phone number is unique
    const isPhoneNumberTaken = await User.findOne({ phoneNumber: phone }).lean();
    if (isPhoneNumberTaken && isPhoneNumberTaken._id.toString() !== userId.toString()) {
      return sendErrorResponse(res, 400, "Phone number already exists");
    }

    // ✅ Update User
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        name: req.body.username ?? user.name,
        phoneNumber: req.body.phone ?? user.phoneNumber,
        bio: req.body.bio ?? user.bio,
        address: req.body.address ?? user.address,
        profileImage,
        deliveryAddresses: updatedAddresses, // ✅ Now addresses will be appended instead of overwritten
      },
      { new: true }
    );

    return sendSuccessResponse(res, 200, "User profile updated successfully", { user: updatedUser });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};

const logOutUser = async (req: AuthRequest, res: Response): Promise<void> => {
  console.log("ha hu g")
  try {
    if (!req.userId) return sendErrorResponse(res, 401, "Unauthorized");
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // Ensure it's secure
      sameSite: "strict", // Prevent CSRF attacks
    });

    return sendSuccessResponse(res, 200, "Logged out successfully");
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};


const DeleteDeliveryAddress = async (req: AuthRequest, res: Response):Promise<void>  => {
  try {
    const userId = req.userId;
    const { addressId } = req.params; 

    console.log(addressId)
    if (!userId) {
      return sendErrorResponse(res, 401, "Unauthorized");
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, "User not found!");
    }

    if (!user.deliveryAddresses || user.deliveryAddresses.length === 0) {
      return sendErrorResponse(res,400,"No delivery addresses found")
       
    }

    const initialLength = user.deliveryAddresses.length;

    user.deliveryAddresses = user.deliveryAddresses.filter(
      (address) => address._id.toString() !== addressId
    );

    if (user.deliveryAddresses.length === initialLength) {
       
       return sendErrorResponse(res,404,"Address not found!")
    }

    // ✅ Save the updated user document
    await user.save();

   return sendSuccessResponse(res,200,"Delivery address deleted successfully",{
      deliveryAddresses: user.deliveryAddresses,
    })
    
  } catch (error) {
    console.error(error);
    sendErrorResponse(res,500,"Internal Server Error")
  }
};

export { registerUser, loginUser,getUserProfile,updateUserProfile,DeleteDeliveryAddress ,logOutUser};

import { Router } from "express";
import { registerUser,loginUser, getUserProfile, updateUserProfile } from "../controller/user";
import { loginValidator, registerValidator, updateUserValidator, validate } from "../utills/Express-Validator";
import { authenticateUser } from "../middleware/userAuthMiddleware";
import upload from "../utills/multerUpload";

const userRouter = Router();
userRouter.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "User route working hai G"
    });
})

userRouter.post("/register",registerValidator,validate,registerUser)
userRouter.post("/login",loginValidator,validate,loginUser)
userRouter.get("/profile",authenticateUser,getUserProfile)
userRouter.put("/profile",updateUserValidator,validate,authenticateUser,upload.single("profileImage"),updateUserProfile)
export default userRouter
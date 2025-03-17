import { Router } from "express";
import { registerUser,loginUser, getUserProfile } from "../controller/user";
import { loginValidator, registerValidator, validate } from "../utills/Express-Validator";
import { authenticateUser } from "../middleware/userAuthMiddleware";

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
export default userRouter
import { Router } from "express";
import { registerUser,loginUser } from "../controller/user";
import { loginValidator, registerValidator, validate } from "../utills/Express-Validator";

const userRouter = Router();

userRouter.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "User route working hai G"
    });
})

userRouter.post("/register",registerValidator,validate,registerUser)
userRouter.post("/login",loginValidator,validate,loginUser)
export default userRouter
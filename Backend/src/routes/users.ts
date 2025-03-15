import { Router } from "express";
import { createUser } from "../controller/user";
import { registerValidator, validate } from "../utills/Express-Validator";

const userRouter = Router();

userRouter.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "User route working hai G"
    });
})

userRouter.post("/register",registerValidator,validate,createUser)
export default userRouter
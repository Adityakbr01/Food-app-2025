import { Router, type Request, type Response, type NextFunction } from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, DeleteDeliveryAddress } from "../controller/user";
import { loginValidator, registerValidator, updateUserValidator, validate } from "../utills/Express-Validator";
import { authenticateUser } from "../middleware/userAuthMiddleware";
import upload from "../utills/multerUpload";

const userRouter = Router();

userRouter.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "User route working hai G"
    });
});

userRouter.post("/register", registerValidator, validate, registerUser);
userRouter.post("/login", loginValidator, validate, loginUser);
userRouter.get("/profile", authenticateUser, getUserProfile);

userRouter.delete("/profile/delivery-address/:addressId",authenticateUser,DeleteDeliveryAddress)

userRouter.put(
    "/profile",
    authenticateUser, // ✅ Pehle authentication
    upload.single("profileImage"), // ✅ Pehle file handle hone do
    (req: Request, res: Response, next: NextFunction): void => {

        if (req.body.address) {
            try {
                req.body.address = JSON.parse(req.body.address);
            } catch (error) {
                 res.status(400).json({ error: "Invalid address format" });
                 return
            }
        }
        if (req.body.deliveryAddresses) {
            try {
                req.body.deliveryAddresses = JSON.parse(req.body.deliveryAddresses);
            } catch (error) {
                 res.status(400).json({ error: "Invalid deliveryAddresses format" });
                 return
            }
        }
        next();
    },
    updateUserValidator, // ✅ Ab validation sahi se chalega
    validate,
    updateUserProfile
);


export default userRouter;

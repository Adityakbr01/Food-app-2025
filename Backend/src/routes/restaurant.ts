import express from "express";
import { createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant } from "../controller/restaurants";
import { createRestaurantValidator, validate } from "../utills/Express-Validator";
import { authenticateUser } from "../middleware/userAuthMiddleware";

const RestaurantRouter = express.Router();                  

RestaurantRouter.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Restaurant route working hai G"
    });
})

RestaurantRouter.post("/create",createRestaurantValidator,validate,authenticateUser,createRestaurant)
RestaurantRouter.get("/all",getAllRestaurants)
RestaurantRouter.get("/:restaurantId",getRestaurantById)
RestaurantRouter.put("/:restaurantId",authenticateUser,updateRestaurant).delete("/:restaurantId",authenticateUser,deleteRestaurant)



export default RestaurantRouter
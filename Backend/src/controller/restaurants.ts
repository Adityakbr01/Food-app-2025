import type { Request, Response } from 'express';
import Restaurant from "../models/restaurant.Model";
import sendErrorResponse from '../utills/sendErrorResponse';
import sendSuccessResponse from '../utills/sendSuccessResponse';
import type { AuthRequest } from '../middleware/userAuthMiddleware';

// @desc    Create a new restaurant
// @route   POST /api/restaurants
// @access  Private (Admin only)
export const createRestaurant = async (req: AuthRequest, res: Response):Promise<void> => {
    try {
        const {
            name,
            address,
            city,
            state,
            zipCode,
            phoneNumber,
            description,
            image,
        } = req.body;

        const role = req.role;
    
        if (!req.userId) {
            sendErrorResponse(res, 401, "Unauthorized");
            return;
          }

          console.log(role)
        // Check if user is admin (optional, if needed)
        if (role !== 'admin' && role !== 'restaurant_owner') {
            sendErrorResponse(res, 403, 'Admin or restaurant owner access required');
            return;
        }

        const existingRestaurant = await Restaurant.findOne({ name, address });
        if (existingRestaurant) {
            return sendErrorResponse(res, 400, "Restaurant with this name and address already exists");
        }

        // Create new restaurant
        const restaurant = new Restaurant({
            name,
            address,
            city,
            state,
            zipCode,
            phoneNumber,
            description,
            image,
            createdBy: req.userId
        });

        await restaurant.save();

        sendSuccessResponse(res, 201, 'Restaurant created successfully', restaurant)
    } catch (error: any) {
        console.error('Error in createRestaurant:', error);
        sendErrorResponse(res, 400, "Error creating restaurant");
    }
};

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
export const getAllRestaurants = async (req: Request, res: Response):Promise<void> => {
    try {
        const restaurants = await Restaurant.find({ isDeleted: false, isBlocked: false })
            .select('-reviews -menu'); // Exclude heavy fields for listing

        if (!restaurants.length) {
            return sendErrorResponse(res, 404, "No restaurants found");
        }

        return sendSuccessResponse(res, 200, "Restaurants fetched successfully", restaurants)
    } catch (error: any) {
      console.log("Error in getAllRestaurants:", error);
        return sendErrorResponse(res, 500, "Error fetching restaurants");
    }
};

// @desc    Get single restaurant by ID
// @route   GET /api/restaurants/:restaurantId
// @access  Public
export const getRestaurantById = async (req: Request, res: Response) => {
    try {
        const { restaurantId } = req.params;

        const restaurant = await Restaurant.findOne({
            _id: restaurantId,
            isDeleted: false,
            isBlocked: false,
        }).populate('reviews menu'); // Populate reviews and menu if needed

        if (!restaurant) {
            return sendErrorResponse(res, 404, "Restaurant not found");
        }

        sendSuccessResponse(res, 200, "Restaurant fetched successfully", restaurant)
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching restaurant',
            error: error.message,
        });
    }
};

// @desc    Update a restaurant
// @route   PUT /api/restaurants/:restaurantId
// @access  Private (Restaurant owner only)
export const updateRestaurant = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { restaurantId } = req.params;
        const updateData = req.body;
        const userId = req.userId; // From authenticateUser middleware

        if (!userId) {
            sendErrorResponse(res, 401, 'User not authenticated');
            return;
        }
        // Find the restaurant and check ownership
        const restaurant = await Restaurant.findOne({
            _id: restaurantId,
            isDeleted: false,
            createdBy: userId, // Ensure only the creator can update
        });

        if (!restaurant) {
            sendErrorResponse(res, 403, 'Restaurant not found or you are not authorized to update it');
            return;
        }

        // Update the restaurant
        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            { _id: restaurantId, isDeleted: false, createdBy: userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        sendSuccessResponse(res, 200, 'Restaurant updated successfully');
    } catch (error: any) {
        console.error('Error in updateRestaurant:', error);
        sendErrorResponse(res, 400, 'Error updating restaurant');
    }
};

// @desc    Delete a restaurant (soft delete)
// @route   DELETE /api/restaurants/:restaurantId
// @access  Private (Admin or Restaurant Owner only)
export const deleteRestaurant = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { restaurantId } = req.params;
        const userId = req.userId; // From authenticateUser middleware
        const role = req.role;

        if (!userId) {
            sendErrorResponse(res, 401, 'User not authenticated');
            return;
        }

        // Check if user is neither admin nor restaurant_owner
        if (role !== 'admin' && role !== 'restaurant_owner') {
            sendErrorResponse(res, 403, 'Admin or restaurant owner access required');
            return;
        }

        // Find the restaurant
        const restaurant = await Restaurant.findOne({
            _id: restaurantId,
            isDeleted: false,
        });

        if (!restaurant) {
            sendErrorResponse(res, 404, 'Restaurant not found');
            return;
        }

        // If user is restaurant_owner, check ownership
        if (role === 'restaurant_owner' && restaurant.createdBy.toString() !== userId) {
            sendErrorResponse(res, 403, 'You are not authorized to delete this restaurant');
            return;
        }

        // Soft delete the restaurant
        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            { _id: restaurantId, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: new Date() } },
            { new: true }
        );

        sendSuccessResponse(res, 200, 'Restaurant deleted successfully');
    } catch (error: any) {
        console.error('Error in deleteRestaurant:', error);
        sendErrorResponse(res, 500, 'Error deleting restaurant');
    }
};
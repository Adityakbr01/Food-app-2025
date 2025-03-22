import type{ Request, Response } from 'express';
import Menu from '../models/menu.Model';
import type{ AuthRequest } from '../middleware/userAuthMiddleware';
import sendSuccessResponse from '../utills/sendSuccessResponse';
import sendErrorResponse from '../utills/sendErrorResponse';
import restaurantModel from '../models/restaurant.Model';

// @desc    Create a new menu item
// @route   POST /api/menu
// @access  Private (Admin only)
export const createMenuItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { name, price, category, isVeg, description, image } = req.body;
        const userId = req.userId; 

        if (!userId) {
            sendErrorResponse(res, 401, 'User not authenticated');
            return;     
        }

        if (req.role !== 'admin' && req.role !== 'restaurant_owner') {
            sendErrorResponse(res, 403, 'Admin or restaurant owner access required');
            return;
        }
        const isRestourantOwner = await restaurantModel.findOne({ createdBy: userId });

        
        if (!isRestourantOwner) {
            sendErrorResponse(res, 403, 'Only restaurant owners can create menu items');
            return;
        }
       
        const isBlocked = isRestourantOwner.isBlocked || isRestourantOwner.isDeleted;
        if (isBlocked) {
            sendErrorResponse(res, 403, 'Your restaurant is blocked please contact to admin');
            return;
        }

     const isMenuItemExist = await  Menu.findOne({
        restaurantId: isRestourantOwner._id,
        name
      })

      if (isMenuItemExist) {
        sendErrorResponse(res, 400, 'Menu item already exists for this restaurant');
        return;
      }

        const menuItem = new Menu({
            restaurantId: isRestourantOwner._id,
            name,
            price,
            category,
            isVeg,
            description,
            image,
        });

        await menuItem.save();

        sendSuccessResponse(res, 201, 'Menu item created successfully', menuItem);
    } catch (error: any) {
        console.error('Error in createMenuItem:', error);
        sendErrorResponse(res, 400, 'Error creating menu item');
    }
};

// @desc    Get all menu items for a restaurant
// @route   GET /api/menu/restaurant/:restaurantId
// @access  Public
export const getMenuByRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantId } = req.params;

        const menuItems = await Menu.find({ restaurantId });

        if (!menuItems.length) {
            sendErrorResponse(res, 404, 'No menu items found for this restaurant');
            return;
        }

        sendSuccessResponse(res, 200, 'Menu items fetched successfully', menuItems);
    } catch (error: any) {
        console.error('Error in getMenuByRestaurant:', error);
        sendErrorResponse(res, 500, 'Error fetching menu items');
    }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:menuId
// @access  Private (Admin or Restaurant Owner)
export const updateMenuItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { menuId } = req.params;
        const updateData = req.body;
        const userId = req.userId;

        if (!userId) {
            sendErrorResponse(res, 401, 'User not authenticated');
            return;
        }

        // Check if user is admin or restaurant_owner
        if (req.role !== 'admin' && req.role !== 'restaurant_owner') {
            sendErrorResponse(res, 403, 'Admin or restaurant owner access required');
            return;
        }

        // Find the menu item first
        const menuItem = await Menu.findById(menuId);
        if (!menuItem) {
            sendErrorResponse(res, 404, 'Menu item not found');
            return;
        }

        // Authorization logic
        if (req.role === 'restaurant_owner') {
            // Verify that the restaurant belongs to the user and is not blocked/deleted
            const restaurant = await restaurantModel.findOne({
                _id: menuItem.restaurantId,
                createdBy: userId,
                isDeleted: false,
                isBlocked: false,
            });

            if (!restaurant) {
                sendErrorResponse(res, 403, 'You are not authorized to update this menu item or restaurant is blocked/deleted');
                return;
            }
        }
        // Admin can update any menu item, no additional checks needed

        // Update the menu item with explicit restaurantId check
        const updatedMenuItem = await Menu.findOneAndUpdate(
            { _id: menuId, restaurantId: menuItem.restaurantId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedMenuItem) {
            sendErrorResponse(res, 404, 'Menu item not found');
            return;
        }

        sendSuccessResponse(res, 200, 'Menu item updated successfully', updatedMenuItem);
    } catch (error: any) {
        console.error('Error in updateMenuItem:', error);
        sendErrorResponse(res, 400, 'Error updating menu item');
    }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:menuId
// @access  Private (Admin or Restaurant Owner)
export const deleteMenuItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { menuId } = req.params;
        const userId = req.userId;

        if (!userId) {
            sendErrorResponse(res, 401, 'User not authenticated');
            return;
        }

        // Check if user is admin or restaurant_owner
        if (req.role !== 'admin' && req.role !== 'restaurant_owner') {
            sendErrorResponse(res, 403, 'Admin or restaurant owner access required');
            return;
        }

        // Find the menu item
        const menuItem = await Menu.findById(menuId);
        if (!menuItem) {
            sendErrorResponse(res, 404, 'Menu item not found');
            return;
        }

        // Authorization logic
        if (req.role === 'restaurant_owner') {
            // Verify that the restaurant belongs to the user and is not blocked/deleted
            const restaurant = await restaurantModel.findOne({
                _id: menuItem.restaurantId,
                createdBy: userId,
                isDeleted: false,
                isBlocked: false,
            });

            if (!restaurant) {
                sendErrorResponse(res, 403, 'You are not authorized to delete this menu item or restaurant is blocked/deleted');
                return;
            }
        }
        // Admin can delete any menu item, no additional checks needed

        // Delete the menu item
        const deletedMenuItem = await Menu.findOneAndDelete({
            _id: menuId,
            restaurantId: menuItem.restaurantId,
        });

        if (!deletedMenuItem) {
            sendErrorResponse(res, 404, 'Menu item not found');
            return;
        }

        sendSuccessResponse(res, 200, 'Menu item deleted successfully');
    } catch (error: any) {
        console.error('Error in deleteMenuItem:', error);
        sendErrorResponse(res, 500, 'Error deleting menu item');
    }
};
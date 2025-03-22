import type{ Request, Response } from 'express';
import Menu from '../models/menu.Model';
import type{ AuthRequest } from '../middleware/userAuthMiddleware';
import sendSuccessResponse from '../utills/sendSuccessResponse';
import sendErrorResponse from '../utills/sendErrorResponse';

// @desc    Create a new menu item
// @route   POST /api/menu
// @access  Private (Admin only)
export const createMenuItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { restaurantId, name, price, category, isVeg, description, image } = req.body;

        if (req.role !== 'admin') {
            sendErrorResponse(res, 403, 'Admin access required');
            return;
        }

        const menuItem = new Menu({
            restaurantId,
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
// @access  Private (Admin only)
export const updateMenuItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { menuId } = req.params;
        const updateData = req.body;

        if (req.role !== 'admin') {
            sendErrorResponse(res, 403, 'Admin access required');
            return;
        }

        const menuItem = await Menu.findByIdAndUpdate(
            menuId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!menuItem) {
            sendErrorResponse(res, 404, 'Menu item not found');
            return;
        }

        sendSuccessResponse(res, 200, 'Menu item updated successfully', menuItem);
    } catch (error: any) {
        console.error('Error in updateMenuItem:', error);
        sendErrorResponse(res, 400, 'Error updating menu item');
    }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:menuId
// @access  Private (Admin only)
export const deleteMenuItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { menuId } = req.params;

        if (req.role !== 'admin') {
            sendErrorResponse(res, 403, 'Admin access required');
            return;
        }

        const menuItem = await Menu.findByIdAndDelete(menuId);

        if (!menuItem) {
            sendErrorResponse(res, 404, 'Menu item not found');
            return;
        }

        sendSuccessResponse(res, 200, 'Menu item deleted successfully');
    } catch (error: any) {
        console.error('Error in deleteMenuItem:', error);
        sendErrorResponse(res, 500, 'Error deleting menu item');
    }
};
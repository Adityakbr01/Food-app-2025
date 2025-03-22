import express from 'express';
import {
    createMenuItem,
    getMenuByRestaurant,
    updateMenuItem,
    deleteMenuItem,
} from '../controller/menuController';
import { authenticateUser } from '../middleware/userAuthMiddleware';
import { createMenuValidator, validate } from '../utills/Express-Validator';

const MenuRouter = express.Router();

MenuRouter.post('/',createMenuValidator,validate, authenticateUser, createMenuItem);
MenuRouter.get('/restaurant/:restaurantId', getMenuByRestaurant);
MenuRouter.put('/:menuId', authenticateUser, updateMenuItem);
MenuRouter.delete('/:menuId', authenticateUser, deleteMenuItem);

export default MenuRouter;
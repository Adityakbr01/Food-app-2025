import express from 'express';
import {
    createMenuItem,
    getMenuByRestaurant,
    updateMenuItem,
    deleteMenuItem,
} from '../controller/menuController';
import { authenticateUser } from '../middleware/userAuthMiddleware';

const MenuRouter = express.Router();

MenuRouter.post('/', authenticateUser, createMenuItem);
MenuRouter.get('/restaurant/:restaurantId', getMenuByRestaurant);
MenuRouter.put('/:menuId', authenticateUser, updateMenuItem);
MenuRouter.delete('/:menuId', authenticateUser, deleteMenuItem);

export default MenuRouter;
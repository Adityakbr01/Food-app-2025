import express from 'express';
import {
    createReview,
    getReviewsByRestaurant,
    updateReview,
    deleteReview,
} from '../controller/reviewController';
import { authenticateUser } from '../middleware/userAuthMiddleware';

const ReviewRouter = express.Router();

ReviewRouter.post('/', authenticateUser, createReview);
ReviewRouter.get('/restaurant/:restaurantId', getReviewsByRestaurant);
ReviewRouter.put('/:reviewId', authenticateUser, updateReview);
ReviewRouter.delete('/:reviewId', authenticateUser, deleteReview);

export default ReviewRouter;
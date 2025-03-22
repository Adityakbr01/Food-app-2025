import type{ Request, Response } from 'express';
import Review  from '../models/review.Model';
import type { AuthRequest } from '../middleware/userAuthMiddleware';
import sendSuccessResponse from '../utills/sendSuccessResponse';
import sendErrorResponse from '../utills/sendErrorResponse';

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private (Authenticated users)
export const createReview = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { restaurantId, rating, comment } = req.body;
        const userId = req.userId; // From authenticateUser middleware

        if (!userId) {
            sendErrorResponse(res, 401, 'User not authenticated');
            return;
        }

        const review = new Review({
            userId,
            restaurantId,
            rating,
            comment,
        });

        await review.save();

        sendSuccessResponse(res, 201, 'Review created successfully', review);
    } catch (error: any) {
        console.error('Error in createReview:', error);
        sendErrorResponse(res, 400, 'Error creating review');
    }
};

// @desc    Get all reviews for a restaurant
// @route   GET /api/reviews/restaurant/:restaurantId
// @access  Public
export const getReviewsByRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantId } = req.params;

        const reviews = await Review.find({ restaurantId }).populate('userId', 'name email');

        if (!reviews.length) {
            sendErrorResponse(res, 404, 'No reviews found for this restaurant');
            return;
        }

        sendSuccessResponse(res, 200, 'Reviews fetched successfully', reviews);
    } catch (error: any) {
        console.error('Error in getReviewsByRestaurant:', error);
        sendErrorResponse(res, 500, 'Error fetching reviews');
    }
};

// @desc    Update a review
// @route   PUT /api/reviews/:reviewId
// @access  Private (Review owner only)
export const updateReview = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.userId;

        const review = await Review.findOne({ _id: reviewId, userId });

        if (!review) {
            sendErrorResponse(res, 404, 'Review not found or you are not authorized to update it');
            return;
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        await review.save();

        sendSuccessResponse(res, 200, 'Review updated successfully', review);
    } catch (error: any) {
        console.error('Error in updateReview:', error);
        sendErrorResponse(res, 400, 'Error updating review');
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:reviewId
// @access  Private (Review owner or Admin)
export const deleteReview = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { reviewId } = req.params;
        const userId = req.userId;
        const role = req.role;

        const review = await Review.findById(reviewId);

        if (!review) {
            sendErrorResponse(res, 404, 'Review not found');
            return;
        }

        if (review.userId.toString() !== userId && role !== 'admin') {
            sendErrorResponse(res, 403, 'Not authorized to delete this review');
            return;
        }

        await review.deleteOne();

        sendSuccessResponse(res, 200, 'Review deleted successfully');
    } catch (error: any) {
        console.error('Error in deleteReview:', error);
        sendErrorResponse(res, 500, 'Error deleting review');
    }
};
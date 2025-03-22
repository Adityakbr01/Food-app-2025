import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IReview extends Document {
    userId: Types.ObjectId;
    restaurantId: Types.ObjectId;
    rating: number;
    comment?: string;
    createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: [true, 'User ID is required'],
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'Restaurant ID is required'],
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IReview>('Review', reviewSchema);
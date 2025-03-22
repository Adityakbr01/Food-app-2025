import mongoose, { Document, Schema, Types } from 'mongoose';

// Define the Restaurant Interface
export interface IRestaurant extends Document {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    description: string;
    image?: string; // Optional
    rating: number;
    reviews: Types.ObjectId[];
    menu: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    deletedAt: Date | null;
    isVerified: boolean;
    verifiedAt: Date | null;
    verifiedBy: Types.ObjectId | null;
    verifiedReason: string | null;
    isBlocked: boolean;
    blockedAt: Date | null;
    blockedBy: Types.ObjectId | null;
    blockedReason: string | null;
    createdBy: Types.ObjectId;
}

// Define the Restaurant Schema
const restaurantSchema = new Schema<IRestaurant>({
    name: {
        type: String,
        required: [true, 'Restaurant name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
    },
    zipCode: {
        type: String,
        required: [true, 'Zip code is required'],
        match: [/^\d{5,6}$/, 'Please provide a valid zip code'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long'],
    },
    image: {
        type: String,
        required: false,
        default: 'https://example.com/default-restaurant.jpg',
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5'],
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    menu: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifiedAt: {
        type: Date,
        default: null,
    },
    verifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    verifiedReason: {
        type: String,
        default: null,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    blockedAt: {
        type: Date,
        default: null,
    },
    blockedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    blockedReason: {
        type: String,
        default: null,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

restaurantSchema.pre('save', function (this: IRestaurant) {
    this.updatedAt = new Date();
});

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMenu extends Document {
    restaurantId: Types.ObjectId;
    name: string;
    price: number;
    category: string;
    isVeg: boolean;
    description?: string;
    image?: string;
    isAvailable: boolean;
}

const menuSchema = new Schema<IMenu>({
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'Restaurant ID is required'],
    },
    name: {
        type: String,
        required: [true, 'Menu item name is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
    isVeg: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        default: 'https://example.com/default-menu.jpg',
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model<IMenu>('Menu', menuSchema);
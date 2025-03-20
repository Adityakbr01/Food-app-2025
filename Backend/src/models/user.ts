import mongoose, { Document } from "mongoose";


interface DeliveryAddress {
    _id:mongoose.ObjectId
    street: string;
    city: string;
    state: string;
    zipCode: string;
    location: "Home" | "Office" | "Work" | "Friend's Place" | "Other"; // Enum type
    customLocation?: string; // Optional custom location
}

// Define the user interface
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        location:string
    };
    emailVerified?: boolean;
    passwordResetToken?: string;
    passwordResetTokenExpiry?: Date;
    orders: mongoose.Types.ObjectId[]; // Array of Order references
    favourites: mongoose.Types.ObjectId[];
    paymentMethods: string[]; // Array of payment method identifiers (can be linked to another model for more detail)
    deliveryAddresses?: DeliveryAddress[];
    preferredPaymentMethod: string;
    ratings: [{ restaurant: mongoose.Types.ObjectId; rating: number; comment: string }];
    profileImage?: {
        url: { type: string },
        publicId: { type: string },
    },
    role: 'customer' | 'admin' | 'restaurant_owner' | 'delivery_boy';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    bio?: string;
}


const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phoneNumber: { type: String },
    address: {
        location:{type: String},
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
    },
    emailVerified: { type: Boolean, default: false },
    passwordResetToken: { type: String },
    passwordResetTokenExpiry: { type: Date },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // Array of Order references
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }], // Array of Restaurant references
    paymentMethods: [{ type: String }], // Array of payment method identifiers
    deliveryAddresses: [{
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        location: { 
            type: String, 
            enum: ["Home", "Office", "Work", "Friend's Place", "Other"], 
            default: "Home" 
        }
    }]
,    
    preferredPaymentMethod: { type: String },
    ratings: [{ restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }, rating: { type: Number }, comment: { type: String } }],
    profileImage: {
        url: { type: String },
        publicId: { type: String },

    },
    role: { type: String, enum: ['customer', 'admin', 'restaurant_owner', 'delivery_boy'], default: 'customer' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    bio: { type: String, default: "Passionate about food and adventure, always exploring new flavors and culinary experiences." },
});


userSchema.index({ phoneNumber: 1 }, { unique: true });
userSchema.index({ role: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
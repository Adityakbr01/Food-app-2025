export const _config={
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/FoodAppBackend",
    jwt_Secret:process.env.JWT_SECRET,
    jwt_ExpirationTime : process.env.JWT_EXPIRATION_TIME || '24h',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    Cloudinary_API_SECRET: process.env.Cloudinary_API_SECRET
}
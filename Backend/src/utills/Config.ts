export const _config={
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/FoodAppBackend",
    jwt_Secret:process.env.JWT_SECRET
}
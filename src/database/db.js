import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/courseraDB`)
        console.log("Database connected");
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
        process.exit(1);
    }
}

export { connectDB };
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        require: true,
        unique: true
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
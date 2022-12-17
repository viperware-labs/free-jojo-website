import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    wallet: { type: String, required: true },
    twitterUsername: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.userModel || mongoose.model("userModel", userSchema);
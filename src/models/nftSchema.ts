import mongoose from "mongoose";

const nftSchema = new mongoose.Schema({
    id: { type: Number, required: true , default: 0},
    revealed: { type: Boolean, required: true , default: false},
});

export default mongoose.models.nftModel || mongoose.model("nftModel", nftSchema);
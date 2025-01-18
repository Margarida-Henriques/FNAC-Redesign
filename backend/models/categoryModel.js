import mongoose from "mongoose";
const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

    },
    { timestamps: true }
)

export const Category = mongoose.model('Category', categorySchema);
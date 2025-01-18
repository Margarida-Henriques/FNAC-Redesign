import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
)

export const Product = mongoose.model('Product', productSchema);
import mongoose from "mongoose";

const productTypeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        filters: [{
            name: String,         // "ram"
            displayName: String,  // "RAM"
            type: String,        // "select" or "range"
            options: [String],   // ["4GB", "8GB", "16GB"]
            min: Number,        // for range filters
            max: Number         // for range filters
        }]
    },
    { timestamps: true }
)

export const ProductType = mongoose.model('ProductType', productTypeSchema);
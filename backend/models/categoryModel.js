import mongoose from "mongoose";
const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        subcategories: [{
            name: {
                type: String,
                required: true,
                trim: true,
            },
            filters: [{
                name: String,
                displayName: String,
                options: [String],
            }]
        }]

    },
    { timestamps: true }
)

export const Category = mongoose.model('Category', categorySchema);
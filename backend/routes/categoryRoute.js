import express from 'express';
import { Category } from "../models/categoryModel.js";

const router = express.Router();

//GET CATEGORIES
router.get('/', async (request, response) => {
    try {
        const categories = await Category.find({});

        return response.status(200).json(categories)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;

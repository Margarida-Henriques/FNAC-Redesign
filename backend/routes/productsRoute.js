import express from 'express';
import { Product } from "../models/productModel.js";

const router = express.Router();

//GET PRODUCTS
router.get('/', async (request, response) => {
    try {
        const { subcategory } = request.query;
        let query = {};

        if (subcategory) {
            query.type = subcategory;
        }

        const products = await Product.find(query);
        return response.status(200).json(products);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//GET PRODUCT
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const product = await Product.findById(id);

        return response.status(200).json(product)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



export default router;
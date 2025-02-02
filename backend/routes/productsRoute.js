import express from 'express';
import { Product } from "../models/productModel.js";

const router = express.Router();

//POST PRODUCT
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.price ||
            !request.body.category
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, price, category'
            })
        };

        const newProduct = {
            name: request.body.name,
            price: request.body.price,
            category: request.body.category,
        };

        const product = await Product.create(newProduct);
        return response.status(201).send(product);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// //GET PRODUCTS
// router.get('/', async (request, response) => {
//     try {
//         const products = await Product.find({});
//         console.log(products);
//         return response.status(200).json(products);


//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

//GET PRODUCTS
router.get('/', async (request, response) => {
    try {
        const { subcategory } = request.query;
        let query = {};

        if (subcategory) {
            query.type = subcategory; // Filter by subcategory if provided
        }
        const products = await Product.find(query); // If query is empty, fetch all products
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

//PUT PRODUCT
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.price ||
            !request.body.category
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, price, category'
            })
        };

        const { id } = request.params;

        const result = await Product.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Product not found' });
        } else {
            return response.status(200).send({ message: 'Product updated successfully' });
        }

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//DELETE PRODUCT
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Product.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Product not found' });
        } else {
            return response.status(200).send({ message: 'Product deleted successfully' });
        }

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

export default router;
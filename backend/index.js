import express, { request, response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Product } from "./models/productModel.js";


const app = express();

app.use(express.json())

app.get('/', (request, response) => {
    // console.log(request);
    return response.status(234).send('Get response')
});


//POST PRODUCT
app.post('/products', async (request, response) => {
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

//GET PRODUCTS
app.get('/products', async (request, response) => {
    try {
        const products = await Product.find({});

        return response.status(200).json(products)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//GET PRODUCT
app.get('/products/:id', async (request, response) => {
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
app.put('/products/:id', async (request, response) => {
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
app.delete('/products/:id', async (request, response) => {
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





mongoose
    .connect(mongoDBURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        })
        console.log('App connected to database');
    })
    .catch((error) => {
        console.log(error);
    })
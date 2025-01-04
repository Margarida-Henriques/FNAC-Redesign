import express, { request, response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import productsRoute from './routes/productsRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json())

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (request, response) => {
    return response.status(234).send('Get response')
});

app.use('/products', productsRoute);


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
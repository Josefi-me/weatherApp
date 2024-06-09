import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import config from '../config.js';
//import axios from 'axios';
import weatherRoutes from './routes/weatherRoutes.js';

//const express = require ("express");
const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/weather', weatherRoutes);


const PORT = config.mongoUri.port || 5173;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
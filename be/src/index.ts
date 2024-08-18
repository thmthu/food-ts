import 'reflect-metadata'; // Ensure this is at the top
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import apiRoutes from './routes/api';
import manageRoutes from './routes/manage';
import configViewEngine from './config/viewEngine';

import { initializeDataSource } from './middleware/initializeDataSource';

config();
const app: Application = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

// Middleware to ensure DataSource is initialized
app.use(initializeDataSource);

// Register routes
app.use('/api', apiRoutes);
app.use('/manage', manageRoutes);

// Start the server
const port = process.env.MANAGE_PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'reflect-metadata';

import webRoutes from './routes/web';
import configViewEngine from './config/viewEngine';

const app: Application = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

// Routes
app.use('/', webRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

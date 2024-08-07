import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'reflect-metadata';
import apiRoutes from './routes/api'
import manageRoutes from './routes/manage'
import configViewEngine from './config/viewEngine';
import { config } from 'dotenv';


config();
const app: Application = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

// Routes
app.use('/api', apiRoutes);
app.use('/manage', manageRoutes);
// Start server

const port = process.env.MANAGE_PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

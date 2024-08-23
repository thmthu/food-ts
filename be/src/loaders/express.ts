import 'reflect-metadata'; // Ensure this is at the top
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import configViewEngine from '../config/viewEngine';
import Container from 'typedi';
import { DataSource } from 'typeorm';
import apiRoutes from '../routes/api';
import manageRoutes from '../routes/manage'
export default ({ app }: { app: express.Application }) => {
    console.log("loader 1")
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    config()
    configViewEngine(app);
    console.log(Container.has(DataSource));

    app.use('/api', apiRoutes());
    app.use('/manage', manageRoutes());

    console.log("express loaded!!!!")
}

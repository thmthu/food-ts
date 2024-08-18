import { AppDataSourceSingleton } from '../class-models/AppDataSourceSingleton';
import { Container } from 'typedi';
import { DataSource } from 'typeorm';
import { Response, Request, NextFunction } from 'express';

export async function initializeDataSource(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('Middleware Start: Checking DataSource');
        if (!Container.has(DataSource)) {
            console.log('DataSource not found in Container, initializing...');
            const dataSource = await AppDataSourceSingleton.getInstance();
            Container.set(DataSource, dataSource);
            console.log('DataSource initialized and set in Container');
        } else {
            console.log('DataSource already in Container');
        }
        next();
    } catch (error) {
        console.error('Error initializing DataSource:', error);
        res.status(500).send('Internal Server Error');
    }
}

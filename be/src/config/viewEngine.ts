
import express, { Application } from 'express';
import path from 'path';

const configViewEngine = (app: Application): void => {
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, '..', 'public')));
};

export default configViewEngine;
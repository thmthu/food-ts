import express from 'express';
import { Container } from 'typedi';
import { PageController } from '../controllers/PageController';
import { DataSource } from 'typeorm';
export default () => {
    const router = express.Router();
    const pageController = Container.get(PageController);
    console.log("4", Container.has(DataSource)); // Should print `true`


    router.get('/dish/page-create', pageController.getCreatePage.bind(pageController));
    router.get('/dish/page-update', pageController.getUpdatePage.bind(pageController));
    router.get('/dish/home', pageController.getHome.bind(pageController));
    router.get('/dish/page-update/:id', pageController.getUpdatePage.bind(pageController));
    // router.get('/dish/update',pageController.)
    router.post('/dish/create', pageController.createOneDish.bind(pageController));
    router.post('/dish/update', pageController.updateDishByID.bind(pageController));

    router.get('/dish/delete/:id', pageController.deleteDishById.bind(pageController))
    return router

}
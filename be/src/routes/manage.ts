import express from 'express';
import { Container } from 'typedi';
import { PageController } from '../controllers/pageController';
import { DataSource } from 'typeorm';
const router = express.Router();
const pageController = Container.get(PageController);
console.log("4", Container.has(DataSource)); // Should print `true`


router.get('/create', pageController.getCreatePage.bind(pageController));
router.get('/update', pageController.getUpdatePage.bind(pageController));
router.get('/', pageController.getHome.bind(pageController));
router.post('/create-restaurant', pageController.createRestaurant.bind(pageController));

export default router;

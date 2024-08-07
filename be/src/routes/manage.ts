import express from 'express';
import { getCreatePage, getUpdatePage, getHome, createRestaurant } from '../controllers/manage';

const router = express.Router();

router.post('/home', getHome);
router.get('/create-page', getCreatePage);
router.get('/update-page', getUpdatePage);
router.post('/create-restaurant', createRestaurant);
export default router;

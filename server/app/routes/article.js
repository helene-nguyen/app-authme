//~ Import Router 
import { Router } from 'express';
const router = Router();

//~ Import modules
import {fetchAllArticles} from '../controllers/articleController.js';

router.get('/articles', fetchAllArticles);

//~ Export router
export { router };
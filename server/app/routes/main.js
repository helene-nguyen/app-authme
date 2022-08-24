//~ Import Router 
import { Router } from 'express';
const router = Router();

//~ Import modules
import {renderHomePage} from '../controllers/mainController.js';

router.get('/', renderHomePage);

//~ Export router
export { router };
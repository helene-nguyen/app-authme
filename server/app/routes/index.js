//~ Import Router
import { Router } from 'express';
const router = Router();

//~ Main
import { router as mainRouter } from './main.js';
router.use(mainRouter);

//~ User
import { router as userRouter } from './user.js';
router.use(userRouter);

//~ Articles
import { router as articlesRouter } from './article.js';
router.use(articlesRouter);

//~ Export router
export { router };

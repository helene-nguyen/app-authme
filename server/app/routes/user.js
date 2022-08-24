//~ Import Router
import { Router } from 'express';
const router = Router();

//~ Import modules
import { fetchAllUsers, fetchOneUser, doSignUp, doSignIn, doSignOut } from '../controllers/userController.js';

import { refreshToken } from '../services/jsonWebToken.js';

//~ Import schema
import { validation } from '../services/validation.js';
import { userSignUpSchema } from '../schema/user.schema.js';
//~ Authorization
import { validateToken } from '../middlewares/validateToken.js';
import { auth, admin } from '../middlewares/auth.js';


//*ROUTES
router.get('/users', fetchAllUsers);
router.get('/users/:userId', fetchOneUser);

router.post('/signup',validation.body(userSignUpSchema), doSignUp); // create user
router.post('/signin', doSignIn);
router.get('/signout', doSignOut);

router.post('/refreshtoken', refreshToken);

//~ Export router
export { router };

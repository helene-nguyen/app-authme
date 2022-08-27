//~ Import Router
import { Router } from 'express';
const router = Router();

//~ Import modules
import { fetchAllUsers, fetchOneUser, doSignUp, doSignIn, doSignOut, updateUser, deleteUser } from '../controllers/userController.js';

import { refreshToken } from '../services/jsonWebToken.js';

//~ Import schema
import { validation } from '../services/validation.js';
import { userSignUpSchema, userSignInSchema, userUpdateSchema } from '../schema/user.schema.js';
//~ Authorization
import { validateToken } from '../middlewares/validateToken.js';
import { auth, admin } from '../middlewares/auth.js';


//*ROUTES
//
router.post('/signup',validation.body(userSignUpSchema), doSignUp); // create user
router.post('/signin', validation.body(userSignInSchema),doSignIn);
router.get('/signout', doSignOut);
//
router.get('/users', fetchAllUsers);
router.get('/users/:userId', [validateToken, auth],fetchOneUser);
router.patch('/users/:userId',[validateToken, auth, admin],validation.body(userUpdateSchema), updateUser);
router.delete('/users/:userId', [validateToken, auth, admin],deleteUser);
//
router.post('/refreshtoken', refreshToken);

//~ Export router
export { router };

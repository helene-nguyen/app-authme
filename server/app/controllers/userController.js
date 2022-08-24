//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import modules
import { User } from '../datamappers/index.js';
import { ErrorApi } from '../services/errorHandler.js';
//~ Security
import bcrypt from 'bcrypt';
//~ Authorization
import { generateAccessToken, generateRefreshToken } from '../services/jsonWebToken.js';

//~CONTROLLERS
async function fetchAllUsers(req, res) {
  try {
    const users = await User.findAll();

    if (!users) throw new ErrorApi(`No users found`, '/', '', req, res, 400);

    return res.status(200).json(users);
  } catch (err) {
    logger(err.message);
  }
}

async function fetchOneUser(req, res) {
  try {
    const userId = req.params.userId;

    if (typeof userId !== 'string') throw new ErrorApi(`Id must be a string`, '/', '', req, res, 400);

    const user = await User.findOne(userId);

    if (!user) throw new ErrorApi(`Aucun utilisateur trouvé`, req, res, 400);

    res.status(200).json(user);
  } catch (err) {
    logger(err.message);
  }
}

async function doSignUp(req, res) {
  try {
    let { email, password, passwordConfirm } = req.body;

    const userExist = await User.findUser({ email });
    if (userExist) {
      req.session.errorMSG = 'User already exist !';
      res.redirect('/signup');
    }

    //~ Encrypt password if password exist
    if (password !== passwordConfirm) (req.session.errorMSG = 'Please enter the same password !'), res.redirect('/signup');
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    //replace password in body
    req.body.password = password;

    //~ Add role + remove passwordconfirm
    req.body = { ...req.body, role: 'user' };
    const { ['passwordConfirm']: remove, ...user } = req.body;

    await User.create(user);

    res.redirect('/signin');
  } catch (err) {
    logger(err.message);
  }
}

async function doSignIn(req, res) {
  try {
    console.log(req.body.email);

    res.redirect('/dashboard');
  } catch (err) {
    logger(err.message);
  }
}


async function doSignOut(req, res) {
  try {
    res.redirect('/');
  } catch (err) {
    logger(err.message);
  }
}

export { fetchAllUsers, fetchOneUser, doSignUp, doSignIn, doSignOut };

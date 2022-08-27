import jwt from 'jsonwebtoken';
import { ErrorApi } from '../../app/services/errorHandler.js';
import debug from 'debug';
const logger = debug('Jwt');

function validateToken(req, res, next) {
  try {
      //   get token from header
      const authHeader = req.headers['authorization'];
  
      if (authHeader === undefined) throw new ErrorApi('No token found', req, res, 400);
  
      //header contains token "Bearer <token>", split the string and get the 2nd part of the array
      const accessToken = authHeader.split(' ')[1];
  
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          throw new ErrorApi('Invalid token !', req, res, 403);
        }
        req.user = user.user;
        req.session.token = accessToken;
        
        next();
      });
    } catch (err) {
      logger(err.message);
    }
  }

  export { validateToken };
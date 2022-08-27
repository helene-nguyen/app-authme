//~ Import module
import { ErrorApi } from '../services/errorHandler.js';

//~ Authentication
function auth(req, res, next) {
  if (!req.user) throw new ErrorApi(`User not connected !`, req, res, 401);

  next();
}

function role(req, res, next) {
  if (req.user.role === 'admin') {
    next();
  } else {throw new ErrorApi(`Accès interdit !`, req, res, 403);}
  
}

function admin(req, res, next) {
    if (req.user.role !== 'admin') throw new ErrorApi(`Forbidden ! The user is not admin`, req, res, 403);
    next();
}

export { auth, admin, role };

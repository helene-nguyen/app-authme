//~ Import module
import { ErrorApi } from "./errorHandler.js";
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');

//~ Validation schema
const validation = {
    /**
     * 
     * @func schemaCustom
     * @description On récupère le schéma établi avec le module Joi pour la validation du body 
     * @returns 
     */
    body(schemaCustom) {
      //valid req.body format
      return function(req, res, next) {
        const { error } = schemaCustom.validate(req.body);
        if (error) {
          logger(error);
          throw new ErrorApi('Bad request', req, res,400);
        }
  
        next();
      };
    }
  };
  
  export { validation };
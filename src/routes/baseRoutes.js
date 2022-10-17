import { Router } from 'express';
import SchemaValidator from '../schema/validate';
import loginRequired from '../middlewares/loginRequired';

import multer from 'multer'
import multerConfig from "../config/multerConfig";

class BaseRoute{
  constructor(){
    this.routes = Router()
    this.schemaValidator = new SchemaValidator();
    this.upload = multer(multerConfig).single('file');
    this.LoginRequired = loginRequired.validToken;
    this.isAdmin = loginRequired.isAdmin;

  }
}

export default BaseRoute

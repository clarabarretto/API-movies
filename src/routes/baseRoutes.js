import { Router } from 'express';
import SchemaValidator from '../schema/validate';

class BaseRoute{
  constructor(){
    this.routes = Router()
    this.schemaValidator = new SchemaValidator()
  }
}

export default BaseRoute

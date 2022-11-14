import './src/database';

import env from 'dotenv';
import { resolve } from 'path';

import express from 'express';
import cors from 'cors';

import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import movieRoutes from './src/routes/movieRoutes';
import watchedRoutes from './src/routes/watchedRoutes';
import coverRoutes from './src/routes/coverRoutes';
import loginRequired from './src/middlewares/loginRequired'

env.config();

class App {
  constructor() {
    this.loginRequired = loginRequired.validToken
    this.isAdmin = loginRequired.isAdmin
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
    this.app.use(cors());

  }
  routes() {
    this.app.use('/users', userRoutes.setup());
    this.app.use('/movies/', movieRoutes.setup());
    this.app.use('/watched/', watchedRoutes.setup());
    this.app.use('/login/', tokenRoutes.setup());
    this.app.use('/covers/', coverRoutes.setup());
  }
  setup() {
    this.middlewares();
    this.routes();
};
}

export default new App().app;

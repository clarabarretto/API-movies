import './src/database';

import env from 'dotenv';
// import { resolve } from 'path';

import express from 'express';

import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import movieRoutes from './src/routes/movieRoutes';
import watchedRoutes from './src/routes/watchedRoutes';

env.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/movies/', movieRoutes);
    this.app.use('/watched/', watchedRoutes);
  }
}

export default new App().app;

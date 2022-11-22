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
import userAcessLogsRoutes from  './src/routes/userAcessLogsRoutes';
import recoveryRoutes from './src/routes/recoveryRoutes'
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
    this.app.use(express.static(resolve(__dirname, 'uploads')));
    this.app.use(cors());
    this.app.use(express.json({ limit: "100mb" }));
    this.app.use(express.text({ limit: "100mb" }));
    this.app.use(express.urlencoded({ limit: "100mb", extended: true }));

  }
  routes() {
    this.app.use('/users', userRoutes.setup());
    this.app.use('/movies/', movieRoutes.setup());
    this.app.use('/watched/', watchedRoutes.setup());
    this.app.use('/login/', tokenRoutes.setup());
    this.app.use('/covers/', coverRoutes.setup());
    this.app.use('/acessLogs/', userAcessLogsRoutes.setup());
    this.app.use('/', recoveryRoutes.setup())
  }
  setup() {
    this.middlewares();
    this.routes();
};
}

export default new App().app;

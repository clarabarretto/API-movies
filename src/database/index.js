import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Movie from '../models/Movie';
import Watched from '../models/Watched';
import Cover from '../models/Cover';

const models = [User, Movie, Watched, Cover];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

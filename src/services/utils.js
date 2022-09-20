import User from '../models/User';

const getNextUser = (count) => User.findByPk(count);

export default getNextUser;

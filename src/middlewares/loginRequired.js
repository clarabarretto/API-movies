import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['login required'],
    });
  }

  const token = authorization.split(' ')[1];

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
      raw: true,
    });

    if (!user) {
      return res.status(401).json({
        errors: ['invalid'],
      });
    }

    req.actualUser = user;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['expired or invalid token'],
    });
  }
};

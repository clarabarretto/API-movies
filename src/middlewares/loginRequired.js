import jwt from 'jsonwebtoken';
import User from '../models/User';

const validToken = async (req, res, next) => {
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
   next();
  } catch (e) {
    return res.status(401).json({
      errors: ['expired or invalid token'],
    });
  }
}

const isAdmin = async (req,res,next) => {
  try{
    console.log(req.actualUser);
    if (!req?.actualUser?.admin) {

      return res.status(401).json({
        errors: ['user is not an admin'],
      });
    }

    next()
  }catch(e){
    return res.status(401).json({
      errors: ['user is not an admin'],
  })
}
}

module.exports = {
  validToken, isAdmin
}


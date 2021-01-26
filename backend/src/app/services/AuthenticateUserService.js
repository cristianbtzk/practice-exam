import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import AppError from '../../errors/AppError';
import authConfig from '../../config/auth';

class AuthenticateUserService {
  async execute({ email, password }) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Incorrect data.', 401);
    }

    const checkPasswordMatches = await compare(password, user.password);

    if (!checkPasswordMatches) {
      throw new AppError('Incorrect data', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    user.password = undefined;

    return { user, token };
  }
}

export default new AuthenticateUserService();

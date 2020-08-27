import { compare } from 'bcrypt';
import { knexConnection } from '../database/bookshelf';

import { createToken } from '../utils/jwt';
import createError from '../utils/createError';

export const login = async (req, res, next) => {
  try {
    const data = await knexConnection
      .from('users')
      .where('username', req.body.username)
      .innerJoin('roles', 'users.role_id', 'roles.role_id');

    if (!data.length) {
      throw createError(401, 'Username or password incorrect');
    }

    const match = await compare(req.body.password, data[0].password);
    if (!match) {
      throw createError(401, 'Username or password incorrect');
    }

    const token = createToken({ id: data[0].id, roleId: data[0].role_id });

    // deleting unnecessary fields from response
    delete data[0].password;

    res.json({
      status: 'Success',
      accessToken: token,
      payload: data[0],
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    next(error);
  }
};

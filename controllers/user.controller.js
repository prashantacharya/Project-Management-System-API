import User from '../models/users.model';
import Role from '../models/roles.model';

import createError from '../utils/createError';
import deletePasswordFromResponse from '../utils/deletePassword';

import userRole from '../configs/userRole';

export const getAllUsers = async (req, res, next) => {
  const data = await new User().fetchAll();
  const users = data.toJSON();
  res.json({
    status: 'Success',
    payload: deletePasswordFromResponse(users),
  });
};

export const getUserById = async (req, res, next) => {
  try {
    const data = await new User({ id: req.params.id }).fetch();
    const user = data.toJSON();

    delete user.password;

    res.json({
      status: 'Success',
      payload: user,
    });
  } catch (error) {
    if (error.message === 'EmptyResponse')
      next(createError(404, 'User with specified id not found'));
  }
};

export const createUser = async (req, res, next) => {
  const { name, username } = req.body;
  const password = req.hashedPassword;
  const role_id = userRole[req.body.userRole.toLowerCase()];

  try {
    const data = await User.forge().save({ name, username, password, role_id });
    const newUser = data.toJSON();

    delete newUser.password;

    res.status(201).send({
      status: 'Success',
      payload: newUser,
    });
  } catch (error) {
    if (error.constraint === 'users_username_key') {
      next(createError(400, 'Username already taken'));
    } else {
      next(error);
    }
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.authenticatedUserRoleId != 4) {
    next(createError('401', 'Unauthorized'));
  }

  try {
    const deletedUser = await new User({ id: req.params.id }).destroy();

    res.status(200).json({
      status: 'Success',
      message: 'Record deleted successfully',
    });
  } catch (error) {
    if (error.message === 'No Rows Deleted') {
      next(createError(404, 'User with specified id not found'));
    } else {
      next(error);
    }
  }
};

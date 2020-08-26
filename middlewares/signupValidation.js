import createError from '../utils/createError';
import userRole from '../configs/userRole';

export default function (req, res, next) {
  if (!req.body.name) {
    next(createError(400, 'Name cannot be empty'));
  }

  if (req.body.username.length < 5) {
    next(createError(400, 'Username cannot be shorter than 5 characters'));
  }

  if (!userRole[req.body.userRole.toLowerCase()]) {
    next(createError(400, 'User role not defined or invalid'));
  }

  if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      req.body.password
    )
  ) {
    next(
      createError(
        400,
        'Password must be 8 characters long and should include at least of the uppercase letter, lowercase letter, number and special character'
      )
    );
  }

  next();
}

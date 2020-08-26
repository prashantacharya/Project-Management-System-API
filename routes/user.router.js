import { Router } from 'express';

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from '../controllers/user.controller';

import signupValidation from '../middlewares/signupValidation';
import hashPassword from '../middlewares/hashPassword';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();

router.get('/', authenticate, getAllUsers);
router.get('/:id', authenticate, getUserById);
router.post('/', signupValidation, hashPassword, createUser);
router.patch('/:id', (req, res) => {});
router.delete('/:id', authorize, deleteUser);

export default router;

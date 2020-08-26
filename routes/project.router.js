import { Router } from 'express';

import {
  createProject,
  deleteProject,
  addUserToProject,
  getUsersInProject,
  getAssginedProjects,
} from '../controllers/project.controller';

import authorize from '../middlewares/authorize';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.get('/', authenticate, authorize, getAssginedProjects);

router.post('/', authenticate, authorize, createProject);
router.patch('/:id', (req, res) => {});
router.delete('/:id', authenticate, authorize, deleteProject);
router.post('/:id/add/:userId', authenticate, authorize, addUserToProject);
router.get('/:id/users', authenticate, getUsersInProject);

export default router;

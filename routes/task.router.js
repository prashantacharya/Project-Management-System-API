import { Router } from 'express';
import authorize from '../middlewares/authorize';
import authenticate from '../middlewares/authenticate';

import {
  createTask,
  deleteTask,
  tagTask,
  getAllTaskInProject,
} from '../controllers/task.controller';

const router = Router();

router.get('/all/project/:id', authenticate, getAllTaskInProject);
router.post('/create/project/:projectId', authenticate, authorize, createTask);
router.post('/:id/tag/user/:userId', authenticate, authorize, tagTask);
router.patch('/:id', (req, res) => {});
router.delete('/:id', authenticate, authorize, deleteTask);

export default router;

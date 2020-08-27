import { Router } from 'express';
import {
  createComment,
  deleteComment,
  getCommentsInTask,
} from '../controllers/comment.controller';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.get('/all/task/:taskId', authenticate, getCommentsInTask);
router.post('/', authenticate, createComment);
router.patch('/:id', (req, res) => {});
router.delete('/:id', authenticate, deleteComment);

export default router;

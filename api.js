import { Router } from 'express';

import authRouter from './routes/auth.router';
import userRouter from './routes/user.router';
import taskRouter from './routes/task.router';
import projectRouter from './routes/project.router';
import commentRouter from './routes/comment.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/task', taskRouter);
router.use('/project', projectRouter);
router.use('/comment', commentRouter);

export default router;

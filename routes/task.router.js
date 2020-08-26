import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'Success',
    data: 'task working successfully',
  });
});

router.post('/', (req, res) => {});
router.patch('/:id', (req, res) => {});
router.delete('/:id', (req, res) => {});

export default router;

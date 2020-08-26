import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'Success',
    data: 'Comment working successfully',
  });
});

router.get('/:id', (req, res) => {
  res.json({
    status: 'Success',
    data: `Comment: ${req.params.id}`,
  });
});

router.post('/', (req, res) => {});
router.patch('/:id', (req, res) => {});
router.delete('/:id', (req, res) => {});

export default router;

import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import apiRouter from './api';
import createError from './utils/createError';

config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ status: 'Success', message: 'App running successfully' });
});

app.use('/api/v1', apiRouter);

app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: 'Error',
    message: error.message || 'Internal Server Error',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

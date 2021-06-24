import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import '../../container';
import ServerError from '@shared/errors/ServerError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction): Response => {
    if (error instanceof ServerError) {
      return response.status(400).json({
        statusCode: error.status,
        message: error.message,
      });
    }

    return response.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  },
);

app.listen(3333, () => {
  console.log('Server started 🔥');
});

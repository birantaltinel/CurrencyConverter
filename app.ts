import * as express from 'express';
import { router as convertRouter } from './convert';

export const app = express();

app.use('/convert', convertRouter);
import * as express from 'express';
import { router as convertRouter } from './routers/convert';

export const app = express();

app.use('/convert', convertRouter);
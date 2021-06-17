import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser';

import sessionMiddleware from './sessions.js';
import middlewareRouter from './auth/index.js';
import apiRouter from './api/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use('/', sessionMiddleware);

app.use('/auth', middlewareRouter);
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use('/', (err, _req, res) => {
  res
    .status(err.status || 500)
    .send(err.message || 'Internal server error');
});

export default app;
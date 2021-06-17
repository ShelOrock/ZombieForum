import express from 'express';
const router = express.Router();

import userRouter from './users.js';
import githubRouter from './githubAuth.js';
import conversationRouter from './conversation.js';
import replyRouter from './reply.js';
import tagRouter from './tag.js';
import mlRouter from './ml.js';

router.use('/users', userRouter);
router.use('/github', githubRouter);
router.use('/conversation', conversationRouter);
router.use('/reply', replyRouter);
router.use('/tag', tagRouter);
router.use('/ml', mlRouter);

router.use('*', (req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

export default router;

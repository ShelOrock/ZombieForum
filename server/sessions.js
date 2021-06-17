import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

import { User } from './database/index.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 1000 * 60 * 60 * 24
  },
}));

app.use((req, res, next) => {
  User.findOne({ where: { sessionId: req.session.id } })
    .then(userOrNull => {
      req.user = {};
      if (!userOrNull) {
        req.loggedIn = false;
        req.user1 = userOrNull;
      } else {
        req.loggedIn = true;
        if (userOrNull.github_access_token) {
          req.user.github_access_token = userOrNull.github_access_token;
        }
      }
    })
    .then(next)
    .catch(next);
});

export default app;
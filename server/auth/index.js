import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../database/index.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(userOrNull => {
      if (!userOrNull) {
        res.status(401).send();
      } else {
        bcrypt.compare(req.body.password, userOrNull.password)
        .then(result => {
          if (result) {

            if (userOrNull.userType === 'admin') {
              req.session.admin = true;
            } else {
              req.session.admin = false;
            }

            userOrNull.update(
              { sessionId: req.session.id },
              { returning: true }
            )
              .then(updatedUser => res.status(200).send(updatedUser))

          } else {
            res.send('Incorrect password')
          }
        })
      }
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.put('/logout', (req, res, next) => {
  User.findByPk(req.body.id)
  .then(user => user.update({ loggedIn: false }))
  .then(() => {
    req.session.destroy();
    res.status(204).send();
  })
  .catch(e => {
    res.status(500).send()
    next(e)
  })
});

router.get('/me', (req, res, next) => {
  if (req.loggedIn) return res.send(req.user1);
  res.status(401);
  const err = new Error('Not logged in');
  console.error(err);
  next();
});

export default router;

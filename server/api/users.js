import express from 'express'
import bcrypt from 'bcrypt';

import { User, Cohort } from '../database/index.js';

const router = express.Router();

const SALT_ROUNDS = 12;

router.get('/', (req, res, next) => {

  if (req.headers.authorization !== `Bearer admin`) {
    res
      .status(403)
      .send('You do not have permission to perform this action. Contact administrator.')
  }

  User.findAll({
    include: {
      model: Cohort,
    },
  })
    .then(users => {
      if (!users) {
        res
          .status(404)
          .send()
      } else {
        res
          .status(200)
          .send(users);
      }
    })
    .catch(e => {
      res
        .status(500)
        .send();
      next(e);
    });
});

router.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id, {
    include: {
      model: Cohort,
    },
  })
    .then(userOrNull => {
      if (!userOrNull) {
        res
          .status(404)
          .send();
      } else {
        res
          .status(200)
          .send(userOrNull);
      }
    })
    .catch(e => {
      res
        .status(500)
        .send()
      next(e);
    });
});

router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
  .then(hash => {
    User.create({
      ...req.body,
      password: hash
    })
    .then(createdUser => {
      res
        .status(201)
        .send(createdUser)
    })
    .catch(e => {
      res
        .status(500)
        .send()
      next(e);
    })
  })
});

router.put('/:id', (req, res, next) => {

  if (req.headers.authorization !== `Bearer admin` && req.headers.authorization !== `Bearer user`) {
    res
      .status(403)
      .send('You do not have permission to perform this action. Contact administrator.')
  }

  User.findByPk(req.params.id)
    .then(userOrNull => {
      if (!userOrNull) {
        res
          .status(404)
          .send();
      } else {
        userOrNull.update(req.body);
        res
          .status(202)
          .send(userOrNull);
      }
    })
    .catch(e => {
      res
        .status(500)
        .send();
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {

  if (req.headers.authorization !== `Bearer admin`) {
    res
      .status(403)
      .send('You do not have permission to perform this action. Contact administrator.')
  }

  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(data => {
      if (!data) {
        res
          .status(404)
          .send()
      } else {
        res
          .status(204)
          .send();
      }
    })
    .catch(e => {
      res
        .status(500)
        .send();
      next(e);
    });
});

export default router;

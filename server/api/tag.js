import express from 'express'

import { Tag, Conversation } from '../database/index.js';

const router = express.Router();

//return all tags
router.get('/', (req, res, next) => {
  Tag.findAll({
    include: {
      model: Conversation,
        through: {
          attributes: []
        }
    }
  })
  .then(results => {
    if (!results) {
      res
      .status(404)
      .send()
    } else {
      res
        .status(200)
        .send(results);
    }
  })
  .catch(e => {
    res
      .status(500)
      .send();
    next(e);
  });
});

router.get('/:name', (req, res, next) => {
  Tag.findOne({
    where: {
      name: req.params.name
    },
    include: {
      model: Conversation, through: {
        attributes: []
      }
    }
  })
  .then(results => {
    if (!results) {
      res
        .status(404)
        .send()
    } else {
      res
        .status(200)
        .send(results);
    }
  })
  .catch(e => {
    res
      .status(500)
      .send();
    next(e);
  });
})

export default router;

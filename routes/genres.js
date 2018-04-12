//const asyncMiddleware = require('../middleware/async');
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// router.get('/', async (req, res, next) => {
//   // Genre.find()
//   //   .then()
//   //   .catch()
//   //with await use try catch block
//   try {
//     const genres = await Genre.find().sort('name').select('_id name');
//     res.send(genres);
//   }
//   catch (ex) {
//     next(ex);
//   }

// });
// router.get('/', asyncMiddleware(async (req, res) => {
//   const genres = await Genre.find().sort('name').select('_id name');
//   res.send(genres);
// }));

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name').select('_id name');
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });

  await genre.save();

  res.send(genre);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// When we use 2 or more middleware functions we should be use an array with the signatures
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router;
const express = require('express');
const routes = express.Router();

const dbo = require('../db/conn');

routes.route('/devs').get(async (_req, res) => {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection(' ') // !
    .find({})
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(400).send({ message: err.message });
      } else {
        res.json(result);
      }
    });
});

module.exports = routes;
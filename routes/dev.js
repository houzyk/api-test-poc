const express = require('express');
const routes = express.Router();

const dbo = require('../db/conn');

routes.route('/devs').get(async (_req, res) => {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('devs')
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

routes.route('/devs').post((req, res) => {
  const dbConnect = dbo.getDb();
  const { user, name, html_url, avatar_url, numTotalTests, numPassedTests, numFailedTests } = req.body;

  const document_ = {
    user,
    name,
    html_url,
    avatar_url,
    numTotalTests,
    numPassedTests,
    numFailedTests
  };

  dbConnect
    .collection('devs')
    .insertOne(document_, (err, result) => {
      if (err) {
        res.status(400);
      } else {
        console.log(`Id Added: ${result.insertedId}`);
        res.status(204);
      }
    });
});

module.exports = routes;
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

routes.route('/devs/:user').patch((req, res) => {
  const dbConnect = dbo.getDb();
  const { user, name, html_url, avatar_url, numTotalTests, numPassedTests, numFailedTests } = req.body;

  const updates = {
    $set: {
      user,
      name,
      html_url,
      avatar_url,
      numTotalTests,
      numPassedTests,
      numFailedTests
    }
  };

  dbConnect
  .collection('devs')
  .updateMany({ user: req.params.user }, updates, (err, _res) => {
      if (err) {
        res.status(400);
        console.error('Dev Not Updated', err);
      } else {
        console.log('Dev Updated');
      }
  });

});

module.exports = routes;
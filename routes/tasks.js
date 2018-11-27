const express = require('express');
const router = express.Router();
const request = require('request');
require('dotenv').config();

router.get('/stores', (req, res, next) => {
  // Send request to the lcboapi with an auth key.
  request({
    uri: 'http://lcboapi.com/stores',
    headers: {
      Authorization: process.env.LCBO_AUTH,
    },
    qs: {
      lat: req.query.latitude,
      lon: req.query.longitude,
      product_id: req.query.product_id,
    },
  }).pipe(res);
});

router.get('/products', (req, res, next) => {
  // Send request to the lcboapi with an auth key.
  request({
    uri: 'http://lcboapi.com/products',
    headers: {
      Authorization: process.env.LCBO_AUTH,
    },
    qs: {
      q: req.query.q,
    },
  }).pipe(res);
});

module.exports = router;

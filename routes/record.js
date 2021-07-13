const express = require('express');
const recordController = require('./../controllers/record');

const router = express.Router();

router
  .route('/')
  .post(recordController.fetchRecords);

module.exports = router;


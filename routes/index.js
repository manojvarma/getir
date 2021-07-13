const express = require('express');
const recordRoute = require('./record');

const router = express.Router();

// add all your routes here
router.use('/records', recordRoute);


module.exports = router;
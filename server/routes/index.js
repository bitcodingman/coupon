const express = require('express');
const router = express.Router();

// 계정 인증
const account = require('./account');
router.use('/account', account);

// store
const store = require('./store');
router.use('/store', store);

// consumer
const consumer = require('./consumer');
router.use('/consumer', consumer);

module.exports = router;

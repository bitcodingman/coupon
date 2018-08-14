const express = require('express');
const router = express.Router();

// 계정 인증
const account = require('./account');
router.use('/account', account);

module.exports = router;

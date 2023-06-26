const express = require('express');
const router = express.Router();
const emailController = require('./controller');

// POST /api/send-email
router.post('/v1/', emailController.sendEmail);

module.exports = router;

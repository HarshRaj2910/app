const express = require('express');
const authRoutes = require('./authRoutes');
const contentRoutes = require('./contentRoutes');
const testRoutes = require('./testRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/content', contentRoutes);
router.use('/tests', testRoutes);

module.exports = router;


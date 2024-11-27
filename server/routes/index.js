const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const courseRoutes = require('./course');
const answerRoutes = require('./answer');
const lessonRoutes = require('./lesson');
const questionRoutes = require('./question');
// 路由分配
router.use('/auth', authRoutes);

router.use('/course', courseRoutes);

router.use('/answer', answerRoutes);

router.use('/lesson', lessonRoutes);

router.use('/question', questionRoutes);

module.exports = router;

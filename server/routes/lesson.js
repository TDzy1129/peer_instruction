const express = require('express');
const router = express.Router();

const { getLesson, addLesson }= require("../controllers/lessoncontroller");

router.post('/getLesson',getLesson);

router.post('/addLesson', addLesson);

module.exports = router;
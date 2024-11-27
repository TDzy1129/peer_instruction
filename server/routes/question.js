const express = require('express');
const router = express.Router();

const { selectLessonQ, selectQ, selectTeacherQ, addQ, upadteQ , selectCourseQ,deleteQ}= require('../controllers/questioncontroller');

router.post('/selectLessonQ',selectLessonQ);

router.post('/selectQ',selectQ);

router.post('/selectTeacherQ',selectTeacherQ);

router.post('/addQ',addQ);

router.post('/updateQ',upadteQ);

router.post('/selectCourseQ',selectCourseQ);

router.post('/deleteQ',deleteQ);

module.exports = router;
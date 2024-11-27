const express = require('express');
const router = express.Router();
const {addCourse, getTeacherCourse, getStudentCourse, joinCourse, getCourse}  = require('../controllers/coursesController');

router.post('/addCourse',addCourse);
router.post('/getTeacherCourse',getTeacherCourse);

router.post('/getStudentCourse',getStudentCourse);

router.post('/joinCourse',joinCourse);

router.post('/getCourse',getCourse);


module.exports = router;
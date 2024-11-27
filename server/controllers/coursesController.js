const jwt = require('jsonwebtoken');
const db = require('../models/db');



const getTeacherCourse = async (req, res) => {
    const { teacherId } =  req.body;
    try {
        const result = await db.query('SELECT * FROM course WHERE teacher_id = ?', [teacherId]);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'History water record not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getStudentCourse = async (req, res) => {
    const { studentId } =  req.body;
    try {
        const result = await db.query('SELECT * FROM s_course WHERE student_id =?', [studentId]);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'History water record not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const addCourse = async (req, res) => {
    const { courseName, courseContent, teacherId } =  req.body;
    try {
        const result = await db.query('INSERT INTO course (course_name, course_content, teacher_id) VALUES (?,?,?)', [courseName, courseContent , teacherId]);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Server error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const joinCourse = async (req, res) => {
    const { studentId, courseId, courseContent, courseName } =  req.body;
    try {
        const result = await db.query('INSERT INTO s_course (student_id, course_id, course_content, course_name) VALUES (?,?,?,?)', [studentId, courseId, courseContent, courseName]);
        if (result) {
            res.json({ message: 'Course joined successfully' });
        } else {
            res.status(404).json({ message: 'Server error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


const getCourse = async (req, res) => {
    const { courseId } =  req.body;
    try {
        const result = await db.query('SELECT * FROM course WHERE course_id =?', [courseId]);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getTeacherCourse,
    getStudentCourse,
    addCourse,
    joinCourse,
    getCourse,
};

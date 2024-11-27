const jwt = require('jsonwebtoken');
const db = require('../models/db');



const getLesson = async (req, res) => {
    const { courseId } =  req.body;
    try {
        const result = await db.query('SELECT * FROM lesson WHERE course_id = ?', [courseId]);
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

const addLesson = async (req, res) => {
    const { course_id, lesson_name, lesson_content } = req.body;
    try {
        const result = await db.query('INSERT INTO lesson (course_id, lesson_name, lesson_content) VALUES (?,?,?)', [course_id, lesson_name, lesson_content]);
        if (result) {
            res.json({ message: 'Lesson added successfully' });
        } else {
            res.status(404).json({ message: 'Invalid data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getLesson,
    addLesson,
};

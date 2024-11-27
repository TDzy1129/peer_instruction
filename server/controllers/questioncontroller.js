const jwt = require('jsonwebtoken');
const db = require('../models/db');

const selectLessonQ = async (req, res) => {
    const { lessonId } =  req.body;
    try {
        const result = await db.query('SELECT * FROM h_w WHERE lesson_id = ?', [lessonId]);
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

const selectCourseQ = async (req, res) => {
    const { courseId } =  req.body;
    try {
        const result = await db.query('SELECT * FROM h_w WHERE course_id = ?', [courseId]);
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

const selectQ = async (req, res) => {
    const { h_w_id} = req.body;
    try {
        const result = await db.query('SELECT * FROM h_w WHERE h_w_id =?', [h_w_id]);
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

const selectTeacherQ = async (req, res) => {
    const { teacherId } = req.body;
    try {
        const result = await db.query('SELECT * FROM h_w WHERE teacher_id =?', [teacherId]);
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

const addQ = async (req, res) => {
    const { content, available, teacher_id, course_id, lesson_id, option_a, option_b, option_c, option_d, answer } = req.body;
    try {
        const result = await db.query('INSERT INTO h_w ( `content`, `available`, `teacher_id`, `course_id`, `lesson_id`, `option_a`, `option_b`, `option_c`, `option_d`, `answer`)VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)', [content, available, teacher_id, course_id, lesson_id, option_a, option_b ,option_c , option_d, answer])
        res.json({ message: 'History water record added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const upadteQ = async (req, res) => {
    const { h_w_id, content, available, teacher_id, course_id, lesson_id, option_a, option_b, option_c, option_d, answer } = req.body;
    try{
        const result = await db.query('UPDATE h_w SET `content` =?, `available` =?, `teacher_id` =?, `course_id` =?, `lesson_id` =?, `option_a` =?, `option_b` =?, `option_c` =?, `option_d` =?, `answer` =? WHERE `h_w_id` =?', [content, available, teacher_id, course_id, lesson_id, option_a, option_b, option_c, option_d, answer, h_w_id])
        res.json({ message: 'History water record updated successfully' });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteQ = async (req, res) => {
    const { h_w_id } = req.body;
    try{
        const result = await db.query('DELETE FROM h_w WHERE `h_w_id` =?', [h_w_id])
        res.json({ message: 'History water record deleted successfully' });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports ={
    selectLessonQ,
    selectCourseQ,
    selectQ,
    selectTeacherQ,
    addQ,
    upadteQ,
    deleteQ, 
};

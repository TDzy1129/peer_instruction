const jwt = require('jsonwebtoken');
const db = require('../models/db');

const selectRecord = async (req, res) => {
    const { h_w_id } = req.body;
    try {
        console.log(h_w_id);
        const result = await db.query('SELECT * FROM h_w_record WHERE h_w_id = ?', [h_w_id]);
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

const insertRecord = async (req, res) => {
    const { h_w_id, student_id, course_id, answer } = req.body;
    try {
        const result = await db.query('INSERT INTO h_w_record (h_w_id, student_id, course_id, answer) VALUES (?,?,?,?)', [h_w_id, student_id, course_id, answer]);
        res.status(201).json({ message: 'History water record inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const selectSingleRecord = async (req, res) => {
    const { h_w_id, student_id, course_id } = req.body;
    try {
        const result = await db.query('SELECT * FROM h_w_record WHERE h_w_id =? AND student_id =? AND course_id =?', [h_w_id, student_id, course_id]);
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'History water record not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    selectRecord,
    insertRecord,
    selectSingleRecord,
};
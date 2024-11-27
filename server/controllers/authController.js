const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [user] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        console.log(user[0]);
        if(user[0].password != password) {
            return res.status(401).json({ message: '密码不正确' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: '登录失败', error });
    }
};

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        console.log(2);
        res.status(201).json({ message: '注册成功' });
    } catch (error) {
        res.status(500).json({ message: '注册失败', error });
    }
};

module.exports = { login, register };

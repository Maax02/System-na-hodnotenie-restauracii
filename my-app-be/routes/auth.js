const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');

const { Pool } = require('pg');
var router = express.Router();

router.post('/signUp', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            `INSERT INTO users (user_firstName, user_lastName, user_email, isAdmin)
            VALUES ($1, $2, $3, $4)
            RETURNING user_id, user_email`,
            [username, username, email, false]
    );

    res.status(201).json({ message : 'User created successfully', user: result.rows[0] });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
);

module.exports = router;
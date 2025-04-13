const {Pool} = require('pg');
const {config} = require('../config.secrets')
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

exports.addUser = function(user_name, user_email, user_password) {
    return pool.query(
        `insert into users (user_name, user_password, email, isAdmin)
        values ($1, $2, $3, $4)`
        , [user_name, user_email, user_password, false]);
};

exports.addAdmin = function(user_name, user_email, user_password) {
    return pool.query(
        `insert into users (user_name, user_password, email, isAdmin)
        values ($1, $2, $3, $4)`
        , [user_name, user_email, user_password, true]);
};

exports.getUser = function (id) {
    return pool.query(
        `select user_name, user_password, email, isAdmin
         FROM users
         WHERE user_id = $1`, 
        [id]
    );
};
//const {Pool} = require('pg');
const pool = require('../config/db');
const {config} = require('../config.secrets')
require('dotenv').config();
var bcrypt = require('bcryptjs');

/*
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});*/

exports.addUser = function(user) {
    pswd = bcrypt.hashSync(user.user_password);
    return pool.query(
        `insert into users (user_name, user_password, email, isAdmin)
        values ($1, $2, $3, $4)`
        , [user.user_name, pswd, user.user_email, false]);
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


exports.login = function(username) {   
    //console.log("log in model")
    return pool.query(
        "select * from users u where u.user_name = $1",
        [username]
    );
};

exports.getUserInfo = function (id) {
    return pool.query(
        `select user_name, email, isAdmin
         FROM users
         WHERE user_id = $1`, 
        [id]
    );
};

exports.getUserByName = function (name) {
    return pool.query(
        `select user_id, user_name, email, isAdmin
         FROM users
         WHERE user_name = $1`, 
        [name]
    );
};

exports.deleteUser = function(id) {
    return pool.query(
        `DELETE FROM users WHERE user_id = $1`,
        [id]
    );
};

exports.makeAdmin = function(id) {
    return pool.query(
        `update users
        set isadmin = true
        where user_id = $1`,
        [id]
    );
};
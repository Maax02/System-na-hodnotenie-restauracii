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

exports.addReview = function(user_id, restaurant_id, hodnotenie, sprava, datum) {
    return pool.query(
        `insert into recenzia (user_id, restaurant_id, hodnotenie, sprava, datum)
        values ($1, $2, $3, $4, $5)`,
        [user_id, restaurant_id, hodnotenie, sprava, datum]);
};

exports.getReview = function(user_name, user_email, user_password) {
    return pool.query(
        `insert into users (user_firstName, user_lastName, user_email, isAdmin)
        values ($1, $2, $3, $4)`,
        [user_name, user_email, user_password, true]);
};

exports.deleteReview = function (id) {
    return pool.query(
        `delete from recenzia where recenzia_id = $1`,
        [id]
    );
};
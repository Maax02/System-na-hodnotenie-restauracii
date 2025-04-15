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

exports.getRestaurantReviews = function(id) {
    return pool.query(
        `select r.recenzia_id, r.restaurant_id, r.user_id, r.hodnotenie, r.sprava, r.datum, u.user_name, u.email
        from recenzia r
        join users as u on r.user_id = u.user_id
        where restaurant_id = $1`,
        [id]);
};
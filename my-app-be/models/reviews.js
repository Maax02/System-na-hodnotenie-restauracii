const pool = require('../config/db');
const {config} = require('../config.secrets')
require('dotenv').config();

/*
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});
*/

exports.getRestaurantReviews = function(id) {
    return pool.query(
        `select r.recenzia_id, r.restaurant_id, r.user_id, r.hodnotenie, r.sprava, r.datum, u.user_name, u.email
        from recenzia r
        join users as u on r.user_id = u.user_id
        where restaurant_id = $1`,
        [id]);
};


exports.getRestaurantAvg = function(id) {
    return pool.query(
        `SELECT AVG(hodnotenie) AS average_rating
        FROM recenzia
        WHERE restaurant_id = $1`,
        [id]);
};


exports.getUserReviews = function(id) {
    return pool.query(
        `select r.recenzia_id, r.restaurant_id, res.restaurant_name, r.user_id, r.hodnotenie, r.sprava, r.datum, u.user_name, u.email
        from recenzia r
        join users as u on r.user_id = u.user_id
        join restaurant as res on res.restaurant_id = r.restaurant_id
        where r.user_id = $1`,
        [id]);
};

exports.addReview = function(user_id, restaurant_id, hodnotenie, sprava) {
    return pool.query(
        `insert into recenzia (user_id, restaurant_id, hodnotenie, sprava, datum)
        values ($1, $2, $3, $4, NOW())`
        , [user_id, restaurant_id, hodnotenie, sprava]);
};
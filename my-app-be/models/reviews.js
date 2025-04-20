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

/*
exports.getRestaurantReviews = function(id) {
    return pool.query(
        `select r.recenzia_id, r.restaurant_id, r.user_id, r.hodnotenie, r.sprava, r.datum, u.user_name, u.email, avg.avg_rating
        from recenzia r
        join users u ON r.user_id = u.user_id
        join (
        select restaurant_id, AVG(hodnotenie) AS average_rating
        from recenzia
        where restaurant_id = $1
        group by restaurant_id)
        avg on r.restaurant_id = avg.restaurant_id
        where r.restaurant_id = $1`,
        [id]);
};*/

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
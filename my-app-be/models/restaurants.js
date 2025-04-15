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

exports.getRestaurants = function() {
    //return pool.query(`select restaurant_id, restaurant_name, kuchyna from restaurant`);
    return pool.query(`
        select r.restaurant_id, r.restaurant_name, r.street, r.street_number, r.city, r.psc, r.kuchyna,
            AVG(rv.hodnotenie) AS average_rating
            FROM restaurant r
            LEFT JOIN recenzia rv ON r.restaurant_id = rv.restaurant_id
            GROUP BY r.restaurant_id, r.restaurant_name, r.street, r.street_number, r.city, r.psc, r.kuchyna
            ORDER BY average_rating DESC;`)
};

/*
exports.getRestaurantById = function (id) {
    return pool.query(
        `select restaurant_id, restaurant_name, kuchyna, street, street_number, city, psc
         FROM restaurant
         WHERE restaurant_id = $1`, 
        [id]
    );
};*/


exports.getRestaurantById = function (id) {
    return pool.query(
        `SELECT r.restaurant_id, r.restaurant_name, r.street, r.street_number, r.city, r.psc, r.kuchyna, AVG(rec.hodnotenie) AS average_rating
        FROM restaurant r
        LEFT JOIN recenzia rec ON r.restaurant_id = rec.restaurant_id
        WHERE r.restaurant_id = $1
        GROUP BY r.restaurant_id, r.restaurant_name, r.street, r.street_number, r.city, r.psc, r.kuchyna`, 
        [id]
    );
};


exports.addRestaurant = function(restaurant_name, kuchyna, street, street_number, city, psc) {
    return pool.query(
        `insert into restaurant (restaurant_name, kuchyna, street, street_number, city, psc)
        values ($1, $2, $3, $4, $5, $6)`,
        [restaurant_name, kuchyna, street, street_number, city, psc]);
}
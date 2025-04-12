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
    return pool.query(`select restaurant_id, restaurant_name, kuchyna from restaurant`);
};

exports.getRestaurantById = function (id) {
    return pool.query(
        `select restaurant_id, restaurant_name, kuchyna, street, street_number, city, psc
         FROM restaurant
         WHERE restaurant_id = $1`, 
        [id]
    );
};
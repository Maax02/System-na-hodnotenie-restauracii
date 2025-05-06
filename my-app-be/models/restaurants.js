const pool = require('../config/db');
const {config} = require('../config.secrets')
require('dotenv').config();

exports.getRestaurants = function(order = 'DESC', kitchenFilter = '') {
    const orderFilter = (order === 'ASC' || order === 'DESC') ? order : 'DESC';

    let query = `
        SELECT r.restaurant_id, r.restaurant_name, r.street, r.street_number, r.city, r.psc, r.kuchyna,
               AVG(rv.hodnotenie) AS average_rating
        FROM restaurant r
        LEFT JOIN recenzia rv ON r.restaurant_id = rv.restaurant_id
    `;

    const values = [];
    if (kitchenFilter) {
        query += ` WHERE r.kuchyna = $1`;
        values.push(kitchenFilter);
    }

    query += `
        GROUP BY r.restaurant_id, r.restaurant_name, r.street, r.street_number, r.city, r.psc, r.kuchyna
        ORDER BY average_rating ${orderFilter};
    `;

    return pool.query(query, values);
};


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


exports.addToRestaurants = function(restaurant) {
    const { name, kitchen, street, number, psc, city } = restaurant;
    return pool.query(
        `insert into restaurant (restaurant_name, street, street_number, city, psc, kuchyna) 
        values ($1, $2, $3, $4, $5, $6)
        RETURNING restaurant_id`
        , [name, street, number, city, psc, kitchen]);
};


exports.getRestByName = function (name) {
    return pool.query(
        `select restaurant_id, restaurant_name, street, street_number, city, psc, kuchyna
         FROM restaurant
         WHERE restaurant_name = $1`, 
        [name]
    );
};

exports.deleteRest = function(id) {
    return pool.query(
        `DELETE FROM restaurant WHERE restaurant_id = $1`,
        [id]
    );
};
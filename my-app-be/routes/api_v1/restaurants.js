var express = require('express'); // ESM: import
var { getRestaurants, getRestaurantById } = require('../../models/restaurants');
const { getUserReviews } = require('../../models/reviews');
var router = express.Router();

router.get('/', function (req, res, next) {
    const order = req.query.order;
    getRestaurants(order).then(
        (restaurant) => {
            res.json(restaurant.rows);
        }
    ).catch(
        (err) => {
            console.log(err);
            res.status(500).send("Error fetching restaurants");
        }
    );
});

router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    getRestaurantById(id).then(
        (restaurant) => {
            res.json(restaurant.rows);
        }
    ).catch(
        (err) => {
            console.log(err);
            res.status(500).send("Error fetching restaurant by id");
        }
    );
});


module.exports = router; // ESM: export
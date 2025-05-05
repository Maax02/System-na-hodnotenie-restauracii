var express = require('express'); // ESM: import
var { getRestaurants, getRestaurantById, addToRestaurants } = require('../../models/restaurants');
const { getUserReviews } = require('../../models/reviews');
var router = express.Router();

router.get('/', function (req, res, next) {
    const order = req.query.order;
    const kitchenFilter = req.query.kitchenFilter;
    getRestaurants(order, kitchenFilter).then(
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

router.post('/add', function (req, res, next) {
    addToRestaurants(req.body).then(
        (r) => res.status(201).json({ message: 'Restauracia bola uspesne pridana!' })
    ).catch(
        (e) => {
            console.log(e);
            res.status(500).json({ error: 'Resdtauraciu sa nepodarilo pridat.' });
        }
    );
});

module.exports = router; // ESM: export
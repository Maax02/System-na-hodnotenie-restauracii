var express = require('express'); // ESM: import
var { getRestaurantReviews, getRestaurantAvg } = require('../../models/reviews')
var router = express.Router();

router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    getRestaurantReviews(id).then(
        (reviews) => {
            res.json(reviews.rows);
        }
    ).catch(
        (err) => {
            console.log(err);
            res.status(500).send("Error fetching reviews");
        }
    );
});

router.get('/:id/average', function (req, res, next) {
    const id = req.params.id;
    getRestaurantAvg(id).then(
        (reviews) => {
            res.json(reviews.rows);
        }
    ).catch(
        (err) => {
            console.log(err);
            res.status(500).send("Error fetching average review score");
        }
    );
});

module.exports = router; // ESM: export
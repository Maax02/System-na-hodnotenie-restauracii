var express = require('express'); // ESM: import
var { getRestaurantReviews, getRestaurantAvg, getUserReviews } = require('../../models/reviews')
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

router.get('/user/:id', function (req, res, next) {
    const id = req.params.id;
    getUserReviews(id).then(
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


module.exports = router; // ESM: export
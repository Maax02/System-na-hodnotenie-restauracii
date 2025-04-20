var express = require('express'); // ESM: import
var { getRestaurantReviews, getRestaurantAvg, getUserReviews, addReview } = require('../../models/reviews')
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

router.post('/', function (req, res, next) {
    const { user_id, restaurant_id, hodnotenie, sprava } = req.body;
    addReview(user_id, restaurant_id, hodnotenie, sprava)
        .then(() => {
            res.status(200).send("Review added");
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send("Error adding review");
        });
});


module.exports = router; // ESM: export
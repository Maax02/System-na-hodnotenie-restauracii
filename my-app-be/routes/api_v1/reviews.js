var express = require('express'); // ESM: import
var { getRestaurantReviews } = require('../../models/reviews')
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
            res.status(500);
        }
    );
});

module.exports = router; // ESM: export
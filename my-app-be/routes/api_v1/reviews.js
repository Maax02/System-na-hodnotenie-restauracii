var express = require('express'); // ESM: import
var { getRestaurantReviews, getRestaurantAvg, getUserReviews, addReview, deleteReview} = require('../../models/reviews')
var router = express.Router();

var multer = require('multer');
var fs = require('fs');
var path = require('path');
const uploadDir = path.join(__dirname, '../../upload/reviewPhoto');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const reviewId = req.params.review_id;
        const ext = path.extname(file.originalname);
        cb(null, `${reviewId}${ext}`);
    }
});

const upload = multer({ storage });

router.post('/upload/:review_id', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Fotka nepridana' });
    }

    res.status(200).json({ message: 'Fotka pridana', filename: req.file.filename });
});

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
        .then((result) => {
            const reviewId = result.rows[0].recenzia_id;
            res.status(200).json({ message: "Review added", recenzia_id: reviewId });
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send("Error adding review");
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    deleteReview(id)
        .then(() => res.status(200).json({ message: "Review deleted" }))
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error deleting review");
        });
});


module.exports = router; // ESM: export
var express = require('express'); // ESM: import
var { getRestaurants, getRestaurantById, addToRestaurants, getRestByName, deleteRest } = require('../../models/restaurants');
const { getUserReviews } = require('../../models/reviews');
var router = express.Router();

var multer = require('multer');
var fs = require('fs');
var path = require('path');
const uploadDir = path.join(__dirname, '../../upload/restaurantPhoto');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const restaurantId = req.params.restaurant_id;
        const ext = path.extname(file.originalname);
        cb(null, `${restaurantId}${ext}`);
    }
});

const upload = multer({ storage });

router.post('/upload/:restaurant_id', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Fotka nepridana' });
    }

    res.status(200).json({ message: 'Fotka pridana', filename: req.file.filename });
});

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
    addToRestaurants(req.body)
        .then((r) => {
            res.status(201).json({
                message: 'Restauracia bola uspesne pridana!',
                restaurant_id: r.rows[0].restaurant_id
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({ error: 'Restauraciu sa nepodarilo pridat.' });
        });
});

router.get('/name/:name', function (req, res, next) {
    const name = req.params.name;
    getRestByName(name).then(
        (user) => {
            res.json(user.rows);
        }
    ).catch(
        (err) => {
            console.log(err);
            res.status(500).send("Error fetching restaurant by name");
        }
    );
});

router.delete('/delete/:rest_id', (req, res) => {
    console.log("DELETE /rest/:rest_id hit with:", req.params.rest_id);
    const rest_id = req.params.rest_id;
    deleteRest(rest_id)
        .then(() => res.status(200).json({ message: "Restaurant deleted" }))
        .catch((err) => {
            console.log(err);
            console.log("Error in deleteRest:", err);
            res.status(500).send("Error deleting restaurant");
        });
});

module.exports = router; // ESM: export
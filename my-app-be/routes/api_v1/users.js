var express = require('express'); // ESM: import
var { addUser, getUserInfo } = require('../../models/users')
var router = express.Router();

router.post('/', function (req, res, next) {
    addUser(req.body).then(
        (r) => res.status(201).json({ message: 'Registrácia prebehla úspešne!' })
    ).catch(
        (e) => {
            console.log(e);
            res.status(500).json({ error: 'Registrácia neúspešná. Meno alebo email sa už používa.' });
        }
    );
});


router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    getUserInfo(id).then(
        (user) => {
            res.json(user.rows);
        }
    ).catch(
        (err) => {
            console.log(err);
            res.status(500).send("Error fetching user info");
        }
    );
});

module.exports = router; // ESM: export
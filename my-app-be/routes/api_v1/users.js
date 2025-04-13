var express = require('express'); // ESM: import
var { addUser } = require('../../models/users')
var router = express.Router();

router.post('/', function (req, res, next) {
    addUser(req.body).then(
        (r) => res.status(200)
    ).catch(
        (e) => {
            console.log(e);
            res.status(500);
        }
    );
});

module.exports = router; // ESM: export
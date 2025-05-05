var express = require('express'); // ESM: import
var { addUser, getUserInfo, getUserByName, deleteUser, makeAdmin } = require('../../models/users')
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

router.get('/name/:name', function (req, res, next) {
    const name = req.params.name;
    getUserByName(name).then(
        (user) => {
            res.json(user.rows);
        }
    ).catch(
        (err) => {
            console.log(err);
            res.status(500).send("Error fetching user by name");
        }
    );
});

router.delete('/delete/:user_id', (req, res) => {
    console.log("DELETE /users/:user_id hit with:", req.params.user_id);
    const user_id = req.params.user_id;
    deleteUser(user_id)
        .then(() => res.status(200).json({ message: "User deleted" }))
        .catch((err) => {
            console.log(err);
            console.log("Error in deleteUser:", err);
            res.status(500).send("Error deleting user");
        });
});


router.put('/makeAdmin/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    makeAdmin(user_id)
        .then(() => res.status(200).json({ message: "User deleted" }))
        .catch((err) => {
            console.log(err);
            console.log("Error in deleteUser:", err);
            res.status(500).send("Error deleting user");
        });
});

module.exports = router; // ESM: export
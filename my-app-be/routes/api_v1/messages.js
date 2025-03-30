var express = require('express'); // ESM: import
const messages = ["Data"]; // sample data
var router = express.Router();
router.get('/', function(req, res, next) {
 res.json(messages);
});
module.exports = router; // ESM: export

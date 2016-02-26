var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    var agent = req.headers['user-agent'];
    res.end(agent);
});

module.exports = router;

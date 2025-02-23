var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('super_hero');
});

module.exports = router;
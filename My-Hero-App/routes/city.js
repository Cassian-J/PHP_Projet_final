var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('city', { title: 'My-Hero-App' });
});

module.exports = router;
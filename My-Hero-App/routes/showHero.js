var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('showHeroes', { title: 'My-Hero-App' });
});

module.exports = router;
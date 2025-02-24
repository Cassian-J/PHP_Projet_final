var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('create_hero', { title: 'Create Hero' });
});

module.exports = router;
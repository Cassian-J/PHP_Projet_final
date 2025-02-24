var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('squad', { title: 'My-Hero-App' });
});

module.exports = router;
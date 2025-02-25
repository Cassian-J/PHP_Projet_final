var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const heroUuid = req.query.uuid;
    if (!heroUuid) {
        return res.status(400).send("UUID du héros manquant");
    }
    res.render('modifHero', { heroUuid });
});

module.exports = router;
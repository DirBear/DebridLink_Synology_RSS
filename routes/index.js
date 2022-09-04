var express = require('express');
var router = express.Router();
var rss = require('../models/debridLink');

/* GET All the RSS Flux */
router.get('/rss', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/xml');
    res.send(await rss.getRSS());
    res.end()
});

/** GET a specific RSS Item */
router.get('/rss/:id', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/xml');
    let result = rss.getRSSItem(req.params.id);
    if (result == undefined){
        res.status(404).send('<error>NOT_FOUND</error>');
    } else
        res.status(200).send(result);
    res.end()
});

module.exports = router;

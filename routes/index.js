var express = require('express');
var router = express.Router();
var rss = require('../models/debridLink');
/* GET home page. */
router.get('/rss', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/xml');
    res.send(await rss.getRSS());
    res.end()
});

module.exports = router;

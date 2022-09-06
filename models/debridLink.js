const https = require('https');
const { RSS, RSSItem } = require('./rss');

// Initialize a new RSS Item
var rss = new RSS(process.env.RSS_NAME, process.env.RSS_URL, process.env.RSS_DESCRIPTION);

/** GET All the debrid links items and save it into RSS */
function getDebridLinks() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'debrid-link.com',
            hort: 443,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.DEBRID_LINK_TOKEN}`,
            },
            path: '/api/v2/seedbox/list'
        };
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);
            var data = "";
            res.on('data', d => {
                let test = d.toString()
                data += d.toString();
            });
            res.on('end', _ => {
                console.log(data)
                resolve(JSON.parse(data));
            });
        });

        req.on('error', error => {
            console.error(error);
            reject(error)
        });
        req.end();
    });

}

/** GET The RSS Flux as string updated */
async function getRSS () {
    let items = await getDebridLinks();
    var id = 0;
    let lastId = -1;
    rss.feedList.forEach(el => { if (el.id > lastId) lastId = el.id });
    lastId++;
    for (let elem of items.value){
        if (elem.files != 0){
            for (let el of elem.files){
                if (el.downloadPercent != 100) continue;
                if (rss.feedList.find(feed => feed.name == el.name)) continue;
                rss.feedList.push(new RSSItem(lastId++, el.name, el.downloadPercent, el.downloadUrl, elem.created*1000, el.size));
            }
        }
    }
    rss.feedList.sort((a, b) => a.id > b.id ? -1 : 1)
    console.log(rss.getFeed())
    return rss.getFeed();
}

/** GET XML for specific RSS Item */
function getRSSItem(id) {
    let result = rss.feedList.find( feed => feed.id == id);
    return rss.getItem(result);
}

module.exports = {getRSS, getRSSItem}
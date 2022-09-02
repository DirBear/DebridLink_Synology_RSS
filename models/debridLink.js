const https = require('https');
const { RSS, RSSItem } = require('./rss');

var rss = new RSS(process.env.RSS_NAME, process.env.RSS_URL, process.env.RSS_DESCRIPTION);

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
async function getRSS () {
    let items = await getDebridLinks();
    var id = 0;
    rss.feedList = [];
    for (let elem of items.value){
        if (elem.files != 0){
            for (let el of elem.files){
                if (el.downloadPercent != 100) continue;
                rss.feedList.push(new RSSItem(id++, el.name, el.downloadPercent, el.downloadUrl, elem.created*1000));
            }
        }
    }
    console.log(rss.getFeed())
    return rss.getFeed();
}
module.exports = {getRSS}

/*
    {
      "id": "2115ca3cf4356d24510",
      "name": "The name of torrent",
      "hashString": "89d03825d68c9173377b05f3f3d6e67236f7dac2",
      "uploadRatio": 1.42,
      "serverId": "seed20",
      "wait": false,
      "peersConnected": 0,
      "status": 6,
      "totalSize": 2556175746,
      "files": [
        {
          "id": "2115ca3cf4356d24510-1",
          "name": "The.file.name.ext",
          "downloadUrl": "https://seed20.debrid.link/dl/...",
          "size": 1278087873,
          "downloadPercent": 100
        },
        {
          "id": "2115ca3cf4356d24510-2",
          "name": "The.file.name.ext",
          "downloadUrl": "https://seed20.debrid.link/dl/...",
          "size": 1278087873,
          "downloadPercent": 100
        }
      ],
      "trackers": [
        {
          "announce": "http://..."
        }
      ],
      "created": 1662144667,
      "downloadPercent": 100,
      "downloadSpeed": 0,
      "uploadSpeed": 0
    }


*/
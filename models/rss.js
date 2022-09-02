const { getRFC822_Date } = require('../utils');

class RSS {
    constructor(title, link, description) {
        this.title = title;
        this.link = link;
        this.description = description;
        this.pubDate = getRFC822_Date(new Date());
        this.feedList = [];
    }

    getFeed() { 
        // Go through the array
        let string = "";
        for ( let item of this.feedList){
            string += `\n${item.getRSSFeed()}`
        }
        return '<?xml version="1.0"?>\n<rss version="2.0">' +
            '\n\t<channel>' +
            `\n\t\t<title>${this.title}</title>` +
            `\n\t\t<link>${this.link}</link>` +
            `\n\t\t<description>"${this.description}"</description>` +
            `\n\t\t\t${string}` +
            '\n\t</channel>' +
            '\n</rss>'

    }

}
class RSSItem {

    constructor(id, name, percent, link, created) {
        this.id = id;
        this.name = name.replace('&', 'et');
        this.percent = percent;
        this.link = link;
        this.date = getRFC822_Date(new Date(created));
    }

    getRSSFeed() {
        return '<item>' +
            `\n\t<title>${this.name}</title>` +
            `\n\t<link>${this.link}</link>` +
            `\n\t<description>"${this.name}"</description>` +
            `\n\t<pubDate>${this.date /*Tue, 03 Jun 2003 09:39:21 GMT*/}</pubDate>` +
            `\n\t<guid>${process.env.RSS_URL}/${this.id /*http://liftoff.msfc.nasa.gov/2003/06/03.html#item573*/}</guid>` +
            `\n</item>`;
    }


}

module.exports = {RSS, RSSItem};
// Sat, 07 Sep 2002 00:00:01 GMT
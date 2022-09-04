const { getRFC822_Date } = require('../utils');

class RSS {
    constructor(title, link, description) {
        this.title = title;
        this.link = link;
        this.description = description;
        this.pubDate = getRFC822_Date(new Date());
        this.feedList = [];
    }
    /** GET Xml for a specific item */
    getItem(item){
        if ( item == undefined) return item;        
        return '<?xml version="1.0"?>\n<rss version="2.0">' +
            '\n\t<channel>' +
            `\n\t\t<title>${this.title}</title>` +
            `\n\t\t<link>${this.link}</link>` +
            `\n\t\t<description>"${this.description}"</description>` +
            item.getRSSFeed() +
            '\n\t</channel>' +
            '\n</rss>'
    }
    /** Get all the items as RSS Feed */
    getFeed() { 
        // Go through the array
        let string = "";
        for ( let item of this.feedList){
            if (this.lastUpdate != undefined){
                if (item.created > this.lastUpdate)
                    string += `\n${item.getRSSFeed()}`;
            }
        }
        this.lastUpdate = new Date();
        return '<?xml version="1.0"?>\n<rss version="2.0">' +
            '\n\t<channel>' +
            `\n\t\t<title>${this.title}</title>` +
            `\n\t\t<link>${this.link}</link>` +
            `\n\t\t<description>"${this.description}"</description>` +
            string +
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
        this.created = new Date(created*1000);
        this.date = getRFC822_Date(this.created);
    }
    /** GET XML Feed for this item */
    getRSSFeed() {
        return '\t\t\t<item>' +
            `\n\t\t\t\t<title>${this.name}</title>` +
            `\n\t\t\t\t<link>${this.link}</link>` +
            `\n\t\t\t\t<description>"${this.name}"</description>` +
            `\n\t\t\t\t<pubDate>${this.date /*Tue, 03 Jun 2003 09:39:21 GMT*/}</pubDate>` +
            `\n\t\t\t\t<guid>${process.env.RSS_URL}/${this.id /*http://liftoff.msfc.nasa.gov/2003/06/03.html#item573*/}</guid>` +
            `\n\t\t\t</item>`;
    }


}

module.exports = {RSS, RSSItem};
// Sat, 07 Sep 2002 00:00:01 GMT

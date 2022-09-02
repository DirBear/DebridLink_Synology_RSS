# DebridLink_Synology_RSS

This is a Simple RSS script that allow downloading automatically from DebridLink 


It will generate an RSS directly from the seedbox feed of your DebridLink account

Simple use, less functionality 

## Use it in your own script

1. Create .env file with following example (also available in "envExample" file)
```
DEBRID_LINK_TOKEN=YOUR_DEBIRD_API_TOKEN
RSS_NAME=YOUR_RSS_FEED_NAME
RSS_URL=YOUR_RSS_URL_WITH_PROTOCOL_PORT_AND_PATH
RSS_DESCRIPTION=RSS_DESCRIPTION_STRING
```
2. Call the script with this (or create your own way to do this)
```
var rss = require('../models/debridLink');
var xmlRSS = await rss.getRSS(); // Return the XML RSS Feed
```

## Use it as it
You can also just use as it and create the .env file. 

1. Clone the repo 
```
git clone https://github.com/DirBear/DebridLink_Synology_RSS.git
```
2. Create the .env file (use nano, vi, emacs... anything you want)
```
nano .env
```
3. Paste the content of envExample with your updates
4. Run the following command
```
npm install; node bin/www
```
(To run in background
```
nohup node bin/www &
```
It will create a nohup.out file where all logs will be stored)

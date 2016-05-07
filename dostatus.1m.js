#!/usr/local/bin/node
 // <bitbar.title>DigitalOcean Status</bitbar.title>
// <bitbar.version>v1.0</bitbar.version>
// <bitbar.author>Maxime Cattet</bitbar.author>
// <bitbar.author.github>johnoppenheimer</bitbar.author.github>
// <bitbar.desc>Plugin that check the status of your digital ocean droplets.</bitbar.desc>
// <bitbar.image>http://www.hosted-somewhere/pluginimage</bitbar.image>
// <bitbar.dependencies>node</bitbar.dependencies>
// <bitbar.abouturl>http://url-to-about.com/</bitbar.abouturl>
var bitbar = require('bitbar');
var request = require('request');
var async = require('async');

const APIKeys = [
];

const FONT = 'UbuntuMono-Regular';

//color
const COLOR_GREY = '#848484';
const COLOR_RED = '#ff3d38';
const COLOR_GREEN = '#31B404';
const COLOR_BLUE = '#0000FF';
const COLOR_WHITE = '#FFFFFF';

var arrayBitbar = [{
        text: '☁︎',
        color: bitbar.darkMode ? 'white' : 'red',
        dropdown: false
    }
];

async.mapSeries(APIKeys,
    function(key, callback) {
        request.get('https://api.digitalocean.com/v2/droplets', {
            headers: {
                'Authorization': ' Bearer ' + key
            }
        }, function(err, response, body) {
            var json = JSON.parse(body);
            if (!err) {
                var droplets = [];
                for (var i = 0; i < json.droplets.length; i++) {
                    // Below, add whatever data you want from the request
                    var droplet = json.droplets[i];
                    droplets.push(bitbar.sep);
                    //Name of droplets
                    droplets.push({
                        text: droplet.locked ? '🔒' : '' + droplet.name,
                        color: colorByStatus(droplet.status),
                        font: FONT,
                        href: 'https://cloud.digitalocean.com/droplets/' + droplet.id + '/graphs'
                    });

                    //IP Address
                    droplets.push({
                        text: droplet.networks.v4[0].ip_address,
                        color: COLOR_GREY,
                        font: FONT
                    });

                    //Memory + SSD
                    droplets.push({
                        text: droplet.size.memory + 'MB ' + droplet.size.disk + 'GB',
                        color: COLOR_GREY,
                        font: FONT
                    });

                    //Region and price
                    droplets.push({
                        text: droplet.region.slug,
                        color: COLOR_GREY,
                        font: FONT
                    });
                }
                callback(null, droplets);
            } else {
                callback(err);
            }

        });
    },
    function(err, results) {
        if (!err) {
            for (var i = 0; i < results.length; i++) {
                var droplets = results[i];
                for (var j = 0; j < droplets.length; j++) {
                    arrayBitbar.push(droplets[j]);
                }
            }
        } else {
            arrayBitbar.push({
                text: err,
                color: COLOR_RED,
                font: FONT
            });
        }

        bitbar(arrayBitbar);
    }
);

function colorByStatus(status) {
    switch (status) {
        case 'active':
            return COLOR_GREEN;
        case 'off':
            return COLOR_RED;
        case 'archive':
            return COLOR_GREY;
        case 'new':
            return COLOR_BLUE;
        default:
            return COLOR_WHITE;
    }
}

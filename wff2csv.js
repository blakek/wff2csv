#!/usr/bin/env node

var fs = require('fs');
var json2csv = require('json2csv');
var kml2geojson = require('togeojson').kml;
var xmldom = new (require('xmldom').DOMParser)();

// Check that we were given a file as an argument before continuing
if (!process.argv[2] || !fs.existsSync(process.argv[2])) {
	console.log('Usage:  wff2csv.js <WiFiFoFum KML file>');
	process.exit();
}

var fieldNames = ['name', 'mac_address', 'channel', 'security', 'type', 'latitude', 'longitude', 'elevation'];
var kmlContents = xmldom.parseFromString(fs.readFileSync(process.argv[2], 'UTF-8'));
var geoJsonEntry = kml2geojson(kmlContents).features;
var hotspots = [];

/* EXAMPLE:
	{
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [
				-88.820081,
				33.453952,
				125.185833
			]
		},
		"properties": {
			"name": "moto7888",
			"description": "MAC: 0:0:49:96:2:d0<br>Channel: 6<br>MaxRssi: -74<br>Security: WPA2<br>Type: Access Point<br>FirstSeen: 2015-02-05 21:50:20 +0000<br>LastSeen: 2015-02-05 21:50:55 +0000"
		}
	}
 */

geoJsonEntry.forEach(function (entry) {
	var description = entry.properties.description.split('<br>');

	hotspots.push({
		name: entry.properties.name,
		mac_address: description[0].substring(5),
		channel: description[1].substring(9),
		security: description[3].substring(10),
		type: description[4].substring(6),
		longitude: entry.geometry.coordinates[0],
		latitude: entry.geometry.coordinates[1],
		elevation: entry.geometry.coordinates[2]
	});
});

json2csv({data: hotspots, fields: fieldNames}, function (err, csv) {
	if (err) console.err(err);
	console.log(csv);
});

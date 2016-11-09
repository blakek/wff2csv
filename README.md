# wff2csv

> Convert WiFiFoFum KML files to CSV logs (e.g. for data visualization)

I had a homework assignment in a security class to just go wardriving and see what interesting could be found.  With an old iPhone 3GS I got got for $15, I just drove around town and collected some pretty interesting data.  However, I couldn't interact with it the way I wanted...  So, I wrote this to convert the KML-ish output to a CSV that can be used for data visualization.

## Usage

Convert the WiFiFoFum KML files to a CSV:

```bash
wff2csv WiFiFoFum_Log_586.kml > wifi.csv
```

Then, you can choose your own way of dealing with data.  For example, you can easily create a visualization using [Google My Maps](https://www.google.com/mymaps):

![Example screenshot](https://raw.githubusercontent.com/blakek/wff2csv/master/example.png)

## API

If you want to write a different conversion (e.g. to JSON), there is a separate `wffParser.js` file you can take advantage of.

Parse a WFF KML file:

```js
// parser is installed with wff2csv
const wffParser = require('wff2csv/wffParser')

const wifiData = wffParser
  .parseFile('WiFiFoFum_Log_586.kml')
  .then(data => console.log(data))
```

## Install

With [npm](https://npmjs.org/) installed:

Install for system-wide usage:

```bash
$ npm install -g wff2csvf
```

Install for API/parser usage:

```bash
$ npm install --save wff2csvf
```

## License

MPL-2.0

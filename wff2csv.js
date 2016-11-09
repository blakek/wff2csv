const fieldNames = require('./config').fieldNames
const fs = require('fs')
const json2csv = require('json2csv')
const wffParser = require('./wffParser')

const inputFile = process.argv[2]

// Check that we were given a file as an argument before continuing
if (!inputFile || !fs.existsSync(inputFile)) {
  console.log('Usage: wff2csv <WiFiFoFum KML file>')
  process.exit(1)
}

wffParser
  .parseFile(inputFile)
  .then(hotspots => json2csv({
    data: hotspots,
    fields: fieldNames
  }))
  .then(csv => console.log(csv))
  .catch(error => console.error(error))

const pify = require('pify')
const parseXMLString = pify(require('xml2js').parseString)
const readFile = pify(require('fs').readFile)

function parseFile (filename) {
  return new Promise((resolve, reject) => {
    readFile(filename)
      .then(xmlString => parseXMLString(xmlString))
      .then(kmlJSON => kmlJSON.kml.Document[0].Placemark)
      .then(data => data.map(dataPoint => {
        const description = dataPoint.description[0].split('<br>')
        const coordinates = dataPoint.Point[0].coordinates[0].split(',')

        return {
          essid: dataPoint.name[0],
          macAddress: description[0].slice(5),
          channel: description[1].slice(9),
          security: description[3].slice(10),
          type: description[4].slice(6),
          longitude: coordinates[0],
          latitude: coordinates[1],
          elevation: coordinates[2]
        }
      }))
      .then(resolve)
      .catch(reject)
  })
}

module.exports = {
  parseFile
}

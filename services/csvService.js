const fs = require('fs');
const json2csv = require('@json2csv/plainjs');

function saveAsCSV(data, outputPath) {
  const parser = new json2csv.Parser(); // ✅ Correct access
  const csv = parser.parse(data);
  fs.writeFileSync(outputPath, csv);
}

module.exports = { saveAsCSV };

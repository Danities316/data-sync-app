
const fs = require('fs');
const path = './lastRunTimestamps.json';

function loadTimestamps() {
  if (!fs.existsSync(path)) return {};
  return JSON.parse(fs.readFileSync(path));
}

function updateTimestamp(queryName, timestamp) {
  const data = loadTimestamps();
  data[queryName] = timestamp;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function getLastRun(queryName) {
  const data = loadTimestamps();
  return data[queryName] || '1970-01-01T00:00:00Z';
}

module.exports = { getLastRun, updateTimestamp };

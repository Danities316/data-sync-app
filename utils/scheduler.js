
const cron = require('node-cron');

function scheduleTask(cronTime, task) {
  cron.schedule(cronTime, task);
}

module.exports = { scheduleTask };


const fs = require('fs');
const yaml = require('js-yaml');
const { executeQuery } = require('./services/dbService');
const { saveAsCSV } = require('./services/csvService');
const { sendToAPI } = require('./services/apiService');
const { getLastRun, updateTimestamp } = require('./services/timestampService');
const { scheduleTask } = require('./utils/scheduler');

const config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));

async function runJob() {
  const { dsn, user, password } = config.database;


  for (const q of config.queries) {
    const lastRun = getLastRun(q.name);
    const data = await executeQuery(dsn, user, password, q.sql, lastRun);
    if (data.length === 0) {
      console.log(`[${new Date().toISOString()}] No new data for query: ${q.name}`);
      continue;
    }
    saveAsCSV(data, q.output);
    await sendToAPI(q.output, q.apiEndpoint, config.api.key);
    updateTimestamp(q.name, new Date().toISOString());
  }

  console.log(`[${new Date().toISOString()}] All tasks completed.`);
}


scheduleTask(config.schedule.cron, runJob);

runJob().catch(err => {
  console.error(`[${new Date().toISOString()}] Error running job:`, err);
});

// module.exports = { runJob };
// This module exports the runJob function, which can be used for testing or manual execution.

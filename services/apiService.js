
const axios = require('axios');
const fs = require('fs');

async function sendToAPI(filePath, url, apiKey) {
  const file = fs.readFileSync(filePath);
  const response = await axios.post(url, file, {
    headers: {
      'Content-Type': 'text/csv',
      'Authorization': `Bearer ${apiKey}`
    }
  });
  return response.data;
}

module.exports = { sendToAPI };

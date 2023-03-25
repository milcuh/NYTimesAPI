const fs = require('fs');

const saveSearchHistory = async (command, query) => {
  try {
    const now = new Date();
    const search = {
      command,
      query,
      timestamp: now.toISOString(),
    };
    const data = JSON.stringify(search);
    fs.appendFileSync('search-history.json', data + '\n');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  saveSearchHistory,
};

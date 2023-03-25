const inquirer = require('inquirer');
const api = require('newyorktimesjs-api');

const _print = (article) => {
  console.log(`Title: ${article.title}`);
  console.log(`URL: ${article.url}`);
  console.log(`Abstract: ${article.abstract}`);
  console.log(`Byline: ${article.byline}`);
  console.log(`Date: ${article.date}`);
};

const _selectPrompt = async (articles) => {
  const choices = articles.map((article) => ({
    name: article.title,
    value: article,
  }));

  return inquirer.prompt({
    type: 'list',
    name: 'article',
    message: 'Choose article:',
    choices: choices,
  });
};

const _main = async (arg) => {
  try {
    // Get search results.
    const results = await api.search(arg);

    // Send it.
    const selection = await _selectPrompt(results);

    // Print the article data.
    _print(selection.article);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  _main,
};
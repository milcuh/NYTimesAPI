#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const { searchArticles, getArticleDetails } = require('./api');
const { saveSearchHistory } = require('./history');

// Define CLI commands and options
program
  .name('nyt-cli')
  .description('Search for articles in the New York Times')
  .command('search [query]')
  .description('Search for articles by keyword')
  .option('-p, --page <number>', 'Page number of results', 0)
  .action(async (query, options) => {
    try {
      // Search for articles
      const { results } = await searchArticles(query, options.page);

      // Display search results to user
      const articles = results.map((article) => ({
        name: article.title,
        value: article,
      }));
      const { article } = await inquirer.prompt([
        {
          type: 'list',
          name: 'article',
          message: 'Select an article to view details:',
          choices: articles,
        },
      ]);

      // Get article details
      const details = await getArticleDetails(article);

      // Save search history
      await saveSearchHistory(query, results.length);

      // Display article details to user
      console.log(details.abstract);
      console.log(`URL: ${details.web_url}`);
      console.log(`Byline: ${details.byline.original}`);
      console.log(`Published on: ${details.pub_date}`);
    } catch (error) {
      console.error(error.message);
    }
  });

// Display help menu if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  program.parse(process.argv);
}
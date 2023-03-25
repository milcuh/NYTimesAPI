const superagent = require('superagent');

const NYT_API_KEY = 'qJH6hLPUJI04pqZiwVV1AyieT0h3273S';

function search(q, page = 0, itemsPerPage = 10) {
  return superagent
    .get('https://api.nytimes.com/svc/search/v2/articlesearch.json')
    .query({
      'api-key': NYT_API_KEY,
      q,
      page,
      'page-size': itemsPerPage,
    })
    .then((res) => {
      return res.body.response.docs.map((doc) => {
        return {
          title: doc.headline.main,
          url: doc.web_url,
          abstract: doc.abstract,
          byline: doc.byline.original,
          date: doc.pub_date,
        };
      });
    });
}

module.exports = {
  search,
};
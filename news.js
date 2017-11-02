var newsApi = require('./auth.json');
//const request = require('https');
const fs = require('fs');
//Class Constructor
function News(){};

//gets news sources
//Currently retrieves only english sources
//Currently retrieves USA sources
News.prototype.getSources = function (category, language, country)
{
  var requestURL = newsApi.News.sources+'?';
  var result = [];
  requestURL = requestURL.concat(((category==null || category=='') ? '' : 'category='+category+'&'));
  requestURL = requestURL.concat(((language==null || language=='') ? '' : 'language='+language+'&'));
  requestURL = requestURL.concat(((country==null || country=='') ? '' : 'country='+country+'&'));
  requestURL = requestURL.concat('apiKey='+newsApi.News.token);
  var request = require('request');
  request.get(requestURL, (err, resp, body) => {
    let json = JSON.parse(body);
    for(var i in json.sources)
    {
      //console.log(json.sources[i].id);
      result.push(json.sources[i].id);
    }
  });
  console.log("Result: " + result.length);
  return result;
};

module.exports = News;

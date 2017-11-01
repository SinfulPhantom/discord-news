var newsApi = require('./auth.json');
const request = require('request');
const fs = require('fs');
//Class Constructor
function News(){};

//gets news sources
//Currently retrieves only english sources
//Currently retrieves USA sources
News.prototype.getSources = function (category)
{
  var requestURL = '';
  var result = '';
  if(typeof category == 'undefined' || category == '')
  {
    requestURL = newsApi.News.sources+'?language=en&country=us' + '&apiKey=' + newsApi.News.token;
  }
  else
  {
    requestURL = newsApi.News.sources+'?category='+category+ '?language=en&country=usa' +'&apiKey='+newsApi.News.token;
  }
  console.log('Request URL: '+requestURL);
  var response = request(requestURL,{json:true}, (error,response,body) =>
  {
    if(error)
    {
      return "Unable to retrieve news sources at this time.. Sorry!";
    }
    else
    {
      fs.writeFile('response.txt', response.body.sources);
      return response;
    }
  });
  for(var index in response)
  {
    console.log(response[index]);
  }
  return result;
};

module.exports = News;

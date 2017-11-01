var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var News = require('./news.js');

//configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

//initialize Bot
var bot = new Discord.Client({
  token: auth.Discord.token,
  autorun: true
});

var news = new News()

bot.on('ready', function(evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function(user, userID, channelID, message, event) {
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch (cmd) {
      case 'sources':
        var category;
        if (args.length > 1) {
          category = args[1];
        }
        var response = news.getSources(category);
        console.log(response);
        bot.sendMessage({to: channelID, message: response});
        break;

      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: "PONG!"
        });
        break;
    }
  }
});

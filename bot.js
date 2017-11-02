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
        var category = args[0];
        var language = args[1];
        var country = args[2];
        var sources = news.getSources(category, language, country);
        var output = '';
        sources.forEach(function(item, index, array)
        {
          output = output.concat(item + '\n');
        });
        bot.sendMessage({to: channelID, message: output});
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

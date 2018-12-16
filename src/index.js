
const { AttachmentLayoutTypes, ActivityTypes, CardFactory } = require('botbuilder');

var builder = require('botbuilder');

var restify = require('restify');
var server = restify.createServer();

var robo = require('../src/robo.js');


server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s Aplicação esta executando na porta %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector);

bot.dialog('/', [

    (session, results) => {
        session.send(`Olá! Em que posso te ajudar ?`);
    }

]);




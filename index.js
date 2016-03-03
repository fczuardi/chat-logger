var telegram = require('telegram-bot-api');

var api = new telegram({
        token: process.env.TELEGRAM_KEY,
        updates: {
            enabled: true
        }
});

api.getMe()
.then(function(data)
{
    console.log(data);
})
.catch(function(err)
{
    console.log(err);
});

api.on('message', function(message)
{
    console.log(message);
});

import { v4 } from 'uuid';
import { pageHTML, DEFAULTSCRIPTS } from '../www/html';
import { messages } from '../../locales/pt/messages';
import App from '../components/ReadOnlyLog';

let title = 'Anonymous User Chat';
let pageProps = {
    lang: 'en',
    charSet: 'utf-8',
    title: title,
    stylesheets: [
        './css/chat.css'
    ],
    scripts: DEFAULTSCRIPTS
};
let anonUserId = v4();
let anonUsername = `Guest_${anonUserId.substring(0, 8)}`;

let botname = process.env.BOT_NAME || 'MyBot';
let botId = process.env.BOT_ID || v4();


let initialState = {
    messages: [
        {
            text: messages.chat.channel.empty
        },
        {
            text: messages.chat.channel.enter(botname)
        },
        {
            text: messages.chat.bot.welcome(anonUsername),
            userId: botId
        }
    ],
    users: [
        {
            userId: botId,
            username: botname
        },
        {
            userId: anonUserId,
            username: anonUsername
        }
    ]
};
console.log(pageHTML(pageProps, initialState, App));

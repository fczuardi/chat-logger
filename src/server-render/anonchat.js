import { v4 } from 'uuid';
import { pageHTML, DEFAULTSCRIPTS } from '../www/html';
import { messages } from '../../locales/pt/messages';
import App from '../components/InteractiveChat';

let title = 'Anonymous User Chat';
let pageProps = {
    lang: 'en',
    charSet: 'utf-8',
    title: title,
    stylesheets: [
        './css/chat.css'
    ],
    scripts: [
        ...DEFAULTSCRIPTS,
        './js/main.js'
    ]
};
let anonUserId = v4();
let anonUsername = `Guest_${anonUserId.substring(0, 8)}`;

let botname = process.env.BOT_NAME || 'MyBot';
let botId = process.env.BOT_ID || v4();

let anonChatId = v4();
let connectionId = v4();

let date = new Date().getTime();

let initialState = {
    messages: [
        {
            text: messages.chat.channel.enter(botname),
            chatId: anonChatId,
            userId: null,
            date: date + 1,
            provider: 'web'
        },
        {
            text: messages.chat.bot.welcome(anonUsername),
            chatId: anonChatId,
            userId: botId,
            date: date + 2,
            provider: 'web'
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
    ],
    connections: [],
    currentSession: {
        inputText: '',
        chatId: anonChatId,
        userId: anonUserId
    }
};

console.log(pageHTML(pageProps, initialState, App));

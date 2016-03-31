import { pageHTML, DEFAULTSCRIPTS } from '../www/html';
import App from '../components/InteractiveChat';
let pageProps = {
    lang: 'pt',
    charSet: 'utf-8',
    title: 'Chat session',
    stylesheets: [
        './css/chat.css'
    ],
    scripts: [
        ...DEFAULTSCRIPTS,
        './js/chat.js'
    ]
};
let initialState = {
    messages: [],
    users: [],
    currentSession: {
        chatId: null,
        userId: null
    }
}

console.log(pageHTML(pageProps, initialState, App));

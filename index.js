import telegram from 'telegram-bot-api';
import { createStore } from 'redux';
import { SETUP, GET_ME, ERROR, UPDATE } from './src/actionTypes';
import { telegramReducer } from './src/telegram-reducer';
import config from './src/config.js';

let tgBots = {};
let stores = {};

const api = new telegram({
        token: process.env.TELEGRAM_KEY,
        updates: {
            enabled: true
        }
});

config.bots.forEach( (botConfig) => {
    let botId = botConfig.id;
    let botToken = botConfig.token;
    let store = createStore(telegramReducer);
    store.dispatch({
        type: SETUP,
        id: botId,
        tgToken: botToken
    });
    let api = new telegram({
        token: botToken,
        updates: {
            enabled: true
        }
    });
    api.getMe()
        .then( (data) => {
            store.dispatch({
                type: GET_ME,
                ...data
            });
        })
        .catch( (error) => {
            store.dispatch({
                type: ERROR,
                error: error
            });
        });

    api.on('message', (message) => {
        store.dispatch({
            type: UPDATE,
            message: message
        });
    });

    store.subscribe(() => {
        console.log(
    `
    State (Bot: ${botId})
    =====
    ${JSON.stringify(store.getState(), ' ', 2)}
    `
        );
    });

    tgBots[botId] = api;
    stores[botId] = store;
});

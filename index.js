import telegram from 'telegram-bot-api';
import { createStore } from 'redux';
import { GET_ME, ERROR, UPDATE } from './src/actionTypes';
import { telegramReducer } from './src/telegram-reducer';

const store = createStore(telegramReducer);
const api = new telegram({
        token: process.env.TELEGRAM_KEY,
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
State
=====
${JSON.stringify(store.getState(), ' ', 2)}
`
    );
});

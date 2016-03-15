// # Telegram Logger Reducer
//
// A Redux-style action handler (a [reducer](http://redux.js.org/docs/basics/Reducers.html))
// for a Telegram Logger based on [Telegram Bot API](https://core.telegram.org/bots/api) actions.

import {
    SETUP_TELEGRAM,
    SETUP_AMQ,
    ADD_USER,
    ADD_MESSAGE
} from './actionTypes';

const initialState = {
    messages: [],
    connections: {},
    users: {},
    chats: {}
}

export function loggerReducer(state = initialState, action) {
    let user = {},
        chat = {},
        connection = {},
        {
            id,
            api,
            loggerId,
            provider,
            date,
            text
        } = action;
    console.log(`
Action ${action.type}
======
    `);
    switch (action.type) {
        case SETUP_TELEGRAM:
        case SETUP_AMQ:
            connection[action.id] = { id, api, loggerId };
            return {
                ...state,
                connections: Object.assign({}, state.connections, connection)
            };
        case ADD_USER:
            if (action.connectionId){
                connection[action.connectionId] = {
                    ...state.connections[action.connectionId],
                    loggerId: action.user.id
                }
            }
            user[action.user.id] = {
                ...action.user,
                'connectionId': action.connectionId
            };
            return {
                ...state,
                users: Object.assign({}, state.users, user),
                connections: Object.assign({}, state.connections, connection)
            };
        case ADD_MESSAGE:
            let chatId = action.chatId || action.chat.id,
                userId = action.userId || action.from.id;
            // @TODO separate the user and chat metadata update into different actions
            user[userId] = action.from || {};
            chat[chatId] = action.chat || {};
            return {
                ...state,
                messages: [
                    { id, date, text, loggerId, provider, chatId, userId },
                    ...state.messages
                ],
                users: Object.assign({}, state.users, user),
                chats: Object.assign({}, state.chats, chat)
            };
        default:
            return state;
    }
}

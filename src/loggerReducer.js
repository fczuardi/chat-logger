// # Telegram Logger Reducer
//
// A Redux-style action handler (a [reducer](http://redux.js.org/docs/basics/Reducers.html))
// for a Telegram Logger based on [Telegram Bot API](https://core.telegram.org/bots/api) actions.

import {
    CONNECT_TO_TELEGRAM,
    CONNECT_TO_AMQ,
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
        connection = {};
    switch (action.type) {
        case CONNECT_TO_TELEGRAM:
            connection[action.token] = {
                token: action.token,
                api: action.api
            };
            return {
                ...state,
                connections: Object.assign({}, state.connections, connection)
            };
        case CONNECT_TO_AMQ:
            console.log('CONNECT_TO_AMQ', action);
            return state;
        case ADD_USER:
            if (action.connection){
                connection[action.connection.token] = {
                    ...state.connections[action.connection.token],
                    userId: action.user.id
                }
            }
            user[action.user.id] = action.user;
            return {
                ...state,
                users: Object.assign({}, state.users, user),
                connections: Object.assign({}, state.connections, connection)
            };
        case ADD_MESSAGE:
            let {id, date, text} = action,
                chatId = action.chat.id,
                userId = action.from.id;
            let loggerId = state.connections[action.connection.token].userId;
            user[userId] = action.from;
            chat[chatId] = action.chat;
            return {
                ...state,
                messages: [
                    { id, chatId, date, text, loggerId },
                    ...state.messages
                ],
                users: Object.assign({}, state.users, user),
                chats: Object.assign({}, state.chats, chat)
            };
        default:
            return state;
    }
}

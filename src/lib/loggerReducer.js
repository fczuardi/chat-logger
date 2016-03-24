// # Telegram Logger Reducer
//
// A Redux-style action handler (a [reducer](http://redux.js.org/docs/basics/Reducers.html))
// for a Telegram Logger based on [Telegram Bot API](https://core.telegram.org/bots/api) actions.
import { findIndex } from 'lodash/fp';
import {
    SETUP_TELEGRAM,
    SETUP_AMQ,
    ADD_USER,
    ADD_MESSAGE
} from './actionTypes';

const initialState = {
    messages: [],
    connections: [],
    users: [],
    chats: [],
    currentChat: {}
}

export function loggerReducer(state = initialState, action) {
    let user = {},
        chat = {},
        connection = {},
        connectionIndex,
        userIndex,
        chatIndex,
        {
            id,
            api,
            loggerId,
            provider,
            date,
            text
        } = action;
    // console.log('ACTION', action.type);
    switch (action.type) {
        case SETUP_TELEGRAM:
        case SETUP_AMQ:
            connectionIndex = findIndex({id: action.id}, state.connections);
            connection = { id, api, loggerId };
            return {
                ...state,
                connections: [
                    ...state.connections.slice(0, connectionIndex),
                    connection,
                    ...state.connections.slice(connectionIndex + 1)
                ]
            };
        case ADD_USER:
            if (action.connectionId){
                connectionIndex = findIndex({id: action.connectionId}, state.connections);
                connection = {
                    ...state.connections[connectionIndex],
                    loggerId: action.user.id
                };
            }
            userIndex = findIndex({id: action.user.id}, state.users);
            user = {
                ...action.user,
                'connectionId': action.connectionId
            };
            return {
                ...state,
                users: [
                    ...state.users.slice(0, userIndex),
                    user,
                    ...state.users.slice(userIndex + 1)
                ],
                connections: (action.connectionId === undefined) ? state.connections : [
                    ...state.connections.slice(0, connectionIndex),
                    connection,
                    ...state.connections.slice(connectionIndex + 1)
                ]
            };
        case ADD_MESSAGE:
            let chatId = action.chatId || action.chat.id,
                userId = action.userId || action.from.id;
            // @TODO separate the user and chat metadata update into different actions
            if (action.from) {
                userIndex = findIndex({id: userId}, state.users);
                user = action.from;
            }
            if (action.chat) {
                chatIndex = findIndex({id: chatId}, state.chats);
                chat = action.chat;
            }
            return {
                ...state,
                messages: [
                    ...state.messages,
                    { id, date, text, loggerId, provider, chatId, userId }
                ],
                users: (action.from === undefined) ? state.users : [
                    ...state.users.slice(0, userIndex),
                    user,
                    ...state.users.slice(userIndex + 1)
                ],
                chats: (action.chat === undefined) ? state.chats : [
                    ...state.chats.slice(0, chatIndex),
                    chat,
                    ...state.chats.slice(chatIndex + 1)
                ]
            };
        default:
            return state;
    }
}

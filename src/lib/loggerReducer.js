// # Telegram Logger Reducer
//
// A Redux-style action handler (a [reducer](http://redux.js.org/docs/basics/Reducers.html))
// for a Telegram Logger based on [Telegram Bot API](https://core.telegram.org/bots/api) actions.
import { findIndex } from 'lodash/fp';
import {
    SETUP_TELEGRAM,
    SETUP_AMQ,
    ADD_USER,
    ADD_MESSAGE,
    CHANGE_INPUT_MESSAGE
    } from './actionTypes';

const initialState = {
    messages: [],
    connections: [],
    users: [],
    chats: [],
    currentChat: {}
}

export function loggerReducer(state = initialState, action) {
    let {
        id,
        chatId,
        userId,
        loggerId,
        connectionId,
        api,
        provider,
        date,
        text,
        user,
        chat,
        from
    } = (action.payload || {});
    let connection = {},
        connectionIndex,
        userIndex,
        chatIndex;
    switch (action.type) {
        case SETUP_TELEGRAM:
        case SETUP_AMQ:
            connectionIndex = findIndex({id: id}, state.connections);
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
            if (connectionId){
                connectionIndex = findIndex({id: connectionId}, state.connections);
                connection = {
                    ...state.connections[connectionIndex],
                    loggerId: user.id
                };
            }
            userIndex = findIndex({id: user.id}, state.users);
            user = {
                ...user,
                'connectionId': connectionId
            };
            return {
                ...state,
                users: [
                    ...state.users.slice(0, userIndex),
                    user,
                    ...state.users.slice(userIndex + 1)
                ],
                connections: (connectionId === undefined) ? state.connections : [
                    ...state.connections.slice(0, connectionIndex),
                    connection,
                    ...state.connections.slice(connectionIndex + 1)
                ]
            };
        case CHANGE_INPUT_MESSAGE:
            return {
                ...state,
                currentChat: {
                    ...state.currentChat,
                    inputText: text
                }
            };
        case ADD_MESSAGE:
            // console.log('ACTION', action, chat, chatId, from, userId);
            if (chat && chat.id){
                chatId = chat.id;
            }
            if (from && from.id){
                userId = from.id;
            }
            // @TODO separate the user and chat metadata update into different actions
            if (from) {
                userIndex = findIndex({id: userId}, state.users);
                user = from;
            }
            if (chat) {
                chatIndex = findIndex({id: chatId}, state.chats);
            }
            //@TODO this date conversion maybe belong to a middleware
            if (provider === 'telegram'){
                //telegram api uses seconds after epoch instead of miliseconds
                date = date * 1000;
            }
            return {
                ...state,
                messages: [
                    ...state.messages,
                    { id, date, text, loggerId, provider, chatId, userId }
                ],
                users: (from === undefined) ? state.users : [
                    ...state.users.slice(0, userIndex),
                    user,
                    ...state.users.slice(userIndex + 1)
                ],
                chats: (chat === undefined) ? state.chats : [
                    ...state.chats.slice(0, chatIndex),
                    chat,
                    ...state.chats.slice(chatIndex + 1)
                ]
            };
        default:
            return state;
    }
}

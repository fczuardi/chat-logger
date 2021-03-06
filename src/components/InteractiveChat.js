import { v4 } from 'uuid';
import { findIndex } from 'lodash/fp';
import { rethinkdb as r } from 'rethinkdb-websocket-client';
import { createStore, applyMiddleware  } from 'redux';
import { loggerReducer } from '../lib/loggerReducer';
import { ADD_MESSAGE, CHANGE_INPUT_MESSAGE, CHANGE_INPUT_CHAT_ID, UPDATE_SESSION_CHAT_ID } from '../lib/actionTypes';
import template from '../templates/InteractiveChat.jsx';
import {TABLES} from '../lib/rethinkdbHelpers';

const InteractiveChat = ({ initialState, middlewares, connection }) => {
    middlewares = middlewares || [];
    const store = createStore(
        loggerReducer,
        initialState,
        applyMiddleware(...middlewares)
    );


    if (connection) {
        //listen to table updates from the server
        let chatId = initialState.currentSession.chatId;
        r.table(TABLES.messages).filter(
            r.row('chatId').eq(chatId)
        ).changes().run(connection, function(err, cursor) {
            if (err) {
                console.warn(err);
                return null;
            }
            cursor.each(function(err, row) {
                if (err) {
                    console.warn(err);
                    return null;
                }
                // console.log(JSON.stringify(row.new_val, null, 2));
                if (
                    row.new_val !== undefined &&
                    findIndex({id: row.new_val.id}, store.getState().messages) === -1
                ){
                    store.dispatch({
                        type: ADD_MESSAGE,
                        payload: row.new_val
                    });
                }
            });
        });
    }

    let onSend = (ev) => {
        ev.preventDefault();
        let text = ev.target.dataset.text;
        let chatId = ev.target.dataset.chatId;
        let userId = ev.target.dataset.userId;
        store.dispatch({
            type: ADD_MESSAGE,
            payload: {
                text: text,
                chatId: chatId,
                userId: userId,
                loggerId: null,
                id: v4(),
                date: new Date().getTime(),
                provider: 'web'
            }
        });
        //@TODO replace this with a middleware?
        store.dispatch({
            type: CHANGE_INPUT_MESSAGE,
            payload: {
                text: ''
            }
        });
    }
    let onChange = (ev) => {
        ev.preventDefault();
        store.dispatch({
            type: CHANGE_INPUT_MESSAGE,
            payload: {
                text: ev.target.value
            }
        });
    }

    let onChatIdInput = (ev) => {
        ev.preventDefault();
        store.dispatch({
            type: CHANGE_INPUT_CHAT_ID,
            payload: {
                text: ev.target.value
            }
        });
    };

    let onChatChange = (ev) => {
        ev.preventDefault();
        let newId = ev.target.dataset.chatId;
        console.log('CHAT ID SUBMITTED', newId, ev.target.dataset);
        store.dispatch({
            type: UPDATE_SESSION_CHAT_ID,
            payload: {
                id: newId
            }
        });
    };

    let chatId = initialState.currentSession.chatId;

    return template({ store, onSend, onChange, chatId, onChatIdInput, onChatChange });
};
export default InteractiveChat;

import { createStore } from 'redux';
import { loggerReducer } from '../lib/loggerReducer';
import { ADD_MESSAGE, CHANGE_INPUT_MESSAGE } from '../lib/actionTypes';
import template from '../templates/InteractiveChat.jsx';

const InteractiveChat = ({ initialState }) => {
    const store = createStore(loggerReducer, initialState);
    let onSend = (ev) => {
        ev.preventDefault();
        let text = ev.target.dataset.text;
        let chatId = ev.target.dataset.chatId;
        let userId = ev.target.dataset.userId;
        store.dispatch({
            type: ADD_MESSAGE,
            text: text,
            chatId: chatId,
            userId: userId,
            date: new Date().getTime(),
            provider: 'web'
        });
        //@TODO replace this with a middleware?
        store.dispatch({
            type: CHANGE_INPUT_MESSAGE,
            text: ''
        });
    }
    let onChange = (ev) => {
        ev.preventDefault();
        store.dispatch({
            type: CHANGE_INPUT_MESSAGE,
            text: ev.target.value
        });
    }


    return template({ store, onSend, onChange });
};
export default InteractiveChat;

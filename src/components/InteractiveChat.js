import { createStore } from 'redux';
import { loggerReducer } from '../lib/loggerReducer';
import { ADD_MESSAGE } from '../lib/actionTypes';
import template from '../templates/InteractiveChat.jsx';

const InteractiveChat = ({ initialState }) => {
    const store = createStore(loggerReducer, initialState);
    let onSend = (ev) => {
        ev.preventDefault();
        let text = ev.target.dataset.text;
        let chatId = ev.target.dataset.chatId;
        let userId = ev.target.dataset.userId;
        console.log('SUBMIT', userId, ev.target.dataset);
        store.dispatch({
            type: ADD_MESSAGE,
            text: text,
            chatId: chatId,
            userId: userId,
            provider: 'web'
        });
    }
    let onChange = (ev) => {
        ev.preventDefault();
    }


    return template({ store, onSend, onChange });
};
export default InteractiveChat;

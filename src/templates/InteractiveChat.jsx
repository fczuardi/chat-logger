import React from 'react';
import { Provider } from 'react-redux';
import { ADD_MESSAGE } from '../lib/actionTypes';
import MessageListContainer from '../components/containers/MessageList.container';
import MessageInputContainer from '../components/containers/MessageInput.container';
export default function({ store, onSend, onChange, chatId }){
    return (
        <Provider store={store}>
            <div>
                <h1>{chatId}</h1>
                <MessageListContainer/>
                <MessageInputContainer
                    onSend={onSend}
                    onChange={onChange}
                />
            </div>
        </Provider>
    );
}

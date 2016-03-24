import React from 'react';
import { Provider } from 'react-redux';
import { ADD_MESSAGE } from '../lib/actionTypes';
import MessageListContainer from '../components/MessageListContainer';
import MessageInputContainer from '../components/MessageInputContainer';
export default function({ store, onSend, onChange }){
    return (
        <Provider store={store}>
            <div>
                <MessageListContainer/>
                <MessageInputContainer
                    onSend={onSend}
                    onChange={onChange}
                />
            </div>
        </Provider>
    );
}

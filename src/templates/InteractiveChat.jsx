import React from 'react';
import { Provider } from 'react-redux';
import { ADD_MESSAGE } from '../lib/actionTypes';
import MessageListContainer from '../components/containers/MessageList.container';
import MessageInputContainer from '../components/containers/MessageInput.container';
import ChangeChatFormContainer from '../components/containers/ChangeChatForm.container';
export default function({
    store,
    onSend,
    onChange,
    chatId,
    onChatIdInput,
    onChatChange
}){
    return (
        <Provider store={store}>
            <div>
                <MessageListContainer/>
                <MessageInputContainer
                    onSend={onSend}
                    onChange={onChange}
                />
                <ChangeChatFormContainer
                    onChange={onChatIdInput}
                    onSubmit={onChatChange}
                />
            </div>
        </Provider>
    );
}

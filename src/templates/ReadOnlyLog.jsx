import React from 'react';
import { Provider } from 'react-redux';
import MessageListContainer from '../components/containers/MessageList.container';
export default function({ store }){
    return (
        <Provider store={store}>
            <MessageListContainer />
        </Provider>
    );
}

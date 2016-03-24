import React from 'react';
import { Provider } from 'react-redux';
import MessageListContainer from '../components/MessageListContainer';
export default function({ store }){
    return (
        <Provider store={store}>
            <MessageListContainer />
        </Provider>
    );
}

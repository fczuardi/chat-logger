import React from 'react';
import Message from '../components/Message';
export default function({ messages }){
    return (
        <ul>
            {messages.map( ({ text }, key) => (
                <Message text={text} key={key} />
            ))}
        </ul>
    )
}

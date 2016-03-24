import { find } from 'lodash/fp';
import React from 'react';
import Message from '../components/Message';
export default function({ messages, users }){
    return (
        <ul>
            {messages.map( ({ text, userId }, key) => {
                let user = find({userId: userId}, users);
                let author = user ? user.username : null;
                return (
                    <Message text={text} author={author} key={key} />
                );
            })}
        </ul>
    )
}

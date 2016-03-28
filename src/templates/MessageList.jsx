import { find } from 'lodash/fp';
import React from 'react';
import Message from '../components/Message';
export default function({ messages, users }){
    return (
        <ul>
            {messages.map( ({ text, userId, id, date }, key) => {
                let user = find({userId: userId}, users);
                let author = user ? user.username : null;
                return (
                    <li key={id || date || key}>
                        <Message text={text} author={author} />
                    </li>
                );
            })}
        </ul>
    )
}

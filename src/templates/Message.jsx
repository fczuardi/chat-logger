import React from 'react';
export default function({ text, author }){
    return (
        <li className="chat-entry">
            <span className="chat-user">{author}</span>
            <span className="chat-message">{text}</span>
        </li>
    );
}

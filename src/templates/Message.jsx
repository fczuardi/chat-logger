import React from 'react';
export default function({ text, author }){
    return (
        <div className="chat-entry">
            <span className="chat-user">{author}</span>
            <span className="chat-message">{text}</span>
        </div>
    );
}

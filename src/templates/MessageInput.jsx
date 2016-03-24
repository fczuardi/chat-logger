import React from 'react';
export default function({
    placeholder,
    submitLabel,
    text,
    chatId,
    userId,
    onChange,
    onSend
}){
    return (
        <form
            onSubmit={onSend}
            data-text={text}
            data-chat-id={chatId}
            data-user-id={userId}
        >
            <input
                type="text"
                placeholder={placeholder}
                value={text}
                onChange={onChange}
            />
            <input
                type="submit"
                value={submitLabel}
            />
        </form>
    );
}

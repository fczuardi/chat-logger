import React from 'react';
export default function({onChange, onSubmit, text}){
    return (
        <form
            onSubmit={onSubmit}
            data-chat-id={text}
        >
            <input
                name={'chatId'}
                type={'text'}
                placeholder={'chatId here'}
                onChange={onChange}
                value={text}
            />
            <input type={'submit'} />
        </form>
    );
};

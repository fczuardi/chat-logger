// # Telegram Reducer
//
// A Redux-style action handler (a [reducer](http://redux.js.org/docs/basics/Reducers.html))
// for [Telegram Bot API](https://core.telegram.org/bots/api) actions.

export const defaultState = {
    botToken: process.env.TELEGRAM_KEY,
    botId: null,
    botFirstName: null,
    botLastName: null,
    botUsername: null,
    messages: [],
    errors: []
};

export function telegramReducer(state = defaultState, action) {
    switch (action.type) {
        case 'GET_ME':
            return {
                ...state,
                botId: action.id,
                botFirstName: action.first_name,
                botLastName: action.last_name,
                botUsername: action.username
            };
        case 'ERROR':
            return {
                ...state,
                errors: [
                    action.error,
                    ...state.errors
                ]
            };
        case 'UPDATE':
            return {
                ...state,
                messages: [
                    action.message,
                    ...state.messages
                ]
            };
        default:
            return state;
    }
};

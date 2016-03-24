const messages = {
    chat: {
        bot: {
            welcome: username => `Olá ${username}!`
        },
        channel: {
            enter: username => `${username} entrou na sala.`,
            empty: 'este canal ainda não possui mensagens'
        }
    }
}
export { messages };

// # References
// ## send text input placeholder
//  - Telegram (android): 'Message'
//  - Telegram (desktop): 'Message…'
//  - Signal (android): 'Send Signal message'
//  - Signal (desktop): 'Send a message'
//  - FB Messenger: 'Type a message…'
//  - Whatsapp: 'Type a message'
//  - Slack: 'Message #general'
//  - Twitter: 'What's happening'
//  - Snapchat: 'Send a chat'

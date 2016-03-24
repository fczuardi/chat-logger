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

// Generates a config object based on Environment variables

function generateConfig(tokens, ids){
    let botKeys = tokens.split(' ') || [];
    let botIds = ids ? (ids.split(' ') || []) : null;
    if (botKeys.length === 0){
        throw ('At least one Telegram Token is required');
    }
    if (!botIds || botIds.length !== botKeys.length){
        botIds = botKeys.map( (value, index) => index );
    }
    return {
        bots: botIds.map( (value, index) => ({
            id: value,
            token: botKeys[index]
        }))
    };
}

let defaultConfig = generateConfig(process.env.TELEGRAM_KEY, process.env.BOT_ID);

export var generateConfig = generateConfig;
export default defaultConfig;

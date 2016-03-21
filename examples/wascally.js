// # RabbitMQ example: Listen to a fanout exchange

import { createStore } from 'redux';

// import { loggerReducer, debugState } from 'chat-logger';
// import { startRelay as startRabbitRelay } from 'chat-logger';
// import { connect as connectToRabbit } from 'chat-logger';
import { loggerReducer } from '../src/lib/loggerReducer';
import { debugState } from '../src/lib/debug';
import { startRelay as startRabbitRelay } from '../src/lib/wascallyHelpers';
import { connect as connectToRabbit } from '../src/lib/wascallyHelpers';

let urls = process.env.AMQ_URL ? process.env.AMQ_URL.split(' ') : [''];
let fanoutExchanges = process.env.AMQ_EXCHANGE_NAME ?
                        process.env.AMQ_EXCHANGE_NAME.split(' ') : ['logs'];
let store = createStore(loggerReducer);
store.subscribe(() => { debugState(store); });
urls.forEach( (url) => {
    connectToRabbit(url, fanoutExchanges, store).then( (connection) => {
        console.log('Connected to ', connection.id);
        startRabbitRelay(url, store);
    }, console.warn);
});

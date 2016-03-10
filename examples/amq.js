import util from 'util';
import { createStore } from 'redux';
import { loggerReducer } from '../src/loggerReducer';
import { connect as connectToRabbit} from '../src/amqHelpers';

let urls = process.env.AMQ_URL ? process.env.AMQ_URL.split(' ') : [''];
let store = createStore(loggerReducer);
store.subscribe(() => {
    console.log(
`
State
=====
${util.inspect(store.getState())}
`
    );
});

urls.forEach( (url) => {
    let connectionPromise = connectToRabbit(url, store);
});

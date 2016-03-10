import util from 'util';
import { createStore } from 'redux';
import { loggerReducer } from '../src/loggerReducer';
import { connectAndDispatch as connectToRabbit} from '../src/amqHelpers';

let url = process.env.AMQ_URL;
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

connectToRabbit(url, store);

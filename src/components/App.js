import { createElement } from 'react';
import { DOM } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { loggerReducer } from '../loggerReducer';
import MessageListContainer from '../components/MessageListContainer';

const store = createStore(loggerReducer);

const App = () => (
    createElement(Provider, {'store': store},
        createElement(MessageListContainer)
    )
);
export default App;

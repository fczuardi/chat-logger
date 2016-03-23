import { createElement } from 'react';
import { DOM } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { loggerReducer } from '../lib/loggerReducer';
import MessageListContainer from '../components/MessageListContainer';


const App = (props) => {
    const store = createStore(loggerReducer, props.initialState);
    return (
        createElement(Provider, {'store': store},
            createElement(MessageListContainer)
        )
    )
};
export default App;

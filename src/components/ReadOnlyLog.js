import { createElement } from 'react';
import { DOM } from 'react';
import { createStore } from 'redux';
import { loggerReducer } from '../lib/loggerReducer';
import template from '../templates/ReadOnlyLog.jsx';

const App = ({ initialState }) => {
    const store = createStore(loggerReducer, initialState);
    return template({ store });
};
export default App;

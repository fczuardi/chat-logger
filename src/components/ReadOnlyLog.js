import { createStore } from 'redux';
import { loggerReducer } from '../lib/loggerReducer';
import template from '../templates/ReadOnlyLog.jsx';

const ReadOnlyLog = ({ initialState }) => {
    const store = createStore(loggerReducer, initialState);
    return template({ store });
};
export default ReadOnlyLog;

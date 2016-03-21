import { createElement } from 'react';
import { DOM } from 'react';
import MessageListContainer from '../components/MessageListContainer';

const App = () => DOM.div({id: 'main-app'},
    createElement(MessageListContainer)
);
export default App;

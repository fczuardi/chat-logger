import { PropTypes } from 'react'
import template from '../templates/MessageList.jsx';
import { messageType } from './Message';

const MessageList = (p) => template(p);

const messageListType  = {
    messages: PropTypes.arrayOf(PropTypes.shape(messageType)).isRequired
}

MessageList.propTypes = messageListType;

export { messageListType };
export default MessageList;

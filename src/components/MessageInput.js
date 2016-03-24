import { PropTypes } from 'react'
import template from '../templates/MessageInput.jsx';

const MessageInput = (p) => template(p);

const messageInputType  = {
    submitLabel: PropTypes.string,
    placeholder: PropTypes.string,
    text: PropTypes.string,
    userId: PropTypes.string,
    chatId: PropTypes.string,
    onSend: PropTypes.func,
    onChange: PropTypes.func,
};


const defaultProps = {
    submitLabel: 'Send',
    placeholder: 'Message…'
}

MessageInput.propTypes = messageInputType;
MessageInput.defaultProps = defaultProps;

export { messageInputType };
export default MessageInput;

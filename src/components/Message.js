import { PropTypes } from 'react'
import template from '../templates/Message.jsx';

const Message = (p) => template(p);

const messageType  = {
  text: PropTypes.string.isRequired
};

Message.propTypes = messageType;

export { messageType };
export default Message;

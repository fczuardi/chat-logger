import { PropTypes } from 'react'
import template from '../templates/Message.jsx';

const Message = (p) => template(p);

const messageType  = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string
};

Message.propTypes = messageType;

export { messageType };
export default Message;

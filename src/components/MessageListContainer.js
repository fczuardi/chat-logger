import { connect } from 'react-redux'
import MessageList from '../components/MessageList';

const mapStateToProps = ({ messages }) => ({ messages });

const MessageListContainer = connect(mapStateToProps, null)(MessageList);

export default MessageListContainer;

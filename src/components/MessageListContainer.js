import { connect } from 'react-redux'
import MessageList from '../components/MessageList';

const mapStateToProps = ({ messages, users }) => ({ messages, users });

const MessageListContainer = connect(mapStateToProps, null)(MessageList);

export default MessageListContainer;

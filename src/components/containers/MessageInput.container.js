import { connect } from 'react-redux'
import MessageInput from '../MessageInput';

const mapStateToProps = (state) => ({
    text: state.currentSession.inputText,
    chatId: state.currentSession.chatId,
    userId: state.currentSession.userId
});

const MessageInputContainer = connect(mapStateToProps, null)(MessageInput);

export default MessageInputContainer;

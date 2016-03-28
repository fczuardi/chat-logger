import { connect } from 'react-redux'
import MessageInput from '../MessageInput';

const mapStateToProps = (state) => ({
    text: state.currentChat.inputText,
    chatId: state.currentChat.id,
    userId: state.currentUser.id
});

const MessageInputContainer = connect(mapStateToProps, null)(MessageInput);

export default MessageInputContainer;

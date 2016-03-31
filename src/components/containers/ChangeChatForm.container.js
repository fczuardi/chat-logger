import { connect } from 'react-redux'
import ChangeChatForm from '../../templates/ChangeChatForm.jsx';

const mapStateToProps = (state) => ({
    text: state.currentSession.sessionConfigForm.chatIdInput
});

const ChangeChatFormContainer = connect(mapStateToProps, null)(ChangeChatForm);

export default ChangeChatFormContainer;

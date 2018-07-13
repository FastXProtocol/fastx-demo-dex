import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import {
    Container,
    Icon,
    Message
} from 'semantic-ui-react';

import * as modalActions from '../actions/modal';

class FlashMessage extends Component {
    render () {
        let html;
        if(this.props.isOpen){
            html = <Message warning onDismiss={this.props.flashMsgClose}>
            <Icon name='warning sign' />
            {this.props.msgDesc}
            </Message>
        }

        return (
            <Container style={{ marginTop: '5em' }}>{ html }</Container>
        );
    };
}

function mapStateToProps(state){
    return {
        isOpen: state.modal.isOpen,
        msgDesc: state.modal.msgDesc,
        msgType: state.modal.msgType
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(modalActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FlashMessage)

import React, { Component } from 'react';
import {  Button, Modal } from 'semantic-ui-react';

class tipModal extends Component {
    render() {

      return (
        <Modal size={this.props.small||'small'} open={this.props.open} onClose={this.props.close} desc={this.props.content}>
          <Modal.Header>提示</Modal.Header>
          <Modal.Content>
            <p>{this.props.desc}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this.props.close}>确定</Button>
          </Modal.Actions>
        </Modal>
      )
    };
}

export default tipModal
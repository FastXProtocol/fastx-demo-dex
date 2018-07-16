import React, { Component } from 'react';
import { Button, Header, Icon, Input, Modal, Message } from 'semantic-ui-react';

class RestoreWalletModal extends Component {
    render() {
        const {
            isShowRestoreWallet,
            userSeed,
            userPassword,
            restoreWalletError,
            onChangeUserSeed,
            onChangeUserPassword,
            onRestoreWalletCancel,
            onRestoreWalletFromSeed,
        } = this.props

      return (
        <Modal size={this.props.small||'small'} open={isShowRestoreWallet} onClose={onRestoreWalletCancel}>
          <Modal.Header>Restore Wallet</Modal.Header>
          <Modal.Content style={{textAlign: 'center'}}>
              <Header as='h4' textAlign='center'>{`HDPathString m/44'/60'/0'/0 is used for address generation`}</Header>
              <div style={{marginBottom:'10px'}}><Input type='text' fluid placeholder='Enter seed' onChange={ (e, target) => this.props.onChangeUserSeed(e, target) } value={userSeed}/></div>
              <div><Input type='text' fluid placeholder='Enter password for keystore encryption' onChange={ (e, target) => this.props.onChangeUserPassword(e, target) } value={userPassword}/></div>
          </Modal.Content>
          <Modal.Actions>
          {restoreWalletError}
            <Button color='teal' onClick={onRestoreWalletFromSeed}>恢复</Button>
            <Button onClick={onRestoreWalletCancel}>取消</Button>
          </Modal.Actions>
        </Modal>
      )
    };
}

export default RestoreWalletModal

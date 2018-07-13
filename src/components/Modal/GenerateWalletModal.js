import React, { Component } from 'react';
import { Button, Icon, Modal, Message } from 'semantic-ui-react';

class GenerateWalletModal extends Component {
    render() {
        const {
            isShowGenerateWallet,
            generateWalletLoading,
            seed,
            password,
            onGenerateWallet,
            onGenerateWalletCancel,
            onGenerateKeystore,
            isShowTipMessage,
            onTipMsgCancel
        } = this.props

        let tipMsg;
        if(isShowTipMessage){
            tipMsg = <Message color='yellow' style={{color: 'grey',lineHeight: '22px'}} onDismiss={onTipMsgCancel}>
                <b style={{color: '#333',fontSize:'18px'}} >The seed is imposible to recover if lost</b><br />
                <span>Copy the generated seed to safe location.</span><br />
                <span>HDPathString: {`m/44'/60'/0'/0.`}</span><br />
                <span >Recover lost password using the seed.</span>
            </Message>
        }
      return (
        <Modal size={this.props.small||'small'} open={isShowGenerateWallet} onClose={onGenerateWalletCancel}>
          <Modal.Header>New Wallet</Modal.Header>
          <Modal.Content style={{textAlign: 'center'}}>
              {tipMsg}
              <Message color='blue' style={{color: 'grey',lineHeight: '22px'}}>
                  <span style={{color: '#333',fontSize:'16px'}} >Seed: </span><br />
                  <span>{seed}</span>
              </Message>
              <Message color='blue' style={{color: 'grey',lineHeight: '22px'}}>
                  <span style={{color: '#333',fontSize:'16px'}} >Password for browser encryption: </span><br />
                  <span>{password}</span>
              </Message>
              <Button icon circular basic onClick={onGenerateWallet}>
                <Icon name='redo alternate' loading={generateWalletLoading} />
              </Button>
          </Modal.Content>
          <Modal.Actions>
            <Button color='teal' onClick={onGenerateKeystore}>创建</Button>
            <Button onClick={onGenerateWalletCancel}>取消</Button>
          </Modal.Actions>
        </Modal>
      )
    };
}

export default GenerateWalletModal

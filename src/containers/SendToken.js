import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import React, { Component } from 'react'
import {
    Button,
    Container,
    Dimmer,
    Input,
    Loader,
    Modal,
    Select
} from 'semantic-ui-react'

import * as sendTokenActions from '../actions/sendToken'

class SendToken extends Component {
    render() {
        const {
            isShowSendToken,
            from,
            to,
            locked,
            amount,
            gasPrice,
            selectOptions,
            addressList,
            isSendComfirmationLocked,
            comfirmationLoading,
            confirmationError,
            confirmationMsg,
            sendTx,
            sendError,
            onChangeFrom,
            onChangeAmount,
            onChangeTo,
            onChangeGasPrice,
            onConfirmSendTransaction,
            onAbortTransaction,
            onSendTransaction,
            onHideSendToken,
        } = this.props

        let SendConfirmationView;
        if (comfirmationLoading)
            SendConfirmationView = <div>checking transaction....</div>

        if (confirmationError !== false)
            SendConfirmationView = <div>{confirmationError}</div>

        if (confirmationMsg !== false)
            SendConfirmationView = <div>
                <p>{confirmationMsg}</p>
                <Button color='teal' onClick={onSendTransaction} disabled={isSendComfirmationLocked} >
                  {sendError ? 'Try again' : 'Send ETH'}
                </Button>
                {' '}
                <Button basic onClick={onAbortTransaction} disabled={isSendComfirmationLocked} >
                  Back
                </Button>
            </div>

        if (sendTx !== false){
            SendConfirmationView = <div>sendTransaction Success <br /> Tx: {sendTx}</div>
        }

        return (
            <Container style={{ marginTop: '8em' }} textAlign='center'>
                <Modal size={'small'} open={isShowSendToken} onClose={onHideSendToken}>
                    <Modal.Header>Send Token</Modal.Header>
                    <Modal.Content style={{textAlign: 'center'}}>
                        <div>
                            Source:<br />
                            <Select style={{width: '340px'}} options={selectOptions} onChange={onChangeFrom} value={from} disabled={locked} />
                        </div>
                        <div style={{marginTop:'16px'}}>
                            <span>
                                Amount: <Input type='number' onChange={onChangeAmount} value={amount} step={0.1} min={0} disabled={locked} />
                            </span>
                            <span style={{marginLeft:'16px'}}>
                                Token: ETH
                            </span>
                        </div>
                        <div style={{marginTop:'16px'}}>
                            <Input style={{ width: '340px' }} placeholder="Send to address" type='text' onChange={onChangeTo} value={to}  disabled={locked} />
                        </div>
                        <div style={{marginTop:'16px'}}>
                            <p>Gas price (Gwei):</p>
                            <div>
                                <Input type='range' min={0.5} max={100} step={0.1} value={gasPrice} onChange={onChangeGasPrice} />
                                <Input type='number' min={0.5} max={100} step={0.1} value={gasPrice} onChange={onChangeGasPrice} style={{marginLeft:'16px'}} />
                            </div>
                        </div>
                        <Button style={{marginTop:'16px'}} basic onClick={onConfirmSendTransaction} disabled={locked} >
                          Create transaction
                        </Button>
                        {SendConfirmationView}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic onClick={onAbortTransaction}>Reset</Button>
                        <Button basic onClick={onHideSendToken}>Close</Button>
                    </Modal.Actions>
                </Modal>
		    </Container>
        );
    };
}

const getSelectOptions = (addressList) => {
    let keys = [];
    for(let address in addressList){
        keys.push({ value: address, text: address });
    }

    return keys;
}

const getSendStatus = (sendInProgress, sendTx) => {
    return sendInProgress != false || sendTx != false
}

function mapStateToProps(state){
    return {
        from: state.sendToken.from,
        to: state.sendToken.to,
        amount: state.sendToken.amount,
        addressList: state.wallet.addressList,
        gasPrice: state.sendToken.gasPrice,
        locked: state.sendToken.locked,
        comfirmationLoading: state.sendToken.comfirmationLoading,
        confirmationError: state.sendToken.confirmationError,
        confirmationMsg: state.sendToken.confirmationMsg,
        sendInProgress: state.sendToken.sendInProgress,
        sendError: state.sendToken.sendError,
        sendTx: state.sendToken.sendTx,
        selectOptions: getSelectOptions(state.wallet.addressList),
        getSendStatus: getSendStatus(state.sendToken.sendInProgress, state.sendToken.sendTx),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeFrom: (e, target) => {
            dispatch(sendTokenActions.changeFrom(target.value));
        },
        onChangeAmount: (e, target) => {
            dispatch(sendTokenActions.changeAmount(target.value));
        },
        onChangeTo: (e, target) => {
            dispatch(sendTokenActions.changeTo(target.value));
        },
        onChangeGasPrice: (e, target) => {
            dispatch(sendTokenActions.changeGasPrice(target.value));
        },
        onConfirmSendTransaction: () => {
            dispatch(sendTokenActions.confirmSendTransaction());
        },
        onAbortTransaction: () => {
            dispatch(sendTokenActions.abortTransaction());
        },
        onSendTransaction: () => {
            dispatch(sendTokenActions.sendTransaction());
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SendToken)

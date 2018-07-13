import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import React, { Component } from 'react'
import {
    Container
} from 'semantic-ui-react'

import SubHeader from '../components/SubHeader'
import GenerateWalletModal from '../components/Modal/GenerateWalletModal'
import * as walletActions from '../actions/wallet'

class Wallet extends Component {
    render() {
        const {
            isShowGenerateWallet,
            generateWalletLoading,
            seed,
            password,
            onGenerateWallet,
            onGenerateWalletCancel,
            onGenerateKeystore,
            onShowRestoreWallet,
            onRestoreWalletCancel,
            isShowTipMessage,
            onTipMsgCancel
        } = this.props

        const subHeaderProps = {
            onGenerateWallet,
            onShowRestoreWallet
        }

        const generateWalletProps = {
          isShowGenerateWallet,
          generateWalletLoading,
          seed,
          password,
          onGenerateWallet,
          onGenerateWalletCancel,
          onGenerateKeystore,
          isShowTipMessage,
          onTipMsgCancel
        }

        return (
            <Container style={{ marginTop: '8em' }} textAlign='center'>
                <SubHeader { ...subHeaderProps} />
                <GenerateWalletModal {...generateWalletProps} />
		    </Container>
        );
    };
}

function mapStateToProps(state){
    return {
        isShowGenerateWallet: state.wallet.isShowGenerateWallet,
        generateWalletLoading: state.wallet.generateWalletLoading,
        seed: state.wallet.seed,
        password: state.wallet.password,
        isShowTipMessage: state.wallet.isShowTipMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onGenerateWallet: () => {
          dispatch(walletActions.generateWallet())
        },
        onGenerateWalletCancel: () => {
          dispatch(walletActions.generateWalletCancel())
        },
        onShowRestoreWallet: () => {
          dispatch(walletActions.showRestoreWallet())
        },
        onRestoreWalletCancel: () => {
          dispatch(walletActions.restoreWalletCancel())
        },
        onGenerateKeystore: () => {
            dispatch(walletActions.generateKeystore())
        },
        onTipMsgCancel: () => {
            dispatch(walletActions.onTipMsgCancel())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Wallet)

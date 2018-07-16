import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import React, { Component } from 'react'
import {
    Container
} from 'semantic-ui-react'

import SubHeader from '../components/SubHeader'
import AddressView from '../components/AddressView'
import GenerateWalletModal from '../components/Modal/GenerateWalletModal'
import * as walletActions from '../actions/wallet'

class Wallet extends Component {
    componentDidMount() {
        this.props.onLoadWallet();
    }

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
            onTipMsgCancel,
            generateKeystoreLoading,
            generateKeystoreError,
            isComfirmed,
            addressList,
        } = this.props

        const subHeaderProps = {
            onGenerateWallet,
            onShowRestoreWallet,
            isComfirmed
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

        const addressViewProps = {
          generateKeystoreLoading,
          generateKeystoreError,
          isComfirmed,
          addressList,
          // addressMap,
          // tokenDecimalsMap,
          //
          // onShowSendToken,
          // onShowTokenChooser,
          //
          // onCheckBalances,
          // onGenerateAddress,
          // addressListLoading,
          // addressListError,
          // addressListMsg,
          // networkReady,
          // checkingBalanceDoneTime,
          // checkingBalances,
          // checkingBalancesError,
          // onSelectCurrency,
          // exchangeRates,
          // convertTo,
          // onGetExchangeRates,
          // getExchangeRatesDoneTime,
          // getExchangeRatesLoading,
          // getExchangeRatesError,
        };

        return (
            <Container style={{ marginTop: '8em' }} textAlign='center'>
                <SubHeader { ...subHeaderProps} />
                <GenerateWalletModal {...generateWalletProps} />
                <AddressView {...addressViewProps} />
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
        isShowTipMessage: state.wallet.isShowTipMessage,
        isComfirmed: state.wallet.isComfirmed,
        generateKeystoreLoading: state.wallet.generateKeystoreLoading,
        generateKeystoreError: state.wallet.generateKeystoreError,
        addressList: state.wallet.addressList
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
        },
        onLoadWallet: () => {
            dispatch(walletActions.loadWallet())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Wallet)

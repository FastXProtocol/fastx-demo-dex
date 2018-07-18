import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import React, { Component } from 'react'
import {
    Container
} from 'semantic-ui-react'

import SubHeader from '../components/SubHeader'
import AddressView from '../components/AddressView'
import CurAccount from '../components/CurAccount'
import SendToken from '../containers/SendToken'
import GenerateWalletModal from '../components/Modal/GenerateWalletModal'
import RestoreWalletModal from '../components/Modal/RestoreWalletModal'
import * as walletActions from '../actions/wallet'
import * as networkActions from '../actions/network'

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
            isShowTipMessage,
            generateKeystoreLoading,
            generateKeystoreError,
            isComfirmed,
            addressList,
            isShowRestoreWallet,
            userSeed,
            userPassword,
            restoreWalletError,
            networkReady,
            checkingBalances,
            checkingBalancesError,
            addressListError,
            addressListLoading,
            isShowSendToken,
            selectOptions,
            curAccount,
            onChangeUserSeed,
            onChangeUserPassword,
            onRestoreWalletCancel,
            onRestoreWalletFromSeed,
            onCloseWallet,
            onGenerateWallet,
            onGenerateWalletCancel,
            onGenerateKeystore,
            onShowRestoreWallet,
            onTipMsgCancel,
            onCheckBalances,
            onGenerateAddress,
            onLockWallet,
            onUnlockWallet,
            onShowSendToken,
            onHideSendToken,
            onChangeCurAccount
        } = this.props

        const subHeaderProps = {
            password,
            isComfirmed,
            onGenerateWallet,
            onShowRestoreWallet,
            onCloseWallet,
            onLockWallet,
            onUnlockWallet
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

        const restoreWalletModalProps = {
            isShowRestoreWallet,
            userSeed,
            userPassword,
            restoreWalletError,
            onChangeUserSeed,
            onChangeUserPassword,
            onRestoreWalletCancel,
            onRestoreWalletFromSeed,
        }

        const addressViewProps = {
            generateKeystoreLoading,
            generateKeystoreError,
            isComfirmed,
            addressList,
            networkReady,
            checkingBalances,
            checkingBalancesError,
            addressListLoading,
            addressListError,
            onCheckBalances,
            onGenerateAddress,
            onShowSendToken
        };

        const sendTokenProps = {
            isShowSendToken,
            onHideSendToken
        }

        const curAccountProps = {
            selectOptions,
            curAccount,
            isComfirmed,
            onChangeCurAccount
        }

        return (
            <Container style={{ marginTop: '8em' }} textAlign='center'>
                <SubHeader { ...subHeaderProps} />
                <GenerateWalletModal {...generateWalletProps} />
                <RestoreWalletModal {...restoreWalletModalProps} />
                <CurAccount {...curAccountProps} />
                <AddressView {...addressViewProps} />
                <SendToken {...sendTokenProps} />
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

export const getCurAccount = (fastx) => {
    return fastx.defaultAccount;
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
        addressList: state.wallet.addressList,
        selectOptions: getSelectOptions(state.wallet.addressList),
        curAccount: getCurAccount(state.app.fastx),
        isShowRestoreWallet: state.wallet.isShowRestoreWallet,
        userSeed: state.wallet.userSeed,
        userPassword: state.wallet.userPassword,
        restoreWalletError: state.wallet.restoreWalletError,
        networkReady: state.network.networkReady,
        checkingBalances: state.network.checkingBalances,
        checkingBalancesError: state.network.checkingBalancesError,
        addressListLoading: state.wallet.addressListLoading,
        addressListError: state.wallet.addressListError,
        isShowSendToken: state.wallet.isShowSendToken,
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
        },
        onChangeUserSeed: (e, target) => {
            dispatch(walletActions.changeUserSeed(target && target.value))
        },
        onChangeUserPassword: (e, target) => {
            dispatch(walletActions.changeUserPassword(target && target.value))
        },
        onRestoreWalletFromSeed: () => {
            dispatch(walletActions.restoreWalletFromSeed())
        },
        onCloseWallet: () => {
            dispatch(walletActions.closeWallet())
        },
        onCheckBalances: () => {
            dispatch(networkActions.checkBalances())
        },
        onGenerateAddress: () => {
            dispatch(walletActions.generateAddress());
        },
        onLockWallet: () => {
            dispatch(walletActions.lockWallet());
        },
        onUnlockWallet: () => {
            dispatch(walletActions.unlockWallet());
        },
        onShowSendToken: (address) => {
            dispatch(walletActions.showSendToken(address));
        },
        onHideSendToken: (address) => {
            dispatch(walletActions.hideSendToken());
        },
        onChangeCurAccount: (e, target) => {
            dispatch(walletActions.changeCurAccount(target && target.value));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Wallet)

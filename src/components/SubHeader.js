import React, { Component } from 'react';
import {
    Button,
    Container,
    Image,
    Step
} from 'semantic-ui-react';


export default class SubHeader extends Component {
    render() {
        const { password, isComfirmed, onGenerateWallet, onShowRestoreWallet, onCloseWallet, onLockWallet, onUnlockWallet } = this.props

        let lockBtn;
        if(password) {
            lockBtn = <Button primary size='big' key='1' onClick={onLockWallet}>Lock wallet</Button>
        }else{
            lockBtn = <Button primary size='big' key='1' onClick={onUnlockWallet}>Unlock wallet</Button>
        }

        const noWalletSubHeader = [
            <Button primary size='big' onClick={onGenerateWallet} key='1'>New wallet</Button>,
            <Button basic size='big' onClick={onShowRestoreWallet} key='2'>Restore wallet</Button>
        ]

        const existingWalletSubHeader =[
            lockBtn,
            <Button basic size='big' onClick={onCloseWallet} key='2'>Close wallet</Button>
        ]
        const subHeader = isComfirmed ? existingWalletSubHeader : noWalletSubHeader;
        return (
            <div>{subHeader}</div>
        );
    };
}

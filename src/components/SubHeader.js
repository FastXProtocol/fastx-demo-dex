import React, { Component } from 'react';
import {
    Button,
    Container,
    Image,
    Step
} from 'semantic-ui-react';

export default class SubHeader extends Component {
    render() {
        const { isComfirmed, onGenerateWallet, onShowRestoreWallet, onCloseWallet } = this.props
        const noWalletSubHeader = [
            <Button primary size='big' onClick={onGenerateWallet} key='1'>New wallet</Button>,
            <Button basic size='big' onClick={onShowRestoreWallet} key='2'>Restore wallet</Button>
        ]

        const existingWalletSubHeader =[
            <Button primary size='big' key='1'>Lock wallet</Button>,
            <Button basic size='big' onClick={onCloseWallet} key='2'>Close wallet</Button>
        ]
        const subHeader = isComfirmed ? existingWalletSubHeader : noWalletSubHeader;
        return (
            <div>{subHeader}</div>
        );
    };
}

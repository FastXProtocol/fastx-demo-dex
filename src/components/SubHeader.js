import React, { Component } from 'react';
import {
    Button,
    Container,
    Image,
    Step
} from 'semantic-ui-react';

export default class SubHeader extends Component {
    render() {
        const { isComfirmed, onGenerateWallet, onShowRestoreWallet } = this.props
        const noWalletSubHeader = [
            <Button primary size='big' onClick={onGenerateWallet}>New wallet</Button>,
            <Button basic size='big' onClick={onShowRestoreWallet}>Restore wallet</Button>
        ]

        const existingWalletSubHeader =[
            <Button primary size='big' >Lock wallet</Button>,
            <Button basic size='big' >Close wallet</Button>
        ]
        const subHeader = isComfirmed ? existingWalletSubHeader : noWalletSubHeader;
        return (
            <div>{subHeader}</div>
        );
    };
}

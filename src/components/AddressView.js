import React, { Component } from 'react';
import {
    Button,
    Container,
    Image,
    Step
} from 'semantic-ui-react';

import AddressTable from '../components/AddressTable'
import AddressTableFooter from '../components/AddressTableFooter'

export default class AddressView extends Component {
    render() {
        const {
            generateKeystoreLoading,
            generateKeystoreError,
            isComfirmed,
            addressList,
            networkReady,
            addressListLoading,
            addressListError,
            checkingBalances,
            checkingBalancesError,
            onCheckBalances,
            onGenerateAddress,
            onShowSendToken
        } = this.props;

        const addressTableProps = {
            addressList,
            onShowSendToken
        };

        const addressTableFooterProps = {
            networkReady,
            isComfirmed,
            checkingBalances,
            checkingBalancesError,
            addressListLoading,
            addressListError,
            onCheckBalances,
            onGenerateAddress
        }

        let addressViewContent = <div>{generateKeystoreError}</div>

        if (isComfirmed) {
            addressViewContent = [
                <AddressTable key='1' { ...addressTableProps }/>,
                <AddressTableFooter key='2' {...addressTableFooterProps} />
            ]
        }

        return (
            <div>
                { addressViewContent }
            </div>
        );
    };
}

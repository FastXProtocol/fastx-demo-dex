import React, { Component } from 'react';
import {
    Button,
    Container,
    Image,
    Step
} from 'semantic-ui-react';

import AddressTable from '../components/AddressTable'

export default class AddressView extends Component {
    render() {
        const {
            generateKeystoreLoading,
            generateKeystoreError,
            isComfirmed,
            addressList
        } = this.props;

        const addressTableProps = {
            addressList
        };

        let addressViewContent = <div>{generateKeystoreError}</div>

        if (isComfirmed) {
            addressViewContent = <AddressTable { ...addressTableProps }/>
        }

        return (
            <div>
                { addressViewContent }
            </div>
        );
    };
}

import React, { Component } from 'react';
import {
    Button,
    Container,
    Header,
    Table
} from 'semantic-ui-react';

export default class AddressTable extends Component {

    render() {
        const { addressList } = this.props
        let tableContent;
        if(addressList){
            let accounts = [];
            for( let i in addressList){
                accounts.push({
                    index: addressList[i]['index'],
                    address: i,
                    balance: addressList[i]['eth']['balance'],
                })
            }
            tableContent = accounts.map( (item, i) => {
                return (
                    <Table.Row key={i}>
                      <Table.Cell>
                        { item['index'] }
                      </Table.Cell>
                      <Table.Cell singleLine>{ item['address'] }</Table.Cell>
                      <Table.Cell>
                      eth
                      </Table.Cell>
                      <Table.Cell>
                        { item['balance'] || 'n/a' }
                      </Table.Cell>
                      <Table.Cell>
                        <a>Send</a>
                      </Table.Cell>
                    </Table.Row>
                )
            })
        }


        return (
            <Container style={{ marginTop: '2em' }} textAlign='center'>
                <Table celled padded>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Token</Table.HeaderCell>
                        <Table.HeaderCell>Balance</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      { tableContent }
                    </Table.Body>
                  </Table>
              </Container>
        );
    };
}

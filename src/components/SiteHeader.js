import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Container, Image, Menu, Label } from 'semantic-ui-react';

import * as accountActions from '../actions/account';

class SiteHeader extends Component {
    componentDidMount() {
        this.props.getAccount();
    }

    state = {}

    menuItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    };

    render () {
        const { activeItem } = this.state;
        const {toMarketplace, toAccounnt} = this.props;

        return (
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item as='a' header>
                    <Image
                        size='mini'
                        src='/logo.png'
                        style={{ marginRight: '1.5em' }}
                    />
                    FastX Dex <Label color='orange' horizontal>Rinkeby</Label>
                    </Menu.Item>
                    <Menu.Item
                        name='marketplace'
                        active={activeItem === 'marketplace'}
                        content='Marketplace'
                        onClick={() => toMarketplace()}
                    />
                    <Menu.Item
                        name='account'
                        active={activeItem === 'account'}
                        content='Account'
                        onClick={()=> toAccounnt()}
                    />
                </Container>
            </Menu>
        );
    };
};

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAccount: () => {
            dispatch(accountActions.getAccount())
        },
        toMarketplace: () => dispatch(push('/assets')),
        toAccounnt: () => dispatch(push('/account'))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteHeader)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Card, Container, Divider, Dropdown, Grid, Image, List, Menu, Segment } from 'semantic-ui-react';

class SiteHeader extends Component {
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
                    FastX Dex Demo
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
        toMarketplace: () => dispatch(push('/assets')),
        toAccounnt: () => dispatch(push('/account'))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteHeader)
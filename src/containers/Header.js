
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux'
import { Container, Image, Menu, Label, Responsive } from 'semantic-ui-react';

import SiteHeader from '../components/SiteHeader'
import NetworkMenu from '../components/NetworkMenu'
import NetworkIndicator from '../components/NetworkIndicator'

import * as accountActions from '../actions/account';
import * as headerActions from '../actions/header';
import * as networkActions from '../actions/network';

class Header extends Component{
    componentDidMount() {
        this.props.getAccount();
    }

    render () {
        const {
            activeItem,
            loading,
            error,
            blockNumber,
            toMarketplace,
            toAccounnt,
            toWallet,
            toExchange,
            availableNetworks,
            networkName,
            onLoadNetwork } = this.props;

        const networkMenuProps = {
            availableNetworks,
            networkName,
            onLoadNetwork
        };

        const networkIndicatorProps = {
            loading,
            error,
            blockNumber
        }

        let walletItem,networkMenu
        if(typeof window.Web3 === 'undefined'){
            walletItem = <Menu.Item
                name='wallet'
                active={activeItem === 'wallet'}
                content='Wallet'
                onClick={() => toWallet()}
            />
            networkMenu = [
                <NetworkIndicator {...networkIndicatorProps} key='1' />,
                <NetworkMenu {...networkMenuProps} key='2' />
            ]
        }

        return (
            <Menu fixed='top' inverted>
                <Container>
                    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                        <Menu.Item as='a' header>
                        <Image
                            size='mini'
                            src='/logo.png'
                            style={{ marginRight: '1.5em' }}
                        />
                        FastX Dex <Label color='orange' horizontal>Rinkeby</Label>
                        </Menu.Item>
                    </Responsive>
                    {walletItem}
                    <Menu.Item
                        name='exchange'
                        active={activeItem === 'exchange'}
                        content='Exchange'
                        onClick={() => toExchange()}
                    />
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
                {networkMenu}
            </Menu>
        )
    }

}

function mapStateToProps(state){
    return {
       availableNetworks: state.network.availableNetworks,
       networkName: state.network.networkName,
       loading: state.network.loading,
       error: state.network.error,
       blockNumber: state.network.blockNumber,
       activeItem: state.header.activeItem
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAccount: () => {
            dispatch(accountActions.getAccount())
        },
        toMarketplace: () => {
            dispatch(headerActions.setActiveItem('marketplace'))
            dispatch(push('/assets'))
        },
        toAccounnt: () => {
            dispatch(headerActions.setActiveItem('account'))
            dispatch(push('/account'))
        },
        toWallet: () => {
            dispatch(headerActions.setActiveItem('wallet'))
            dispatch(push('/wallet'))
        },
        toExchange: () => {
            dispatch(headerActions.setActiveItem('exchange'))
            dispatch(push('/exchange'))
        },
        onLoadNetwork: (name) => {
          dispatch(networkActions.loadNetwork(name));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

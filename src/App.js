import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
// import { Web3Provider } from 'react-web3';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './containers/Header';
import SiteFooter from './components/SiteFooter';
import Deposit from './containers/Deposit';
import AssetList from './containers/AssetList';
import AssetDetail from './containers/AssetDetail';
import AssetSell from './containers/AssetSell';
import Account from './containers/Account';
import FlashMessage from './containers/FlashMessage';
import Wallet from './containers/Wallet';

import * as walletActions from './actions/wallet'

class AppInitView extends Component {
    componentDidMount() {
        console.log(this.props)
        this.props.onLoadWallet();
    }

    render() {
        return ""
    }
}

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLoadWallet: () => {
            dispatch(walletActions.loadWallet())
        }
    }
}

const AppInit = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppInitView)

export default class App extends Component {
  render() {
    return (
        <div>
            <AppInit />
            <Header />
            <FlashMessage/>
            <Switch>
                <Route path='/account' component={Account} />
                <Route exact path='/assets' component={AssetList} />
                <Route exact path='/assets/:category/:id' component={AssetDetail} />
                <Route exact path='/assets/:category/:id/sell' component={AssetSell} />
                <Route exact path='/deposit' component={Deposit} />
                <Route exact path='/wallet' component={Wallet} />
                <Redirect path="/" to={{pathname: '/wallet'}} />
            </Switch>
            <SiteFooter />
        </div>
    );
  }
}

import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import SiteMenu from './components/SiteMenu';
import AssetList from './containers/AssetList';
import AssetDetail from './containers/AssetDetail';
import AssetSell from './containers/AssetSell';
import Account from './containers/Account';

import { Web3Provider } from 'react-web3';
import Web3 from 'web3';
import FlashMessage from './components/FlashMessage';


// If the browser has injected Web3.JS
if (window.web3 && window.web3.currentProvider) {
  // Then replace the old injected version by the local Web3.JS version 1.0.0-beta.N
  setTimeout(function(){
    window.web3 = new Web3(window.web3.currentProvider);
    console.log(window.web3.version)
  }, 0) 
}

export default class App extends Component {
  
  render() {
    return (
      <div>
        <SiteHeader />
          <FlashMessage/>
          <Web3Provider>
            <Switch>
              <Route path='/account' component={Account} />
              <Route exact path='/assets' component={AssetList} />
              <Route exact path='/assets/:category/:id' component={AssetDetail} />
              <Route exact path='/assets/:category/:id/sell' component={AssetSell} />
              {/* <Route path='/b/:hash/:name/' component={withRouter(WithBoard(BoardPage))} /> */}
              <Redirect path="/" to={{pathname: '/assets'}} />
            </Switch>
          </Web3Provider>
        <SiteFooter />
      </div>
    );
  }
}


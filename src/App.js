import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Web3Provider } from 'react-web3';

import Header from './containers/Header';
import SiteFooter from './components/SiteFooter';
import Deposit from './containers/Deposit';
import AssetList from './containers/AssetList';
import AssetDetail from './containers/AssetDetail';
import AssetSell from './containers/AssetSell';
import Account from './containers/Account';
import FlashMessage from './containers/FlashMessage';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
          <FlashMessage/>

            <Switch>
              <Route path='/account' component={Account} />
              <Route exact path='/assets' component={AssetList} />
              <Route exact path='/assets/:category/:id' component={AssetDetail} />
              <Route exact path='/assets/:category/:id/sell' component={AssetSell} />
              <Route exact path='/deposit' component={Deposit} />
              <Redirect path="/" to={{pathname: '/assets'}} />
            </Switch>

        <SiteFooter />
      </div>
    );
  }
}

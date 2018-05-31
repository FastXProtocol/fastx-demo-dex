import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import AssetList from './containers/AssetList';
import Account from './containers/Account';

export default class App extends Component {
  render() {
    return (
      <div>
        <SiteHeader />
        <Switch>
          <Route path='/account' component={Account} />
          <Route path='/assets' component={AssetList} />
          {/* <Route path='/b/:hash/:name/' component={withRouter(WithBoard(BoardPage))} /> */}
        </Switch>
        <SiteFooter />
      </div>
    );
  }
}


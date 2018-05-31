import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

import AssetList from './containers/AssetList';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' component={AssetList} />
        {/* <Route path='/b/:hash/:name/' component={withRouter(WithBoard(BoardPage))} /> */}
      </Switch>
    );
  }
}

export default App;

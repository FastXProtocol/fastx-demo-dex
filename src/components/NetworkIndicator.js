
import React, { Component } from 'react'
import { Button, Popup, Icon } from 'semantic-ui-react'

function NetworkIndicator(props) {
    const { loading, error } = props;
    let component = null;
    if (loading) {
        component = <Icon loading name='spinner' />;
    }

    if (error && error !== 'Offline') {
      component = <Popup trigger={<Icon color='red' name='close' />} position='bottom center' content={ error } />
    }

    return (
        <span>
          {component}
        </span>
    )
}

export default NetworkIndicator

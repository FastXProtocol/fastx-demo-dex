import React, { Component } from 'react';
import {
    Message,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Tab,
    Visibility,
  } from 'semantic-ui-react';

export default class FlashMessage extends Component {
    state = { visible: true }

    handleDismiss = () => {
      this.setState({ visible: false });
    }

    render () {
        if (this.state.visible) {
            return (
                <Container style={{ marginTop: '4em' }}>
                    <Message warning onDismiss={this.handleDismiss}>
                    <Icon name='warning sign' />
                    This app is running on the RINKEBY TESTNET. DO NOT use real ETH for this app!
                    </Message>
                </Container>
            );
        }
        return (<Container style={{ marginTop: '5em' }}>&nbsp;</Container>);
    };
}


import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
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

import FixedMenuLayout from '../components/Layouts/FixedMenuLayout';

export default class Account extends Component {
    render() {
        const panes = [
            { menuItem: 'My Items', render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane> },
            { menuItem: 'My Ads', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
            { menuItem: 'Bids', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
            ];
        return (
            <Container style={{ marginTop: '7em' }}>
                <Header as='h2'>
                    <Image circular src='/assets/images/avatar/large/elliot.jpg' />
                    {' '}Patrick
                </Header>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Container>
        );
    };
}

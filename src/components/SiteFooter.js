import React, { Component } from 'react';
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

export default class SiteFooter extends Component {
    render () {
        return (
            <Segment
                inverted
                vertical
                style={{ margin: '5em 0em 0em', padding: '0em 0em 5em' }}
            >
                <Container textAlign='center'>
                    <Divider inverted section />
                    <Image
                        centered
                        size='mini'
                        src='/logo.png'
                        style={{padding: '0 0 2em'}}
                    />
                    <List horizontal inverted divided link>
                        <List.Item as='a' href='#'>Site Map</List.Item>
                        <List.Item as='a' href='#'>Contact Us</List.Item>
                        <List.Item as='a' href='#'>Terms and Conditions</List.Item>
                        <List.Item as='a' href='#'>Privacy Policy</List.Item>
                    </List>
                </Container>
            </Segment>
        );
    };
}
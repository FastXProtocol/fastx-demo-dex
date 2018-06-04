import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Card,
    Divider,
    Dropdown,
    Feed,
    Grid,
    Header,
    Icon,
    Item,
    Input,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Tab,
    Visibility
  } from 'semantic-ui-react';
import { bidsOptions } from '../components/Common';
import '../components/Card.css';

const cards = _.times(3, i => (
  <Grid.Column key={i} mobile={16} tablet={8} computer={4}>
    <Card>
      <Image src='/assets/images/avatar/large/elliot.jpg' />
      <Card.Content>
        <Card.Header>
          Matthew · #7127  
        </Card.Header>
      </Card.Content>
    </Card>
  </Grid.Column>
))

export default class Account extends Component {
    render() {
        const panes = [
            { menuItem: 'My Items', render: () => <Tab.Pane attached={false}>
                <Grid>
                {cards}
                </Grid>
            </Tab.Pane> },
            { menuItem: 'My Ads', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
            { menuItem: 'Bids', render: () => <Tab.Pane attached={false}>
                <Grid>
                    <Grid.Column width={12}>
                        <Grid.Row>
                            <Grid>
                                <Grid.Column width={8}>
                                    <Dropdown selection options={bidsOptions} defaultValue={bidsOptions[0].value}/>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <p style={{ fontSize:'16px', color:'grey', lineHeight:'32px'}}>Here are your recent bids</p>
                                </Grid.Column>
                            </Grid>
                        </Grid.Row>
                        <Grid.Row>
                            <div style={{padding: '16px', textAlign:'center',boxShadow: '1px 1px 10px grey',marginTop: '1em'}}>
                                <p style={{ fontSize:'16px', color:'grey', lineHeight:'32px'}}>No bids yet.</p>
                                <Button color='teal' size='big'>Find assets you can bid on</Button>
                            </div>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <p>W-ETH Station</p>
                        <Card>
                            <Card.Content extra >
                                <Feed>
                                    <Feed.Event>
                                      <Feed.Label image='/assets/images/avatar/small/elliot.jpg' />
                                      <Feed.Content>
                                        <Feed.Date content='ETH' />
                                        <Feed.Summary>
                                          10.399
                                        </Feed.Summary>
                                      </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                            </Card.Content>
                            <Card.Content extra className="card-input" >
                                <Input placeholder='Convert to W-ETH' type="number" />
                            </Card.Content>
                            <Card.Content extra textAlign="center">
                                <a style={{ color: 'dodgerblue' }}>Upgrade <Icon name='chevron right' /></a>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                   
                    
                </Grid>
            </Tab.Pane> },
            ];
        return (
            <Container style={{ marginTop: '7em' }}>
                <Grid>
                    <Grid.Column width={12}>
                        <Item.Group>
                            <Item >
                              <Item.Image size='tiny' circular src='/assets/images/avatar/large/elliot.jpg' />
                              <Item.Content verticalAlign='bottom'>
                                <Item.Header style={{ color: 'grey', fontSize: '32px', fontWeight:'100'}} >Anonymous account</Item.Header>
                                <Item.Meta>
                                    <span style={{ marginRight: '10px'}}>0x7a0c61edd8b5c0c5c1437aeb571d7ddbf8022be4</span>
                                    <Button basic size='mini' ><Icon name='setting' />SETTINGS</Button>
                                    <Dropdown text='SHARE' icon='share alternate' floating labeled button basic className='icon dropdown-basic dropdown-mini'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item icon='linkify' text='COPY URL' />
                                            <Dropdown.Item icon='facebook f' text='share on facebook' />
                                            <Dropdown.Item icon='twitter' text='share on twitter' />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Item.Meta>
                              </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='center'>
                        <p style={{ color: 'dodgerblue', fontSize: '30px', margin: '0'}}>0 ETH</p>
                        <p style={{ color: 'grey', fontSize: '18px'}}>Balance</p>
                    </Grid.Column>
                </Grid>
                
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Container>
        );
    };
}

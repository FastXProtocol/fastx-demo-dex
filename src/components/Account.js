import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Container,
    Card,
    Divider,
    Dropdown,
    Feed,
    Form,
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
import * as accountActions from '../actions/account';
import '../components/Label.css';
import { categroyOptions } from '../components/Common';

// const cards = _.times(3, i => (
//   <Grid.Column key={i} mobile={16} tablet={8} computer={4}>
//     <Card>
//       <Image src='/assets/images/avatar/large/elliot.jpg' />
//       <Card.Content>
//         <Card.Header>
//           Matthew · #7127  
//         </Card.Header>
//       </Card.Content>
//     </Card>
//   </Grid.Column>
// ))

export default class Account extends Component {
    componentDidMount() {
        let that = this;
        
        that.props.getBalance();
        that.props.getAccount();
        // setTimeout(() => {
        //     console.log(that.props.balance)
        // }, 1000)
    }

    render() {
        let cards = this.props.items.map((item, i) => {
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
        })
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
                                          {this.props.balance}
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
            { menuItem: 'Sell', render: () => <Tab.Pane attached={false}>
                <Form>
                    <Form.Field inline>
                      <label className='align_right_label'>Date Ends</label>
                      <Input type='date' placeholder='' onChange={this.props.setSellEnd}/>
                    </Form.Field>
                    <Form.Field inline>
                        <label className='align_right_label' />
                        <p style={{color: 'grey'}}>Date when your listing will expire. Defaults to 30 days.</p>
                    </Form.Field>
                    <Form.Field inline>
                      <label className='align_right_label'>Categroy</label>
                      <Input type='text' placeholder='' onChange={this.props.setSellCategroy} />
                    </Form.Field>
                    <Form.Field inline>
                      <label className='align_right_label'>ID*</label>
                      <Input type='text' placeholder='' onChange={this.props.setSellId}/>
                    </Form.Field>
                    <Form.Field inline>
                        <label className='align_right_label' />
                        <p style={{ color: 'grey'}}>For crypto kitties this will be a number. For Moon Cats, this will be a hex code like 0x008275cc0b</p>
                    </Form.Field>
                    <Form.Field inline>
                      <label className='align_right_label'>Price*</label>
                      <Input label='ETH' type='number' placeholder='' onChange={this.props.setSellPrice} />
                    </Form.Field>
                    <Button type='submit' color='teal' style={{marginLeft:'110px'}} onClick={() => this.props.sellAsset({  end: this.props.end,
  categroy: this.props.categroy,
  sellId: this.props.sellId,
  sellPrice: this.props.sellPrice})}>Submit</Button>
                </Form>

            </Tab.Pane> },
            { menuItem: 'Deposit', render: () => <Tab.Pane attached={false}>
                <Form>
                    <Form.Field inline>
                      <label className='align_right_label'>Price*</label>
                      <Input label='ETH' type='number' placeholder='' onChange={this.props.setSellPrice} />
                    </Form.Field>
                    <Button type='submit' color='teal' style={{marginLeft:'110px'}} onClick={() => this.props.deposit(this.props.depositPrice)}>Submit</Button>
                </Form>
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
                                    <span style={{ marginRight: '10px'}}>{this.props.ownerAddress}</span>
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
                        <p style={{ color: 'dodgerblue', fontSize: '30px', margin: '0'}}>{this.props.balance} ETH</p>
                        <p style={{ color: 'grey', fontSize: '18px'}}>Balance</p>
                    </Grid.Column>
                </Grid>
                
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Container>
        );
    };
}
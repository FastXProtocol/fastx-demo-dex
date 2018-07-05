import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Container,
    Label,
    Card,
    Rail,
    Feed,
    Form,
    Grid,
    Header,
    Icon,
    Item,
    Input,
    Image,
    List,
    Loader,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Tab,
    Visibility
  } from 'semantic-ui-react';
import Asset from '../components/Asset';
import { bidsOptions } from '../components/Common';
import '../components/Card.css';
import * as accountActions from '../actions/account';
import '../components/Label.css';
import { categroyOptions } from '../components/Common';

export default class Account extends Component {
    componentDidMount() {
        this.props.getBalance();
    }

    render() {
        let cards = this.props.items.map((item, i) => {
            let url = '/assets/952ce607bd9ab82e920510b2375cbad234d28c8f/'+item.id;
            return (
                <Grid.Column key={i} mobile={16} tablet={8} computer={4} onClick={() => this.props.goto(url, this.props.currency)}>
                    <Asset image={item.image_url_cdn} name={item.name} id={item.id} />
                </Grid.Column>
            )
        })

        let loaderHtml = '';
        if(this.props.isLoading) {
            loaderHtml = <div style={{width:"100%",textAlign:'center',padding:'20px'}}><Loader active inline /></div>;
        }

        const panes = [
            { menuItem: 'My Items', render: () => <Tab.Pane attached={false}>
                <Grid>
                {loaderHtml}
                {cards}
                </Grid>
            </Tab.Pane> },
            // { menuItem: 'My Ads', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
            // { menuItem: 'Bids', render: () => <Tab.Pane attached={false}>
            //     <Grid>
            //         <Grid.Column width={12}>
            //             <Grid.Row>
            //                 <Grid>
            //                     <Grid.Column width={8}>
            //                         <Dropdown selection options={bidsOptions} defaultValue={bidsOptions[0].value}/>
            //                     </Grid.Column>
            //                     <Grid.Column width={8}>
            //                         <p style={{ fontSize:'16px', color:'grey', lineHeight:'32px'}}>Here are your recent bids</p>
            //                     </Grid.Column>
            //                 </Grid>
            //             </Grid.Row>
            //             <Grid.Row>
            //                 <div style={{padding: '16px', textAlign:'center',boxShadow: '1px 1px 10px grey',marginTop: '1em'}}>
            //                     <p style={{ fontSize:'16px', color:'grey', lineHeight:'32px'}}>No bids yet.</p>
            //                     <Button color='teal' size='big'>Find assets you can bid on</Button>
            //                 </div>
            //             </Grid.Row>
            //         </Grid.Column>
            //         <Grid.Column width={4}>
            //             <p>W-ETH Station</p>
            //             <Card>
            //                 <Card.Content extra >
            //                     <Feed>
            //                         <Feed.Event>
            //                           <Feed.Label image='/assets/images/avatar/small/elliot.jpg' />
            //                           <Feed.Content>
            //                             <Feed.Date content='ETH' />
            //                             <Feed.Summary>
            //                               {this.props.balance}
            //                             </Feed.Summary>
            //                           </Feed.Content>
            //                         </Feed.Event>
            //                     </Feed>
            //                 </Card.Content>
            //                 <Card.Content extra className="card-input" >
            //                     <Input placeholder='Convert to W-ETH' type="number" />
            //                 </Card.Content>
            //                 <Card.Content extra textAlign="center">
            //                     <a style={{ color: 'dodgerblue' }}>Upgrade <Icon name='chevron right' /></a>
            //                 </Card.Content>
            //             </Card>
            //         </Grid.Column>
                   
                    
            //     </Grid>
            // </Tab.Pane> },
            { menuItem: 'Sell', render: () => <Tab.Pane attached={false}>
                <Form>
                    <Form.Field inline>
                      <label className='align_right_label'>Date Ends</label>
                      <Input type='date' placeholder='' onChange={this.props.setSellEnd} value={this.props.end}/>
                    </Form.Field>
                    <Form.Field inline>
                        <label className='align_right_label' />
                        <p style={{color: 'grey'}}>Date when your listing will expire.</p>
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
                      <Input label='Wei' type='number' placeholder='' onChange={this.props.setDepositPrice} />
                    </Form.Field>
                    <Button type='submit' color='teal' style={{marginLeft:'110px'}} onClick={() => this.props.toDeposit(this.props.depositPrice)}>Submit</Button>
                </Form>
            </Tab.Pane> },
            ];
        return (
            <Container style={{ marginTop: '1em' }}>
                <Grid centered>
                    <Grid.Column verticalAlign='middle' width={4}>
                        <Image centered size='small' circular src='/assets/images/avatar/large/elliot.jpg' />
                        <Rail attached position='left'>
                            <Button circular floated="right" disabled={this.props.isLoading} color={this.props.currency=='FastX'?'teal':'grey'} style={{marginTop:'3em', width: 100, height: 100}} onClick={() => this.props.switching('FastX', 'WEI')}>FastX</Button>
                        </Rail>
                        <Rail attached position='right'>
                            <Button circular floated="left" disabled={this.props.isLoading} color={this.props.currency=='Ethereum'?'teal':'grey'} style={{marginTop:'3em', width: 100, height: 100}} onClick={() => this.props.switching('Ethereum', 'ETH')}>Ethereum</Button>
                        </Rail>
                    </Grid.Column>
                    <Grid.Row centered columns={8}>
                        <Grid.Column textAlign='center' width={6}>
                            <Label as='a' size='big'>Anonymous account</Label>
                            <Label as='a' basic style={{ marginTop: '1em' }}>{this.props.ownerAddress}</Label>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid>
                    <Grid.Column textAlign='center'>
                        <p style={{ fontSize: '18px', margin: '0'}}>{this.props.balance} {this.props.unit}</p>
                        <p style={{ color: 'grey', fontSize: '18px'}}>{this.props.currency}</p>
                    </Grid.Column> 
                </Grid>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Container>
        );
    };
}
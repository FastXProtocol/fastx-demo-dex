import React, { Component } from 'react';
import {
    Button,
    Container,
    Label,
    Rail,
    Form,
    Grid,
    Input,
    Image,
    Loader,
    Dropdown,
    Tab
  } from 'semantic-ui-react';
import Asset from '../components/Asset';
import '../components/Card.css';
import '../components/Label.css';
// import { tokensOptions } from '../config';

let tokensOptions = [];
export default class Account extends Component {
    componentDidMount() {
        this.props.getBalance();
        this.props.getReviewAssets();
        for(let v of this.props.receivedTokens){
            tokensOptions.push({
                key: v.symbol, text: v.symbol, value: v.symbol
            })
        }
         
    }

    render() {
        let cards = this.props.items.map((item, i) => {
            let url = '/assets/'+item.category+'/'+item.id;
            return (
                <Grid.Column key={i} mobile={16} tablet={8} computer={4} >
                    <Asset image={item.image_url_cdn} name={item.name} id={item.id} onClick={() => this.props.goto(url, this.props.currency)}
                        takeOut={() => this.props.takeOut(item.category, item.id, this.props.currency)}
                        showBtn={this.props.currency}/>
                </Grid.Column>
            )
        })

        let exCards;
        if(this.props.currency==='FastX'){
            exCards = this.props.userReviewAssets.map((item, i) => {
                let url = '/assets/'+item.category+'/'+item.id;
                return (
                    <Grid.Column key={i} mobile={16} tablet={8} computer={4} >
                        <Asset image={item.image_url_cdn} name={item.name} id={item.id} status='审核中' />
                    </Grid.Column>
                )
            })
        }

        let loaderHtml = '';
        if(this.props.isLoading) {
            loaderHtml = <div style={{width:"100%",textAlign:'center',padding:'20px'}}><Loader active inline /></div>;
        }

        let balanceHtml = "";

        for (let i in this.props.balance){
            balanceHtml += ` / ${this.props.balance[i]} ${i}`
        }
        balanceHtml = balanceHtml.slice(2)

        const panes = [
            { menuItem: 'My Items', render: () => <Tab.Pane attached={false}>
                <Grid>
                {loaderHtml}
                {this.props.isLoading?'':cards}
                {this.props.isLoading?'':exCards}
                </Grid>
            </Tab.Pane> },
            { menuItem: 'Sell', render: () => <Tab.Pane attached={false}>
                <Form>
                    <Form.Field inline>
                      <label className='align_right_label'>Date Ends</label>
                      <Input type='number' placeholder='Unit day' onChange={ (e, target) => this.props.getEndByDays(e, target) } value={this.props.days}/>
                    </Form.Field>
                    <Form.Field inline>
                        <label className='align_right_label' />
                        <p style={{color: 'grey'}}>Date when your listing will expire.</p>
                    </Form.Field>
                    <Form.Field inline>
                      <label className='align_right_label'>category</label>
                      <Input type='text' placeholder='' onChange={this.props.setSellcategory} />
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
  category: this.props.category,
  sellId: this.props.sellId,
  sellPrice: this.props.sellPrice})}>Submit</Button>
                </Form>

            </Tab.Pane> },
            { menuItem: 'Deposit', render: () => <Tab.Pane attached={false}>
                <Form>
                    <Form.Field inline>
                      <label className='align_right_label'>Price*</label>
                      <Input label={<Dropdown defaultValue='ETH' options={tokensOptions} onChange={this.props.setDepositUnit} />} type='number' placeholder='' onChange={this.props.setDepositPrice} />
                    </Form.Field>
                    <Button type='submit' color='teal' style={{marginLeft:'110px'}} onClick={() => this.props.toDeposit(this.props.depositPrice)}>Submit</Button>
                </Form>
            </Tab.Pane> },
            { menuItem: 'Withdrawal', render: () => <Tab.Pane attached={false}>
                <Form>
                    <Form.Field inline>
                      <label className='align_right_label'>Price*</label>
                      <Input label={<Dropdown defaultValue='ETH' options={tokensOptions} onChange={this.props.setWithdrawalUnit} />} type='number' placeholder='' onChange={this.props.setWithdrawalPrice} />
                    </Form.Field>
                    <Button type='submit' color='teal' style={{marginLeft:'110px'}} onClick={() => this.props.toWithdrawal(this.props.withdrawalPrice)}>Submit</Button>
                </Form>
            </Tab.Pane> },
            ];
        return (
            <Container style={{ marginTop: '1em' }}>
                <Grid centered>
                    <Grid.Row centered columns={16}>
                        <Grid.Column textAlign='center' width={5}>
                            <Button circular floated="right" disabled={this.props.isLoading} color={this.props.currency==='FastX'?'teal':'grey'} style={{marginTop:'3em', width: 100, height: 100}} onClick={() => this.props.switching('FastX', 'ETH')}>FastX</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center' width={6}>
                            <Image centered size='small' circular src='/assets/images/avatar/large/elliot.jpg' />
                        </Grid.Column>
                        <Grid.Column textAlign='center' width={5}>
                            <Button circular floated="left" disabled={this.props.isLoading} color={this.props.currency==='Ethereum'?'teal':'grey'} style={{marginTop:'3em', width: 100, height: 100}} onClick={() => this.props.switching('Ethereum', 'ETH')}>Ethereum</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid centered>
                    <Grid.Row centered columns={16}>
                        <Grid.Column textAlign='center' width={16}>
                            <div><Label as='a' size='big'>Anonymous account</Label></div>
                            <div><Label as='a' basic style={{ marginTop: '1em' }}>{this.props.ownerAddress}</Label></div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid centered>
                    <Grid.Row centered columns={16}>
                        <Grid.Column textAlign='center' width={16}>
                            <p style={{ fontSize: '18px', margin: '0'}}>
                                {balanceHtml}
                            </p>
                            <p style={{ color: 'grey', fontSize: '18px'}}>{this.props.currency}</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Container>
        );
    };
}

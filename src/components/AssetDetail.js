import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Container, Divider, Dropdown, Dimmer, Grid, Header, Image, List, Loader, Menu, Modal, Segment, Icon, Button, Feed} from 'semantic-ui-react';
import '../components/Dropdown.css';
import { chainOptions } from '../config';

export default class AssetDetail extends Component {
	
    render() {
    	const { asset, id, allPs, fillTx } = this.props;
		let auction = asset.auction?asset.auction:null, current_price;
		let sellerHtml, dateHtml;
		
		if(auction){
			//current_price = fastx.web3.utils.fromWei(ps.amount1+'', 'ether');
			//current_price = parseFloat(current_price).toFixed(4)
			current_price = fillTx.amount1;
			if(auction.seller){
				sellerHtml = <Feed>
						    <Feed.Event>
						      <Feed.Label>
						        <img src={ asset.auction.seller.profile_img_url } />
						      </Feed.Label>
						      <Feed.Content>
						        <span style={{ color: 'grey' }}>Owned by</span> <a>{ asset.auction.seller.user ? asset.auction.seller.user.username : '' }</a>
						      </Feed.Content>
						    </Feed.Event>
						</Feed>
			}

			if(fillTx.expiretimestamp){
				let diffDate = moment(fillTx.expiretimestamp*1000).diff(moment(), 'days');
				dateHtml = 'Ends in '+diffDate+' days';
				if(diffDate>30){
					diffDate = moment(fillTx.expiretimestamp*1000).diff(moment(), 'months');
					dateHtml = 'Ends in '+diffDate+' months';
				}else if(diffDate<1){
					diffDate = moment(fillTx.expiretimestamp*1000).diff(moment(), 'hours');
					dateHtml = 'Ends in '+diffDate+' hours';
				}	
			}
		}

		let loaderHtml = "";
		if(this.props.isLoading) {
			loaderHtml = <Dimmer active >
		        <Loader >Loading</Loader>
		      </Dimmer>;
		}

		let confirmBtnHtml;
		if(this.props.isOwner){
			confirmBtnHtml = <Button type='submit' color='teal' style={{marginLeft:'110px',marginTop: '2em'}} onClick={() => this.props.sellCheck(this.props.category,
					  this.props.id, this.props.hasPublished)}>Sell</Button>
		}else{
			confirmBtnHtml = <Button primary size='big' onClick={() => this.props.toTransactionStep(this.props.category, this.props.id, fillTx)}>
	    		BUY THIS ITEM
	    		<Icon name='chevron right' />
	    	</Button>
		}

        return (
            <Container style={{ marginTop: '1em' }}>
            	{loaderHtml}
            	<Modal size='small' open={this.props.modal.open} onClose={this.props.close}>
					<Modal.Header>提示</Modal.Header>
					<Modal.Content>
						<p>这件商品您已经过发布广告了</p>
					</Modal.Content>
					<Modal.Actions>
						<Button positive onClick={this.props.close}>知道了</Button>
					</Modal.Actions>
				</Modal>
            	<Grid>
				    <Grid.Column width={8}>
				      <Image src={ asset.image_url_cdn } />
				    </Grid.Column>
				    <Grid.Column width={8}>
					    <Grid.Row>
					      <Grid.Column width={8}>
					        <h2>
					        	{ asset.name }
					            <Dropdown text='SHARE' icon='share alternate' floating labeled button basic className='icon dropdown-right dropdown-basic'>
									<Dropdown.Menu>
										<Dropdown.Item icon='linkify' text='COPY URL' />
										<Dropdown.Item icon='facebook f' text='share on facebook' />
										<Dropdown.Item icon='twitter' text='share on twitter' />
									</Dropdown.Menu>
								</Dropdown>
					        </h2>
					        { sellerHtml }
							<p style={{ color: 'grey' }}>{ asset.description }</p>
					      </Grid.Column>
					      <Grid.Column width={8}>
					        <Card style={{ marginTop: '2em' }} fluid>
							    <Card.Content extra>
							    	<Icon name='clock outline' />
							    	{ dateHtml }
							    </Card.Content>
							    <Card.Content extra>
							    	<p>Listed for</p>
							    	<p style={{ color: 'black' , fontSize: '30px'}}>㆔ { current_price }</p>
							    	{ confirmBtnHtml }
							    </Card.Content>
							</Card>
					      </Grid.Column>
					    </Grid.Row>
				    </Grid.Column>
			  </Grid>
		    </Container>
        );
    };
}

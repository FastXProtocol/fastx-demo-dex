import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Icon, Button, Feed} from 'semantic-ui-react';
import '../components/Dropdown.css';
import { chainOptions } from '../config';
import '../api/plasma_js_client_dev';

const client = new window.plasmaClient.client(chainOptions);

export default class AssetDetail extends Component {
	componentWillMount() {
		this.props.getAssets();
    }
	
    render() {
    	const { assets, id } = this.props;
		let item = {}, auctions, current_price;
		let sellerHtml, dateHtml;
		for(var value of assets){
			if(value.token_id == id){
				item = value;
				break;
			}
		}
		if(item.auctions)auctions = item.auctions[0];
		if(auctions){
			current_price = client.web3.utils.fromWei(auctions.current_price, 'ether');
			current_price = parseFloat(current_price).toFixed(4)

			if(auctions.seller){
				sellerHtml = <Feed>
						    <Feed.Event>
						      <Feed.Label>
						        <img src={ item.auctions[0].seller.profile_img_url } />
						      </Feed.Label>
						      <Feed.Content>
						        <span style={{ color: 'grey' }}>Owned by</span> <a>{ item.auctions[0].seller.user.username }</a>
						      </Feed.Content>
						    </Feed.Event>
						</Feed>
			}

			if(auctions.ending_at){
				let diffDate = moment(auctions.ending_at*1000).diff(moment(), 'days');
				dateHtml = 'Ends in '+diffDate+' days';
				if(diffDate>30){
					diffDate = moment(auctions.ending_at*1000).diff(moment(), 'months');
					dateHtml = 'Ends in '+diffDate+' months';
				}else if(diffDate<1){
					diffDate = moment(auctions.ending_at*1000).diff(moment(), 'hours');
					dateHtml = 'Ends in '+diffDate+' hours';
				}	
			}
		}

        return (
            <Container style={{ marginTop: '7em' }}>
            	<Grid>
				    <Grid.Column width={8}>
				      <Image src={ item.image_url } />
				    </Grid.Column>
				    <Grid.Column width={8}>
					    <Grid.Row>
					      <Grid.Column width={8}>
					        <h2>
					        	{ item.name }
					            <Dropdown text='SHARE' icon='share alternate' floating labeled button basic className='icon dropdown-right dropdown-basic'>
									<Dropdown.Menu>
										<Dropdown.Item icon='linkify' text='COPY URL' />
										<Dropdown.Item icon='facebook f' text='share on facebook' />
										<Dropdown.Item icon='twitter' text='share on twitter' />
									</Dropdown.Menu>
								</Dropdown>
					        </h2>
					        <p style={{ color: 'grey' }}>View on { item.asset_contract ? item.asset_contract.name : ''}</p>
					        { sellerHtml }
							<p style={{ color: 'grey' }}>{ item.description }</p>
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
							    	<Button primary size='big' onClick={() => this.props.buyAssets(this.props.category, this.props.id)}>
							    		BUY THIS ITEM
							    		<Icon name='chevron right' />
							    	</Button>
							    </Card.Content>
							    <Card.Content extra>
							      <span style={{ color: 'black', marginRight: '5px'}}>Earn ㆔ 0</span>
							      by referring this asset
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

import React, { Component } from 'react';
import moment from 'moment';
import {
	Button,
	Card,
	Dropdown,
	Feed,
	Grid,
	Image,
	Icon
} from 'semantic-ui-react';
import '../components/Dropdown.css';

export default class AssetDetail extends Component {

    render() {
    	const { asset, fillTx} = this.props;
		let auction = asset.auction?asset.auction:null;
		let sellerHtml, dateHtml = 'Now';

		if(auction){
			if(auction.seller){
				sellerHtml = <Feed>
						    <Feed.Event>
						      <Feed.Label>
						        <Image src={ asset.auction.seller.profile_img_url } />
						      </Feed.Label>
						      <Feed.Content>
						        <span style={{ color: 'grey' }}>Owned by</span> <a>{ asset.auction.seller.user ? asset.auction.seller.user.username : '' }</a>
						      </Feed.Content>
						    </Feed.Event>
						</Feed>
			}

			if(asset.expiretimestamp){
				let diffDate = moment(asset.expiretimestamp*1000).diff(moment(), 'days');
				dateHtml = 'Ends in '+diffDate+' days';
				if(diffDate>30){
					diffDate = moment(asset.expiretimestamp*1000).diff(moment(), 'months');
					dateHtml = 'Ends in '+diffDate+' months';
				}else if(diffDate<1){
					diffDate = moment(asset.expiretimestamp*1000).diff(moment(), 'hours');
					dateHtml = 'Ends in '+diffDate+' hours';
				}
			}
		}

		let confirmBtnHtml;
		if(this.props.isOwner){
			confirmBtnHtml = <Button type='submit' color='teal' style={{marginLeft:'110px',marginTop: '2em'}} onClick={() => this.props.sellCheck(this.props.category,
					  this.props.id, this.props.hasPublished, this.props.locationParams)}>Sell</Button>
		}else{
			confirmBtnHtml = <Button primary size='big' onClick={() => this.props.toTransactionStep(this.props.category, this.props.id, fillTx, this.props.blanceEnough)}>
	    		BUY THIS ITEM
	    		<Icon name='chevron right' />
	    	</Button>
		}

        return (
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
						    	<p style={{ color: 'black' , fontSize: '30px'}}>㆔ { asset.current_price } ETH</p>
						    	{ confirmBtnHtml }
						    </Card.Content>
						</Card>
				      </Grid.Column>
				    </Grid.Row>
			    </Grid.Column>
		  </Grid>
        );
    };
}

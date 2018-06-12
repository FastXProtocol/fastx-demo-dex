import _ from 'lodash';
import React, { Component } from 'react';
import faker from 'faker';
import { Card, Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Icon } from 'semantic-ui-react';
import moment from 'moment';
import FilterSearch from '../containers/SearchStandard';
import { assentsOptions } from './Common';
import './Search/Search.css';
import './Card.css';
import { chainOptions } from '../config';
import '../api/plasma_js_client_dev';

const client = new window.plasmaClient.client(chainOptions);

export default class Assets extends Component {
  componentWillMount() {

  }

  render() {
    const { error, search, assetsSearch, getAssets, assetsReceived, setAssetsFilter, getAssetDetail, ...rest} = this.props

    let assets = this.props.results;
	let listItems = assets.map((item, i) => {
		let url = '/assets/952ce607bd9ab82e920510b2375cbad234d28c8f/'+item.id;
		let auction = item.auction?item.auction:null;
		let current_price = 0;
		let starting_price = 0;
		let preHtml, nowHtml, dateHtml;
	
		if(auction){
			// current_price = client.web3.utils.fromWei(auction.current_price, 'ether');
			// current_price = parseFloat(current_price).toFixed(1);
			// starting_price = client.web3.utils.fromWei(auction.starting_price, 'ether');
			// starting_price = parseFloat(starting_price).toFixed(1);
			current_price = auction.current_price;
			starting_price = auction.starting_price;
			preHtml = 'New!';
			if(auction.discount != 0){
				preHtml = 'Pre. ㆔ ' + starting_price ;
			}
			nowHtml = 'NOW: ㆔' + current_price;
			if(auction.ending_at){
				let diffDate = moment(auction.ending_at*1000).diff(moment(), 'days');
				dateHtml = <div className='card-duration'><Icon name='clock outline' /> { diffDate } days left</div>;
				if(diffDate>30){
					diffDate = moment(auction.ending_at*1000).diff(moment(), 'months');
					dateHtml = <div className='card-duration'><Icon name='clock outline' /> { diffDate } months left</div>;
				}else if(diffDate<1){
					diffDate = moment(auction.ending_at*1000).diff(moment(), 'hours');
					dateHtml = <div className='card-duration'><Icon name='clock outline' /> { diffDate } hours left</div>;
				}
			}
		}

		return (
			<Grid.Column key={i} mobile={16} tablet={8} computer={4} onClick={() => this.props.toAssetDetail(url)}>
				<Card>
				  <Image src={item.image_url_cdn} />
				  { dateHtml }
				  <Card.Content>
				    <Card.Header>
				      {item.name} · #{item.id}
				    </Card.Header>
				    <Card.Meta>
				      <span>{ preHtml }</span>
				      <span style={{ color: 'dodgerblue',float: 'right' }}>{ nowHtml }</span>
				    </Card.Meta>
				  </Card.Content>
				</Card>
			</Grid.Column>
		);
    });

    return (
     <div>
	    <Container style={{ marginTop: '7em' }}>
	      <Grid >
	        <Grid.Row>
	          <Grid.Column width={12}>
	            <FilterSearch input={{ icon: 'search', iconPosition: 'left' }} placeholder='Search all crypto assets' fluid className='search-fluid' />
	          </Grid.Column>
	          <Grid.Column width={4}>
	            <Dropdown selection options={assentsOptions} defaultValue={assentsOptions[0].value} onChange={setAssetsFilter} />
	          </Grid.Column>
	        </Grid.Row>
	      </Grid>
	      <Grid>
	        {listItems}
	      </Grid>
	    </Container>
	  </div>
    )
  }
}



import _ from 'lodash';
import React, { Component } from 'react';
import faker from 'faker';
import { Card, Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Icon } from 'semantic-ui-react';
import FilterSearch from '../containers/SearchStandard';
import { assentsOptions } from './Common';
import './Search/Search.css';
import './Card.css';

let cards = '';

export default class Assets extends Component {
  componentWillMount() {

  }

  render() {
    const { search, assetsSearch, getAssets, assetsReceived, setAssetsFilter, ...rest} = this.props

    let assets = this.props.results;
	var listItems = assets.map((item, i) => {
		return (
			<Grid.Column key={i} mobile={16} tablet={8} computer={4}>
				<Card>
				  <Image src={item.image} />
				  <div className='card-duration'>
				    <Icon name='clock outline' />
				    {item.leftTime}
				  </div>
				  <Card.Content>
				    <Card.Header>
				      {item.name} · #{item.id}
				    </Card.Header>
				    <Card.Meta>
				      <span>Pre. ㆔ {item.prePrice}</span>
				      <span style={{ color: 'dodgerblue',float: 'right' }}>NOW: ㆔ {item.nowPrice}</span>
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



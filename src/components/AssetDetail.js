import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Icon, Button, Feed} from 'semantic-ui-react';
import '../components/Dropdown.css';

export default class AssetDetail extends Component {

    render() {
        return (
            <Container style={{ marginTop: '7em' }}>
            	<Grid>
				    <Grid.Column width={8}>
				      <Image src='/assets/images/test/assets1.jpg' />
				    </Grid.Column>
				    <Grid.Column width={8}>
					    <Grid.Row>
					      <Grid.Column width={8}>
					        <h2>
					        	ChicMic Programmers 
					            <Dropdown text='SHARE' icon='share alternate' floating labeled button basic className='icon dropdown-right dropdown-basic'>
									<Dropdown.Menu>
										<Dropdown.Item icon='linkify' text='COPY URL' />
										<Dropdown.Item icon='facebook f' text='share on facebook' />
										<Dropdown.Item icon='twitter' text='share on twitter' />
									</Dropdown.Menu>
								</Dropdown>
					        </h2>
					        <p style={{ color: 'grey' }}>View on MeerkatMiningNFT</p>
					        <Feed>
							    <Feed.Event>
							      <Feed.Label>
							        <img src='/assets/images/avatar/small/elliot.jpg' />
							      </Feed.Label>
							      <Feed.Content>
							        <span style={{ color: 'grey' }}>Owned by</span> <a>Davinder</a>
							      </Feed.Content>
							    </Feed.Event>
							</Feed>
							<p style={{ color: 'grey' }}>My Team</p>
					      </Grid.Column>
					      <Grid.Column width={8}>
					        <Card style={{ marginTop: '2em' }} fluid>
							    <Card.Content extra>
							    	<Icon name='clock outline' />
							    	Ends in 2 days
							    </Card.Content>
							    <Card.Content extra>
							    	<p>Listed for</p>
							    	<p style={{ color: 'black' , fontSize: '30px'}}>㆔</p>
							    	<Button primary size='big'>
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

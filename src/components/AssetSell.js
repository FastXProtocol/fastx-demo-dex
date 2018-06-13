import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Container, Divider, Dropdown, Form, Grid, Header, Input, Image, List, Menu, Segment, Icon, Button, Feed} from 'semantic-ui-react';
import '../components/Dropdown.css';
import { chainOptions } from '../config';
import '../api/plasma_js_client_dev';

const client = new window.plasmaClient.client(chainOptions);

export default class AssetDetail extends Component {
	componentWillMount() {
		this.props.getAssetDetail(this.props.id);
    }
	
    render() {
    	const { asset, id, allPs, fillTx } = this.props;
		let auction = asset.auction?asset.auction:null, current_price;

        return (
            <Container style={{ marginTop: '7em' }}>
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
					        <p style={{ color: 'grey' }}>View on { asset.asset_contract ? asset.asset_contract.name : ''}</p>
					        
							<p style={{ color: 'grey' }}>{ asset.description }</p>
					      </Grid.Column>
					      <Grid.Column width={8}>
					        <Card style={{ marginTop: '2em' }} fluid>
							    <Card.Content extra>
							    	<Form>
					                    <Form.Field inline style={{ marginTop: '2em' }}>
					                      <label className='align_right_label'>Date Ends</label>
					                      <Input type='date' placeholder='' onChange={this.props.setSellEnd}/>
					                    </Form.Field>
					                    <Form.Field inline style={{ marginTop: '2em' }}>
					                      <label className='align_right_label'>Price*</label>
					                      <Input label='ETH' type='number' placeholder='' onChange={this.props.setSellPrice} />
					                    </Form.Field>
					                    <Button type='submit' color='teal' style={{marginLeft:'110px',marginTop: '2em'}} onClick={() => this.props.sellAsset({  end: this.props.end,
					  categroy: this.props.category,
					  sellId: this.props.id,
					  sellPrice: this.props.sellPrice})}>Sell</Button>
					                </Form>
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

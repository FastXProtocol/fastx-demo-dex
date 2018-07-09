import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Container, Divider, Dropdown,Dimmer, 
	Form, Grid, Header, Input, Image, List,Loader,
 Menu, Modal, Segment, Step, Icon, Button, Feed} from 'semantic-ui-react';
import TipModal from '../components/Modal/tipModal';
import '../components/Dropdown.css';
import './modalModify.css';

export default class AssetDetail extends Component {
	componentWillMount() {
		this.props.setAssetStatus();
		this.props.getAssetDetail(this.props.id);
		this.props.getPublishStatus(this.props.category, this.props.id);
    }
	
    render() {
    	const { asset, id, allPs, fillTx } = this.props;
    	let html;
    	if(this.props.status == "sent"){
    		html =  <div>
	    		
				<Button primary size='big' onClick={() => this.props.goto()}>返回 Account</Button>
	    	</div>
    	}else if(this.props.status == "waiting"){
	    	html =  <div>
				<Image src='/assets/images/help/metamask.png' size='medium' inline={true}/>
	    	</div>
    	}else{
    		html =	<Form>
                <Form.Field inline style={{ marginTop: '2em' }}>
                  <label className='align_right_label'>Date Ends</label>
                  <Input type='date' placeholder='' onChange={this.props.setSellEnd} value={this.props.end}/>
                </Form.Field>
                <Form.Field inline style={{ marginTop: '2em' }}>
                  <label className='align_right_label'>Price*</label>
                  <Input label='Wei' type='number' placeholder='' onChange={this.props.setSellPrice} />
                </Form.Field>
                <Button type='submit' color='teal' style={{marginLeft:'110px',marginTop: '2em'}} onClick={() => this.props.sellCheck({  end: this.props.end,
category: this.props.category,
sellId: this.props.id,
sellPrice: this.props.sellPrice}, this.props.hasPublished, this.props.locationParams)}>Sell</Button>
            </Form>
    	}

        return (
            <Container style={{ marginTop: '1em' }} textAlign='center'>
                <TipModal open={this.props.modal.open} close={this.props.close} desc={this.props.modal.desc} />
            	<Step.Group ordered>
            		<Step completed={this.props.status == "waiting" || this.props.status == "sent"} active={!this.props.status}>
                        <Step.Content>
                            <Step.Title>Form</Step.Title>
                            <Step.Description> 
                            	Fill end and price  
                            </Step.Description>
                        </Step.Content>
                    </Step>
                    <Step completed={this.props.status == "sent"} active={this.props.status == "waiting"}>
                        <Step.Content>
                            <Step.Title>Confirm</Step.Title>
                            <Step.Description>
                                Approve the contract to access your asset
                            </Step.Description>
                        </Step.Content>
                    </Step>
                    <Step active={this.props.status == "sent"}>
                        <Step.Content>
                            <Step.Title>Waiting</Step.Title>
                            <Step.Description>
                                Your transaction was sent
                            </Step.Description>
                        </Step.Content>
                    </Step>
                </Step.Group>
                {html}
		    </Container>
        );
    };
}

import React, { Component } from 'react';
import { Card, Container, Divider, Dropdown,Dimmer, Form, Grid, Header, Input, Image, List,Loader, Menu, Modal, Segment, Icon, Button, Feed} from 'semantic-ui-react';

export default class Deposit extends Component {
    render() {
    	let html;
    	if(this.props.waiting){
    		html =  <div>
	    		<Header as='h2'>Your transaction was sent</Header>
				<Button primary size='big' onClick={() => this.props.goto('/account')}>返回 Account</Button>
	    	</div>
    	}else{
	    	html =  <div>
	    		<Header as='h2'>Approve the contract to access your asset</Header>
				<Image src='/assets/images/help/metamask.png' size='medium' inline={true}/>
	    	</div>
    	}
    	
        return (
            <Container style={{ marginTop: '1em' }} textAlign='center'>
				{html}
		    </Container>
        );
    };
}

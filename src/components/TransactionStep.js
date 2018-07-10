import React, { Component } from 'react';
import {
    Button,
    Container,
    Image, 
    Step
} from 'semantic-ui-react';

export default class TransactionStep extends Component {
    render() {
    	let html;
    	if(this.props.waiting){
    		html =  <div>

				<Button primary size='big' onClick={() => this.props.goto()}>返回 Account</Button>
	    	</div>
    	}else{
	    	html =  <div>

				<Image src='/assets/images/help/metamask.png' size='medium' inline={true}/>
	    	</div>
    	}

        return (
            <Container style={{ marginTop: '1em' }} textAlign='center'>
                <Step.Group ordered>
                    <Step completed={this.props.waiting} active={!this.props.waiting}>
                        <Step.Content>
                            <Step.Title>Confirm</Step.Title>
                            <Step.Description>
                                Approve the contract to access your asset
                            </Step.Description>
                        </Step.Content>
                    </Step>
                    <Step active={this.props.waiting}>
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

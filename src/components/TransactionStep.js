import React, { Component } from 'react';
import {
    Button,
    Container,
    Image,
    Step
} from 'semantic-ui-react';
//Confirm
// Approve the contract to access your asset
export default class TransactionStep extends Component {
    render() {
        let curItem = this.props.steps[this.props.curStep-1];
    	let html;
        let stepsHtml = this.props.steps.map( (item, i) => {
            return (
                <Step completed={ this.props.curStep > (i+1)} active={this.props.curStep == (i+1)} key={i}>
                    <Step.Content>
                        <Step.Title>{ item.title } </Step.Title>
                        <Step.Description>
                            { item.desc }

                        </Step.Description>
                    </Step.Content>
                </Step>
            )
        })

        if(curItem){
            html =  <div>
				<Image src='/assets/images/help/metamask.png' size='medium' inline={true}/>
	    	</div>
    	}else{
            html =  <div>
				<Button primary size='big' onClick={() => this.props.goto()}>返回 Account</Button>
	    	</div>
    	}

    	// if(this.props.waiting){
    	// 	html =  <div>
		// 		<Button primary size='big' onClick={() => this.props.goto()}>返回 Account</Button>
	    // 	</div>
    	// }else{
	    // 	html =  <div>
		// 		<Image src='/assets/images/help/metamask.png' size='medium' inline={true}/>
	    // 	</div>
    	// }

        return (
            <Container style={{ marginTop: '1em' }} textAlign='center'>
                <Step.Group ordered>
                    { stepsHtml }
                    <Step active={this.props.curStep > this.props.steps.length}>
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

import React, { Component } from 'react';
import {
    Button,
    Container,
    Image,
    Step
} from 'semantic-ui-react';

export default class SubHeader extends Component {
    render() {

        return (
            <div>
                <Button primary size='big' onClick={this.props.onGenerateWallet}>New wallet</Button>
                <Button basic size='big' onClick={this.props.onShowRestoreWallet}>Restore wallet</Button>
            </div>
        );
    };
}

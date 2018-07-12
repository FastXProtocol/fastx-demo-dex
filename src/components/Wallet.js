import React, { Component } from 'react';
import {
    Button,
    Container,
    Image,
    Step
} from 'semantic-ui-react';


export default class Wallet extends Component {
    componentDidMount() {

    }

    render() {


        return (
            <Container style={{ marginTop: '1em' }} textAlign='center'>
                <Button primary size='big' onClick={() => this.props.creatWallet(this.props.fastx)}>创建钱包</Button>
                <Button primary size='big' onClick={() => this.props.setWalletPwd(this.props.fastx)}>设置密码</Button>
                <Button primary size='big' onClick={() => this.props.loginWallet(this.props.fastx)}>登录</Button>
		    </Container>
        );
    };
}

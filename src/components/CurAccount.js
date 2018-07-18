
import React, { Component } from 'react';
import {
    Button,
    Container,
    Header,
    Image,
    Select,
    Step
} from 'semantic-ui-react';


export default class CurAccount extends Component {
    render() {
        const {
            selectOptions,
            curAccount,
            isComfirmed,
            onChangeCurAccount,
        } = this.props;

        if(isComfirmed){
            return (
                <div style={{marginTop:'2em'}}>
                    <Header as='h3'>当前使用地址</Header>
                    <Select options={selectOptions} onChange={onChangeCurAccount} value={curAccount} />
                </div>
            );
        }else{
            return '';
        }
    };
}

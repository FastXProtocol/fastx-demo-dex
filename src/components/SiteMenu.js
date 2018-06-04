import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Card, Container, Divider, Dropdown, Grid, Image, List, Menu, Segment, Label, Checkbox } from 'semantic-ui-react';

class SiteMenu extends Component {
    state = {}

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    };

    render () {
        const { activeItem } = this.state;
        const {toMarketplace, toAccounnt} = this.props;

        return (
            
            <Menu fixed='left' vertical inverted style={{ marginTop: '1.5em' }}>
                <Container style={{ marginTop: '1.5em' }}>
                    <Menu.Item name='switch' active={activeItem === 'switch'} onClick={this.handleItemClick}>
                        <h6>FOR SALE ONLY <Checkbox toggle /></h6>
                        
                    </Menu.Item>
                    <Menu.Item name='spam' active={activeItem === 'spam'} onClick={this.handleItemClick}>
                      <Label>51</Label>
                      Spam
                    </Menu.Item>

                    <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
                      <Label>1</Label>
                      Updates
                    </Menu.Item>
                </Container>
            </Menu>
           
        );
    };
};


function mapDispatchToProps(dispatch) {
    return {
        toMarketplace: () => dispatch(push('/assets')),
        toAccounnt: () => dispatch(push('/account'))
    }
}

export default connect()(SiteMenu)
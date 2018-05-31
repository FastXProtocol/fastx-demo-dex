import React, { Component } from 'react';
import { connect } from 'react-redux';

import FixedMenuLayout from '../components/Layouts/FixedMenuLayout';

export class AssetList extends Component {
    render() {
        return (
            <div>
            <h1>Hello</h1>
            <FixedMenuLayout />
            </div>
        );
    };
}


export default connect(
    state => ({})
)(AssetList);
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FixedMenuLayout from '../components/Layouts/FixedMenuLayout';

export default class AssetList extends Component {
    render() {
        return (
            <div>
                <FixedMenuLayout />
            </div>
        );
    };
}

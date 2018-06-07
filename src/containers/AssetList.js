import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FixedMenuLayout from '../components/Layouts/FixedMenuLayout';
import * as assetsActions from '../actions/assets'

class Assets extends Component {
	componentDidMount() {
		let that = this;
		that.props.getAssets();
	}

    render() {
        return (
            <div>
               <FixedMenuLayout />
            </div>
        );
    };
}

function mapStateToProps(state){
    return {
       results: state.assets.results
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(assetsActions, dispatch)
    }
}

const AssetList = connect(
    mapStateToProps,
    mapDispatchToProps
)(Assets)

export default AssetList

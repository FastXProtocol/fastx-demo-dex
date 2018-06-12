import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import AssetDetail from '../components/AssetDetail';
import * as assetsActions from '../actions/assets';

function mapStateToProps(state, props){
    return {
       id: props.match.params.id,
       category: props.match.params.category,
       asset: state.assets.asset,
       allPs: state.assets.allPs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(assetsActions, dispatch)
    }
}

const AssetDetailFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetDetail)

export default AssetDetailFilter
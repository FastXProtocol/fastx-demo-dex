import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Assets from '../components/Assets';
import * as assetsActions from '../actions/assets'

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

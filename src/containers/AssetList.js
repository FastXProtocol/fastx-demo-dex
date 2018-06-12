import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import AssetListPresentation from '../components/Assets';
import * as assetsActions from '../actions/assets'

function mapStateToProps(state){
    return {
       results: state.assets.results,
       error: state.assets.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
    	toAssetDetail: (url) => dispatch(push(url)),
        ...bindActionCreators(assetsActions, dispatch)
    }
}

const AssetList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetListPresentation)

export default AssetList
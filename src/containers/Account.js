import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { bidsOptions } from '../components/Common';
import Account from '../components/Account';
import '../components/Card.css';
import * as accountActions from '../actions/account';
import '../components/Label.css';
import { assentsOptions } from '../components/Common';

function mapStateToProps(state){
    return {
        balance: state.account.balance,
        ownerAddress: state.account.ownerAddress,
        end: state.account.end,
        categroy: state.account.categroy,
        sellId: state.account.sellId,
        sellPrice: state.account.sellPrice,
        depositPrice: state.account.depositPrice,
        items: state.account.items,
        isLoading: state.assets.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toAssetDetail: (url) => dispatch(push(url)),
        ...bindActionCreators(accountActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account)

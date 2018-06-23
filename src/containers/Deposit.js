import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Deposit from '../components/Deposit';

import * as accountActions from '../actions/account';

function mapStateToProps(state){
    return {
        waiting: state.account.waiting
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goto: (url) => dispatch(push(url)),
        ...bindActionCreators(accountActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Deposit)

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import TransactionStep from '../components/TransactionStep';

import * as accountActions from '../actions/account';

function mapStateToProps(state){
    return {
        waiting: state.account.waiting
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goto: () => dispatch(push('/account'))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionStep)

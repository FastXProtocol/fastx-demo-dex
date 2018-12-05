import React, { Component } from 'react';
import { connect } from 'react-redux';
import {   
    Container,
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import ExchangeCompontent from '../components/Exchange'
import * as exchangeActions from '../actions/exchange'
import * as accountActions from '../actions/account'

class ExchangeContiner extends Component {
  render() {
    return (
        <Container style={{ marginTop: '1em' }}>
            <ExchangeCompontent {...this.props} />
        </Container>
    )
  }
}

function mapStateToProps(state){
    return {
        from: state.exchange.from,
        to: state.exchange.to,
        balances: state.account.balance,
        amountPay: state.exchange.amountPay,
        amountBuyInput: state.exchange.amountBuyInput,
        amountPayInput: state.exchange.amountPayInput,
        selectedSide: state.exchange.selectedSide,
        shouldDisplayTokenSelector: state.exchange.shouldDisplayTokenSelector,
        step: state.exchange.step,
        trade: state.exchange.trade,
        rate: state.exchange.rate,
        transaction: state.exchange.transaction,
        isTrading: state.exchange.isTrading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pickToken: (tokenType) => {
            dispatch(exchangeActions.pickToken(tokenType))
        },
        closeTokenSelector: () => {
            dispatch(exchangeActions.closeTokenSelector())
        },
        setSelectedSide: (side, token) => {
            dispatch(exchangeActions.setSelectedSide(side, token))
        },    
        swapTokens: () => {
            dispatch(exchangeActions.swapTokens())
        },
        setBuyAmount: (amount) => {
            dispatch(exchangeActions.setBuyAmount(amount))
        },
        setPayAmount: (amount) => {
            dispatch(exchangeActions.setPayAmount(amount))
        },
        nextStep: (amount) => {
            //dispatch(exchangeActions.nextStep())
            dispatch(exchangeActions.transactionStausChange(true))
            dispatch(exchangeActions.transaction(amount))
        },
        reset: () => {
            dispatch(exchangeActions.reset())
        },
        getExchangeRate: (amount) => {
            dispatch(exchangeActions.getExchangeRate(amount))
            dispatch(accountActions.getBalance())
        },
        transactionChange: (transaction) => {
            dispatch(exchangeActions.transactionChange(transaction))
        }
    }
}

const Exchange = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeContiner)

export default Exchange

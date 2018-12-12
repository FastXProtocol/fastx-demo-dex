import React, { Component } from 'react';
import { connect } from 'react-redux';
import {   
    Container,
} from 'semantic-ui-react';
import request from '../utils/request'
import { serverUrl } from '../config'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import ExchangeCompontent from '../components/Exchange'
import * as exchangeActions from '../actions/exchange'
import * as accountActions from '../actions/account'

class ExchangeContiner extends Component {
    componentDidMount() {
        request(serverUrl+'asset')
        .then((res) => {
            this.props.setToekns(res)
        })

        request(serverUrl+'transaction_pair')
        .then((res) => {
            this.props.setTransactionPair(res)
        })
    }

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
        rateToken: state.exchange.rateToken,
        transaction: state.exchange.transaction,
        isTrading: state.exchange.isTrading,
        receivedTokens: state.exchange.receivedTokens,
        transactionPair: state.exchange.transactionPair
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setToekns: (tokens) => {
            dispatch(exchangeActions.setToekns(tokens))
        },
        setTransactionPair: (tokens) => {
            dispatch(exchangeActions.setTransactionPair(tokens))
        },
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
        changeRate: (props) => {
            for(let v of props.transactionPair){
                if(v.sell.toLocaleLowerCase() == props.from && v.buy.toLocaleLowerCase() == props.to){
                    dispatch(exchangeActions.changeRate(v.rate/100, v.sell, v.buy))
                }
            }
        },
        setBuyAmount: (amount) => {
            dispatch(exchangeActions.setBuyAmount(amount))
        },
        setPayAmount: (amount) => {
            dispatch(exchangeActions.setPayAmount(amount))
        },
        nextStep: (amount,props) => {
            //dispatch(exchangeActions.nextStep())
            dispatch(exchangeActions.transactionStausChange(true))
            dispatch(exchangeActions.transaction(amount,props.rate,'0000000000000000000000000000000000000000','0x395B650707cAA0d300615bBa2901398DFf64CF7c'))
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

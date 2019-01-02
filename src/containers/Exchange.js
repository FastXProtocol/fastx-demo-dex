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
        let props = this.props
        request(serverUrl+'asset')
        .then((res) => {
            props.setToekns(res)
            console.log('tokenList:',res)
            props.setSelectedSide('from', res[0]?res[0].symbol.toLocaleLowerCase():'eth')
            props.setSelectedSide('to', res[1]?res[1].symbol.toLocaleLowerCase():'eth')
            request(serverUrl+'transaction_pair')
            .then((pairRes) => {
                props.setTransactionPair(pairRes)
                props.getExchangeRate()
            })
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
        balances: state.account.fastxBalance,
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
        changeRate: (props, transactionPair) => {
            // let pairs = transactionPair || props.transactionPair
            // dispatch(exchangeActions.changeRate(null, 'NA', 'NA'))
            // // props.rate = null
            // // props.rateToken = 'NA/NA'
            // setTimeout(function(){
            //     for(let v of pairs){
            //         if(v.sell.toLocaleLowerCase() == props.from && v.buy.toLocaleLowerCase() == props.to){
            //             dispatch(exchangeActions.changeRate(v.rate/100, v.sell, v.buy))
            //         }
            //     }
            // },1000)
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
        getExchangeRate: () => {
            dispatch(exchangeActions.getExchangeRate())
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

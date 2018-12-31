import React, { Component } from 'react';
import { connect } from 'react-redux';
import {   
    Container,
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import request from '../utils/request'
import { serverUrl } from '../config'
import Account from '../components/Account';
import '../components/Card.css';
import * as accountActions from '../actions/account';
import * as assetsActions from '../actions/assets';
import * as exchangeActions from '../actions/exchange';
import '../components/Label.css';

const getDays = (date) => {
    return moment(date).diff(moment(), 'days') + 1;
}

class AccountContiner extends Component {
    componentDidMount() {
        let props = this.props
        request(serverUrl+'asset')
        .then((res) => {
            props.setToekns(res)
        })
    }

    render() {
        return (
            <Container style={{ marginTop: '1em' }}>
                <Account {...this.props} />
            </Container>
        )
    }
}

function mapStateToProps(state){
    return {
        balance: state.account.balance,
        ownerAddress: state.account.ownerAddress,
        end: state.account.end,
        days: getDays(state.account.end),
        category: state.account.category,
        sellId: state.account.sellId,
        sellPrice: state.account.sellPrice,
        depositPrice: state.account.depositPrice,
        withdrawalPrice: state.account.withdrawalPrice,
        items: state.account.items,
        isLoading: state.assets.isLoading,
        currency: state.account.currency,
        unit: state.account.unit,
        receivedTokens: state.exchange.receivedTokens,
        userReviewAssets: state.reviewAssets.userReviewAssets
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setToekns: (tokens) => {
            dispatch(exchangeActions.setToekns(tokens))
        },
        goto: (url,currency) => {
            if(currency && currency!=='FastX'){
                dispatch(push(url+'?currency='+currency));
            }else{
                dispatch(push(url));
            }
        },
        getEndByDays: (e, target) => {
            let days = 0;
            if(target && target.value)days = parseInt(target.value);
            dispatch(accountActions.setSellEnd(moment().add(days, 'days')));
        },
        takeOut: (category, id, currency) => {
            dispatch(assetsActions.takeOut(category, id, currency))
            dispatch(push('/deposit'))
        },
        toDeposit: (price) => {
            dispatch(accountActions.deposit(price))
            dispatch(push('/deposit'))
        },
        toWithdrawal: (price) => {
            dispatch(accountActions.withdrawal(price))
            dispatch(push('/deposit'))
        },
        switching: (currency, unit) => {
            dispatch(accountActions.switchingUnit(currency))
            dispatch(accountActions.getBalance())
        },
        ...bindActionCreators(accountActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountContiner)

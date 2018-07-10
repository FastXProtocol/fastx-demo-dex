import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Account from '../components/Account';
import '../components/Card.css';
import * as accountActions from '../actions/account';
import * as assetsActions from '../actions/assets';
import '../components/Label.css';

function mapStateToProps(state){
    return {
        balance: state.account.balance,
        ownerAddress: state.account.ownerAddress,
        end: state.account.end,
        category: state.account.category,
        sellId: state.account.sellId,
        sellPrice: state.account.sellPrice,
        depositPrice: state.account.depositPrice,
        items: state.account.items,
        isLoading: state.assets.isLoading,
        currency: state.account.currency,
        unit: state.account.unit
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goto: (url,currency) => {
            if(currency && currency!=='FastX'){
                dispatch(push(url+'?currency='+currency));
            }else{
                dispatch(push(url));
            }
        },
        takeOut: (category, id, currency) => {
            dispatch(assetsActions.takeOut(category, id, currency))
        },
        toDeposit: (price) => {
            dispatch(accountActions.deposit(price))
            dispatch(push('/deposit'))
        },
        switching: (currency, unit) => {
            dispatch(accountActions.switchingUnit(currency, unit))
            dispatch(accountActions.getBalance())
        },
        ...bindActionCreators(accountActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account)

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import AssetSell from '../components/AssetSell';
import * as assetsActions from '../actions/assets';
import * as accountActions from '../actions/account';
import * as modalActions from '../actions/modal';

const getFillTx = (category, id, allPs) => {
  let fillTx = {};
  for(let value of allPs){
    if(value.contractaddress2 === category && parseInt(value.tokenid2, 10) === parseInt(id, 10)){
      fillTx = value;
      break;
    }
  }
  return fillTx;
}

const getDays = (date) => {
    return moment(date).diff(moment(), 'days') + 1;
}

function mapStateToProps(state, props){
    return {
       id: props.match.params.id,
       category: props.match.params.category,
       asset: state.assets.asset,
       allPs: state.assets.allPs,
       fillTx: getFillTx(props.match.params.category, props.match.params.id, state.assets.allPs),
       end: state.account.end,
       days: getDays(state.account.end),
       sellPrice: state.account.sellPrice,
       hasPublished: state.assets.hasPublished,
       isLoading: state.assets.isLoading,
       status: state.assets.status,
       modal: state.modal,
       locationParams: props.location.search.split('?')[1]
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goto: () => dispatch(push('/account')),
        confirm: (params) => {
          dispatch(accountActions.sellContractAsset(params))
          dispatch(modalActions.close())
        },
        getEndByDays: (e, target) => {
            let days = 0;
            if(target && target.value)days = parseInt(target.value);
            dispatch(accountActions.setSellEnd(moment().add(days, 'days')));
        },
        sellCheck: (params, hasPublished, locationParams) => {
          console.log('hasPublished:',hasPublished)
          if(hasPublished){
            dispatch(modalActions.open('这件商品您已经过发布广告了'));
          }else{
            params['locationParams'] = locationParams;
            dispatch(accountActions.sellAsset(params));
            // if(currency == 'Ethereum'){
            //   dispatch(accountActions.sellAsset(params));
            // }else{
            //   dispatch(accountActions.sellContractAsset(params));
            // }
          }
        },
        ...bindActionCreators(modalActions, dispatch),
        ...bindActionCreators(assetsActions, dispatch),
        ...bindActionCreators(accountActions, dispatch)
    }
}

const AssetSellFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetSell)

export default AssetSellFilter

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import AssetSell from '../components/AssetSell';
import * as assetsActions from '../actions/assets';
import * as accountActions from '../actions/account';
import * as modalActions from '../actions/modal';

const getFillTx = (category, id, allPs) => {
  let fillTx = {};
  for(let value of allPs){
    if(value.contractaddress2 == category && value.tokenid2 == id){
      fillTx = value;
      break;
    }
  }
  return fillTx;
}

function mapStateToProps(state, props){
    return {
       id: props.match.params.id,
       category: props.match.params.category,
       asset: state.assets.asset,
       allPs: state.assets.allPs,
       fillTx: getFillTx(props.match.params.category, props.match.params.id, state.assets.allPs),
       end: state.account.end,
       sellPrice: state.account.sellPrice,
       hasPublished: state.assets.hasPublished,
       isLoading: state.assets.isLoading,
       status: state.assets.status,
       modal: state.modal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goto: () => dispatch(push('/account')),
        confirm: (params) => {
          dispatch(accountActions.sellContractAsset(params))
          dispatch(modalActions.close())
        },
        sellCheck: (params, hasPublished) => {
          console.log('hasPublished:',hasPublished)
          if(hasPublished){
            dispatch(modalActions.open());
          }else{
            dispatch(accountActions.sellContractAsset(params));
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
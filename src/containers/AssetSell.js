import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import AssetSell from '../components/AssetSell';
import * as assetsActions from '../actions/assets';
import * as accountActions from '../actions/account';

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
       sellPrice: state.account.sellPrice
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(assetsActions, dispatch),
        ...bindActionCreators(accountActions, dispatch)
    }
}

const AssetSellFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetSell)

export default AssetSellFilter
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import AssetDetailComponent from '../components/AssetDetail';
import * as assetsActions from '../actions/assets';
import * as modalActions from '../actions/modal';

class AssetDetail extends Component {
    componentWillMount() {
      this.props.getAssetDetail(this.props.id);
      this.props.getPublishStatus(this.props.category, this.props.id);
    }
  
    render() {
      return (
        <AssetDetailComponent {...this.props}/>
      )
    };
}


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

const checkIsOwner = async (fastx, allPs) => {
  let isOwner = false;
  let accounts = [];
  accounts = await fastx.web3.eth.getAccounts();
  const ownerAddress = accounts[0];
  for (let value of allPs){
    if(("0x"+value.newowner1) == ownerAddress.toLowerCase()){
      isOwner = true;
      break;
    }
  }
  return isOwner;
}

function mapStateToProps(state, props){
    return {
       id: props.match.params.id,
       category: props.match.params.category,
       asset: state.assets.asset,
       allPs: state.assets.allPs,
       fillTx: getFillTx(props.match.params.category, props.match.params.id, state.assets.allPs),
       fastx: state.app.fastx,
       isOwner: checkIsOwner(state.app.fastx, state.assets.allPs),
       isLoading: state.assets.isLoading,
       hasPublished: state.assets.hasPublished,
       waiting: state.account.waiting,
       modal: state.modal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toTransactionStep: (category, id, fillTx) => {
            dispatch(assetsActions.assetBuy(category, id, fillTx))
            dispatch(push('/deposit'))
        },
        sellCheck: (category, id, hasPublished) => {
          console.log('hasPublished:',hasPublished)
          if(hasPublished){
            dispatch(modalActions.open());
          }else{
            dispatch(push('/assets/'+category+'/'+id+'/sell'))
          }
        },
        ...bindActionCreators(modalActions, dispatch),
        ...bindActionCreators(assetsActions, dispatch)
    }
}

const AssetDetailFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetDetail)

export default AssetDetailFilter
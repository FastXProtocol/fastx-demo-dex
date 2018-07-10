import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
    Container,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import AssetDetailComponent from '../components/AssetDetail';
import TipModal from '../components/Modal/tipModal';
import * as assetsActions from '../actions/assets';
import * as accountActions from '../actions/account';
import * as modalActions from '../actions/modal';

class AssetDetail extends Component {
    componentWillMount() {
      this.props.getAssetDetail(this.props.id);
      this.props.getPublishStatus(this.props.category, this.props.id);
      this.props.getBalance();
      this.props.checkIsOwner(this.props.category, this.props.id, this.props.locationParams);
      //this.props.checkBlanceEnough(this.props.fillTx.amount1 || 0);
    }

    render() {
      let loaderHtml = "";
      if(this.props.isLoading) {
        loaderHtml = <Dimmer active >
              <Loader >Loading</Loader>
            </Dimmer>;
      }

      return (
        <Container style={{ marginTop: '1em' }}>
          {loaderHtml}
          <TipModal open={this.props.modal.open} close={this.props.close} desc={this.props.modal.desc} />
          <AssetDetailComponent {...this.props}/>
        </Container>
      )
    };
}

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

function mapStateToProps(state, props){
    return {
       id: props.match.params.id,
       category: props.match.params.category,
       asset: state.assets.asset,
       allPs: state.assets.allPs,
       blanceEnough: state.assets.blanceEnough,
       fillTx: getFillTx(props.match.params.category, props.match.params.id, state.assets.allPs),
       fastx: state.app.fastx,
       isOwner: state.assets.isOwner,
       isLoading: state.assets.isLoading,
       hasPublished: state.assets.hasPublished,
       waiting: state.account.waiting,
       userItems: state.account.items,
       modal: state.modal,
       locationParams: props.location.search.split('?')[1]
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toTransactionStep: (category, id, fillTx, blanceEnough) => {
          dispatch(assetsActions.assetBuy(category, id, fillTx));
          dispatch(push('/deposit'));
          // if(blanceEnough){
          //   dispatch(assetsActions.assetBuy(category, id, fillTx));
          //   dispatch(push('/deposit'));
          // }else{
          //   dispatch(modalActions.open('您的余额不足，请去账户充值'));
          // }
        },
        sellCheck: (category, id, hasPublished, locationParams) => {
          if(hasPublished){
            dispatch(modalActions.open('这件商品您已经过发布广告了'));
          }else{
            if(locationParams){
              dispatch(push('/assets/'+category+'/'+id+'/sell?'+locationParams));
            }else{
              dispatch(push('/assets/'+category+'/'+id+'/sell'));
            }

          }
        },
        ...bindActionCreators(accountActions, dispatch),
        ...bindActionCreators(modalActions, dispatch),
        ...bindActionCreators(assetsActions, dispatch)
    }
}

const AssetDetailFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetDetail)

export default AssetDetailFilter

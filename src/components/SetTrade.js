import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import {
    Ether, MKR, DAI, FEX, SwapArrows, IdentityIcon, Circle, Attention,
  } from './Icons';
import Spinner from './Spinner';
import TokenAmount from './TokenAmount';
import TokensSelector from './TokensSelector';
import './Exchange.css';

const tokens = {
    eth: {
      icon: <Ether/>,
      symbol: "ETH",
      name: "Ether",
    },
    fastx: {
      icon: <FEX/>,
      symbol: "FEX",
      name: "FastX",
    },
}

export default class SetTrade extends Component {
    constructor() {
        super()
    } 

    componentWillMount() {
      this.props.getExchangeRate(1)
    }

    calculateBuyAmount = (e) => {   
      const amount = parseFloat(e.target.value)

      if(!this.props.rate){
        alert('获取汇率失败')
        return
      }
      this.props.setBuyAmount(amount)
      this.props.setPayAmount(amount*this.props.rate)
    }
  
    calculatePayAmount = (e) => {
      const amount = parseFloat(e.target.value)

      if(!this.props.rate){
        alert('获取汇率失败')
        return
      }
      this.props.setBuyAmount(amount/this.props.rate)
      this.props.setPayAmount(amount)  
    }

    select = (selectedToken) => {
      const oppositeSide = this.props.selectedSide === 'from' ? 'to' : 'from';
      const tokenOnTheOppositeSide = this.props[oppositeSide];
      if (this.props[this.props.selectedSide] === selectedToken) {
          this.props.closeTokenSelector()
          return;
      }
      
      if (selectedToken === tokenOnTheOppositeSide) {
          this.props.swapTokens();
          this.props.closeTokenSelector();
          return;
      }

      this.props.setSelectedSide([this.props.selectedSide], selectedToken);
      this.props.closeTokenSelector();
    }

    render() {
        return (
          <React.Fragment>
            {
              this.props.shouldDisplayTokenSelector
              ?
              <TokensSelector tokens={tokens} balances={this.props.balances} select={this.select} back={this.props.closeTokenSelector} />
              :
              <section className="frame">
              <div className="heading">
                <h2>Enter Order Details</h2>
              </div>
              <div
                className='info-box'>
                <div className="info-box-row wrap">
                  {
                    this.props.errorOrders && !this.props.errorInputSell &&
                    <span className="label">
                      No orders available to {this.props.errorOrders.type}&nbsp;
                      <strong>{this.props.errorOrders.amount} {this.props.errorOrders.token}</strong>
                    </span>
                  }
                  {
                    this.props.errorInputSell &&
                    (
                      this.props.errorInputSell === 'funds'
                        ?
                        <span
                          className="label"> You don't have enough <strong>{tokens[this.props.from].name} </strong> in your Wallet</span>
                        :
                        this.props.errorInputSell === 'gasCost'
                          ? <span className="label"> You won't have enough ETH to pay for the gas!</span>
                          : <span className="label">
                              {tokens[this.props.from].symbol}&nbsp;
                              Minimum Value: {this.props.errorInputSell.replace('minValue:', '')}
                            </span>
                    )
                  }
                  {
                    !this.props.errorOrders && !this.props.errorInputSell && this.props.errorInputBuy &&
                    <span className="label">
                      {tokens[this.props.to].symbol}&nbsp;
                      Minimum Value: {this.props.errorInputBuy.replace('minValue:', '')}
                    </span>
                  }
                  {
                    !this.props.errorOrders && !this.props.errorInputSell && !this.props.errorInputBuy &&
                    <React.Fragment>
                      <span style={{paddingBottom: "4px", lineHeight: "18px"}} className="holder half holder--spread">
                        <span className="label vertical-align">
                          Price
                          <Attention data-tip data-for="price-tooltip" className="attention-icon"/>
                          <ReactTooltip className="od-tooltip" effect="solid" id="price-tooltip">
                            <p>
                              The estimated price of your order is calculated based on the current depth of the OasisDEX order book and the size of your order.
                            </p>
                          </ReactTooltip>
                        </span>
                        <span  style={{lineHeight: "14px",  fontSize:"12px"}}> ~ <TokenAmount number={this.props.rate} decimal={2}
                                    token={'ETH/FEX'}/>
                        </span>
                      </span>
                     
                    </React.Fragment>
                  }
                </div>
              </div>
              <div className="content">
                <form className="trade">
                  <div className="selected-token">
                    <div className="token" onClick={() => {
                      this.props.pickToken('from')
                    }}>
                      <span className="token-icon">{tokens[this.props.from].icon}</span>
                      <TokenAmount className="token-name" number={this.props.balances[this.props.from]} token={tokens[this.props.from].symbol}/>
                    </div>
                    <div>
                    <input type="number"
                           value={this.props.amountBuyInput || ''}
                           onChange={(e) => this.calculateBuyAmount(e)} placeholder="deposit amount"/>
                    </div>
                  </div>
                  <div className='separator'>
                    <span className="swap-tokens" onClick={this.props.swapTokens}>
                      <SwapArrows/>
                    </span>
                  </div>
                  <div className="selected-token">
                    <div className="token" onClick={() => {
                      this.props.pickToken('to');
                    }}>
                      <span className="token-icon">{tokens[this.props.to].icon}</span>
                      <TokenAmount className="token-name" number={this.props.balances[this.props.to]} token={tokens[this.props.to].symbol}/>
                    </div>
                    <div>
                      <input type="number"
                            value={this.props.amountPayInput || ''}
                            onChange={(e) => this.calculatePayAmount(e)} placeholder="receive amount"/>
                    </div>
                  </div>
                </form>
              </div> 
              {
                this.props.isTrading
                ? <button type="button" value="Start transaction" className="start" disabled={true}>
                <Spinner/>
                </button>
                :  <button type="button" value="Start transaction" className="start" onClick={this.props.nextStep.bind(this, this.props.amountBuyInput)}>
                START TRANSACTION
                </button>
              } 
            </section>
            }
          </React.Fragment>
        );
    };
}

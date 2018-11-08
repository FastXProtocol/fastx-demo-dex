import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { Ether, MKR, DAI, Done, AccountIcon, Attention } from './Icons';
import Spinner from './Spinner';
import TokenAmount from './TokenAmount';
import Congratulation from './Congratulation';
// import Congratulation from './Congratulation';
// import { etherscanUrl, quotation, toBigNumber, toWei } from '../helpers';

//const settings = require('../settings');

const tokens = {
  'eth': {
    icon: <Ether/>,
    symbol: "ETH",
    name: "Ether"
  },
  'mkr': {
    icon: <MKR/>,
    symbol: "MKR",
    name: "Maker"
  },
  'dai': {
    icon: <DAI/>,
    symbol: "DAI",
    name: "DAI",
  },
}

class DoTrade extends Component {

  render() {
    return (
      <section className="frame finalize">
        <div className="heading">
          <h2>Finalize Trade</h2>
        </div>
        <div className="info-box">
          <div className="info-box-row">
            <span className="holder">
              <span className="label">
                Currently Estimated Price
              </span>
              <TokenAmount number={this.props.trade.price}
                           token={`${this.props.trade.priceUnit.toUpperCase()}`}/>
            </span>
          </div>
        </div>
        <div className="content">
            <Congratulation {...this.props}/>
        </div>
        <button type="submit" value="Trade again"
                onClick={this.props.reset}>
          TRADE AGAIN
        </button>
      </section>

    )
  }
}

export default DoTrade;

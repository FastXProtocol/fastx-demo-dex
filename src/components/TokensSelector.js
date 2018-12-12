import React from 'react';
import TokenAmount from './TokenAmount';
import Spinner from './Spinner';

class TokensSelector extends React.Component {
  render() {
    let minorTokens = Object.keys(this.props.tokens)
    minorTokens.splice(minorTokens.indexOf('eth'),1)

    return (
      <div className="frame">
        <div className="token-selector">
          <button className="close" onClick={this.props.back}/>
          <div className="tokens-container">
            <div className="tokens">
              <div className="token-list">
                <div className='token' onClick={() => {
                  this.props.select('eth')
                }}>
                  <span className="token-icon">{this.props.tokens.eth.icon}</span>
                  {
                    (this.props.balances.eth >=0 )
                      ? <TokenAmount className="token-name" number={this.props.balances.eth.valueOf()}
                                      token={"ETH"}/>
                      : <Spinner/>
                  }
                </div>
                {
                  minorTokens.map((token, index) => {
                    return (
                      <div key={index} className='token' onClick={() => {
                        this.props.select(token)
                      }}>
                        <span className="token-icon">{this.props.tokens[token].icon}</span>
                        {
                          (this.props.balances[token] >=0 )
                            ? <TokenAmount className="token-name" number={this.props.balances[token].valueOf()}
                                            token={token.toUpperCase()}/>
                            : <Spinner/>
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TokensSelector;

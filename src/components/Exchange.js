import React, { Component } from 'react';
import SetTrade from './SetTrade';
import DoTrade from './DoTrade';
import { Grid, Message } from 'semantic-ui-react'

export default class Exchange extends Component {

    render() {
        let transactions = this.props.transaction
        let transactionChange = this.props.transactionChange
        let transactionHtml = transactions.map(function(v,index){
            let content = `您花费${v.eth} ETH交易到了${v.fastx} fastx`
            const handleDismiss = ()=>{
              transactions.splice(index, 1)
              transactionChange(transactions)
            }
            return <Message
            onDismiss={handleDismiss}
            content={content}
            key={index}
          />
        })

        return (
          <React.Fragment>
            {
              // this.props.step === 1 
              // ?
              // <SetTrade {...this.props} />
              // :
              // <DoTrade {...this.props} />
            }
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <SetTrade {...this.props} />
                </Grid.Column>
                <Grid.Column>
                  {transactionHtml}
                </Grid.Column>
              </Grid.Row>
            </Grid> 
          </React.Fragment>
        );
    };
}

import React, { Component } from 'react';
import SetTrade from './SetTrade';
import DoTrade from './DoTrade';
import { Grid, Message } from 'semantic-ui-react'

export default class Exchange extends Component {

    render() {
        let transactions = this.props.transaction
        let transactionChange = this.props.transactionChange
        let transactionHtml = transactions.map(function(v,index){

            let content = `You have bought ${v.bought[1]} ${v.bought[0]} with ${v.spend[1]} ${v.spend[0]}`
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
                <Grid.Column style={{'zIndex':'100'}}>
                  <SetTrade {...this.props} />
                </Grid.Column>
                <Grid.Column style={{'zIndex':'1'}}>
                  {transactionHtml}
                </Grid.Column>
              </Grid.Row>
            </Grid> 
          </React.Fragment>
        );
    };
}

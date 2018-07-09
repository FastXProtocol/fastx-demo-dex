import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Card, Container, Dimmer, Grid, Header, Image, Loader, Icon } from 'semantic-ui-react';

import Asset from '../components/Asset';
import * as assetsActions from '../actions/assets';

class Assets extends Component {
  componentWillMount() {
    this.props.assetsSearch('')
  }

  render() {
    const { error, search, assetsSearch, getAssets, assetsReceived, setAssetsFilter, getAssetDetail, ...rest} = this.props

    let assets = this.props.results;
    let listItems = assets.map((item, i) => {
        let url = '/assets/'+item.category+'/'+item.id;
        let auction = item.auction?item.auction:null;
        let current_price = 0;
        let starting_price = 0;
        let end;
        if(auction){
          current_price = auction.current_price;

          if(auction.discount != 0){
            starting_price = auction.starting_price;
          }

          if(auction.ending_at){
            end = auction.ending_at;
          }
        }

        return (
          <Grid.Column key={i} mobile={16} tablet={8} computer={4} onClick={() => this.props.toAssetDetail(url)}>
            <Asset image={item.image_url_cdn} end={end} name={item.name} id={item.id} startPrice={starting_price} curPrice={current_price}/>
          </Grid.Column>
        );
    });

    let loaderHtml = ""
    if(this.props.isLoading) {
        loaderHtml = <Dimmer active ><Loader >Loading</Loader></Dimmer>;
    }

    return (
     <div>
      <Container style={{ marginTop: '1em' }}>
        {loaderHtml}
        <Header as='h1'>Current Listings</Header>
        {
        // <Grid >
        //   <Grid.Row>
        //     <Grid.Column width={12}>
        //       <FilterSearch input={{ icon: 'search', iconPosition: 'left' }} placeholder='Search all crypto assets' fluid className='search-fluid' />
        //     </Grid.Column>
        //     <Grid.Column width={4}>
        //       <Dropdown selection options={assentsOptions} defaultValue={assentsOptions[0].value} onChange={setAssetsFilter} />
        //     </Grid.Column>
        //   </Grid.Row>
        // </Grid>
        }
        <Grid>
          {listItems}
        </Grid>
      </Container>
    </div>
    )
  }
}

function mapStateToProps(state){
    return {
        results: state.assets.results,
        error: state.assets.error,
        isLoading: state.assets.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
    	  toAssetDetail: (url) => dispatch(push(url)),
        ...bindActionCreators(assetsActions, dispatch)
    }
}

const AssetList = connect(
    mapStateToProps,
    mapDispatchToProps
)(Assets)

export default AssetList

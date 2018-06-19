import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'

export default class SearchStandard extends Component {
  componentWillMount() {
    this.props.assetsSearch('')
  }

  render() {
    const { search, assetsSearch, getAssets, assetsReceived, setAssetsFilter, getAssetDetail,assetBuy,getPublishStatus, ...rest} = this.props

    return (
      <Search
        onSearchChange={_.debounce(this.props.assetsSearch, 500, { leading: true })}
        showNoResults={false}
        {...rest}
      />
    )
  }
}
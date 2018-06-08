import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

export default class SearchStandard extends Component {
  componentWillMount() {
    this.props.assetsSearch('')
  }

  render() {
    const { search, assetsSearch, getAssets, assetsReceived, setAssetsFilter, ...rest} = this.props

    return (
      <Search
        onSearchChange={_.debounce(this.props.assetsSearch, 500, { leading: true })}
        showNoResults={false}
        {...rest}
      />
    )
  }
}
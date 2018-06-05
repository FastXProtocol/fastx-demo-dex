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
  componentWillMount() {}

  handleResultSelect = (e, { result }) => this.props.searchSelected(result.title)

  handleSearchChange = (e, { value }) => {
    this.props.searchStart(value)
    
    setTimeout(() => {
      if (this.props.value.length < 1) return this.props.resetData()

      const re = new RegExp(_.escapeRegExp(this.props.value), 'i')
      const isMatch = result => re.test(result.title)

      this.props.searchEnd(_.filter(source, isMatch))
    }, 300)
  }

  render() {
    const { isLoading, value, results, resetData, searchStart, searchEnd, searchSelected, ...rest} = this.props

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
        results={results}
        value={value}
        {...rest}
      />
    )
  }
}
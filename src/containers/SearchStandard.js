import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Search, Grid, Header } from 'semantic-ui-react'
import * as searchActions from '../actions/assets'
import SearchStandard from '../components/Search/SearchStandard'

function mapStateToProps(state){
    return {
       search: state.assets.search
    }
}

function mapDispatchToProps(dispatch) {
    return {
    	...bindActionCreators(searchActions, dispatch)
    }
}

const FilterSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchStandard)

export default FilterSearch
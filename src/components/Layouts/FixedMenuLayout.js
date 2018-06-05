import _ from 'lodash';
import React from 'react';
import faker from 'faker';
import { Card, Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Icon } from 'semantic-ui-react';
import FilterSearch from '../../containers/SearchStandard';
import { assentsOptions } from '../Common';
import '../Search/Search.css';
import '../Card.css';

const cards = _.times(6, i => (
  <Grid.Column key={i} mobile={16} tablet={8} computer={4}>
    <Card>
      <Image src='/assets/images/avatar/large/elliot.jpg' />
      <div className='card-duration'>
        <Icon name='clock outline' />
        19 hours left
      </div>
      <Card.Content>
        <Card.Header>
          Matthew · #7127  
        </Card.Header>
        <Card.Meta>
          <span>Pre. ㆔ 0.01</span>
          <span style={{ color: 'dodgerblue',float: 'right' }}>NOW: ㆔ 1.07</span>
        </Card.Meta>
      </Card.Content>
    </Card>
  </Grid.Column>
))

const FixedMenuLayout = () => (
  <div>
    <Container style={{ marginTop: '7em' }}>
      <Grid >
        <Grid.Row>
          <Grid.Column width={12}>
            <FilterSearch input={{ icon: 'search', iconPosition: 'left' }} placeholder='Search all crypto assets' fluid className='search-fluid' />
          </Grid.Column>
          <Grid.Column width={4}>
            <Dropdown selection options={assentsOptions} defaultValue={assentsOptions[0].value}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        {cards}
      </Grid>
    </Container>
  </div>
)

export default FixedMenuLayout

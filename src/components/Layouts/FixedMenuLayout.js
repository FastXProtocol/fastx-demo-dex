import _ from 'lodash';
import React from 'react';
import { Card, Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react';

const cards = _.times(6, i => (
  <Grid.Column key={i} mobile={16} tablet={8} computer={4}>
  <Card
    image='/assets/images/avatar/large/elliot.jpg'
    header='Elliot Baker'
    meta='Friend'
    description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
  />
  </Grid.Column>
))

const FixedMenuLayout = () => (
  <div>

    <Container style={{ marginTop: '7em' }}>
      <Header as='h1'>Semantic UI React Fixed Template</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>A text container is used for the main container, which is useful for single column layouts.</p>

      <Grid>
        {cards}
      </Grid>

    </Container>
  </div>
)

export default FixedMenuLayout

import React, { Component } from 'react';
import { Card, Container, Dimmer, Grid, Header, Image, Loader, Icon } from 'semantic-ui-react';
import moment from 'moment';
import './Card.css';

export default class Asset extends Component {

  render() {
	let preHtml, nowHtml, dateHtml;
	let diffDate;
	let end = this.props.end;

	if(this.props.curPrice){
		preHtml = 'New!';
		if(this.props.startPrice){
			preHtml = 'Pre. ㆔ ' + this.props.startPrice;
		}
		nowHtml = <span style={{ color: 'dodgerblue',float: 'right' }}>NOW: ㆔  {this.props.curPrice}</span>;
	}

	if(end){
		diffDate = moment(end*1000).diff(moment(), 'days');
	    dateHtml = <div className='card-duration'><Icon name='clock outline' /> { diffDate } days left</div>;
		if(diffDate>30){
			diffDate = moment(end*1000).diff(moment(), 'months');
			dateHtml = <div className='card-duration'><Icon name='clock outline' /> { diffDate } months left</div>;
		}else if(diffDate<1){
			diffDate = moment(end*1000).diff(moment(), 'hours');
			dateHtml = <div className='card-duration'><Icon name='clock outline' /> { diffDate } hours left</div>;
		}
	}

    return (
		<Card>
			<Image src={this.props.image} />
			{ dateHtml }
			<Card.Content>
				<Card.Header>
					{this.props.name} · #{this.props.id}
				</Card.Header>
				<Card.Meta>
					<span>{ preHtml }</span>
					<span>{ nowHtml }</span>
				</Card.Meta>
			</Card.Content>
		</Card>
    )
  }
}
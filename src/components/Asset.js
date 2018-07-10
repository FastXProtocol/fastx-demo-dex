import React, { Component } from 'react';
import { Button, Card, Image, Icon } from 'semantic-ui-react';
import moment from 'moment';
import './Card.css';

export default class Asset extends Component {

  render() {
	let preHtml, nowHtml, dateHtml, btnHtml;
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

    if(this.props.showBtn === 'FastX'){
        btnHtml = <Button size='small' floated='right' style={{marginTop:'1em'}} color='teal' onClick={this.props.takeOut}>取出</Button>
    }else if(this.props.showBtn === 'Ethereum'){
        btnHtml = <Button size='small' floated='right' style={{marginTop:'1em'}} color='teal' onClick={this.props.takeOut}>存入</Button>
    }

    return (
		<Card >
			<Image src={this.props.image} onClick={this.props.onClick} />
			{ dateHtml }
			<Card.Content>
				<Card.Header>
					{this.props.name} · #{this.props.id}
				</Card.Header>
				<Card.Meta>
					<span>{ preHtml }</span>
					<span>{ nowHtml }</span>
                    { btnHtml }
				</Card.Meta>
			</Card.Content>
		</Card>
    )
  }
}

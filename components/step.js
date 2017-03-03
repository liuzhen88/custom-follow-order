/*
*	name:步骤图
*	author: liuzhen
*	time: 2017/3/3
*/
import React from 'react';
import $ from 'jquery';
import Title from './title';
import config from './config';
import { Steps } from 'antd';

const Step = Steps.Step;
const serverUrl = config.serverUrl;

let StepComponent = React.createClass({
	getInitialState() {
		return {
			direction:'vertical',
			current:4,
			list:[]
		}	
	},
	componentDidMount() {
		let that = this;
		let query = this.props.location.query;
		$.ajax({
			url:serverUrl+'/getStepData',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:query,
			success:function(data){
				let msg = data.data;
				that.setState({
					list:msg
				});
			}
		});	
	},
	render() {
		return (
			<div>
				<Title/>
				<div className='step-container'>
					<Steps
						direction={this.state.direction}
						current={this.state.current}
					>
						{
							this.state.list.map(function(item){
								return <Step
											title={item.title}
											description={item.description}
											key={item.title+item.description}
										/>
							})
						}
					</Steps>
				</div>
			</div>
		)
	}
});

export default StepComponent;
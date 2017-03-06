/*
*	name:订单状态表一级
*	author: liuzhen
*	time: 2017/2/27
*/
import React from 'react';
import $ from 'jquery';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import { Link } from 'react-router';
import actions from '../actions/action';
import Title from './title';
import config from './config';

const { Column } = Table;
const serverUrl = config.serverUrl;

let OrderStatus = React.createClass({
	getInitialState() {
		let tenants = this.props.tenant;
		return {
			jgzj:[],
			ddh:[],
			status:['未完工','已完工'],
			defaultOrderNum:'全部',
			tenant:tenants
		}	
	},
	componentDidMount() {
		let that = this;
		let tenants = this.props.tenant;
		let mobile = localStorage.getItem('mobile');
		let list = {
			mobile:mobile,
			tenant:JSON.stringify(tenants),
			jgzj:'全部',
			ddh:'全部',
			status:'全部'
		}
		this.props.dispatch(actions.orderStatusAsync(list));
		$.ajax({
			url:serverUrl + '/getOrderStatusSelect',
			type:'get',
			data:{
				tenant:JSON.stringify(tenants),
				mobile:mobile
			},
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				that.setState({
					ddh:data.ddh,
					jgzj:data.jgzj
				});
			}
		});
	},
	handleSearch(){
		let tenants = this.props.tenant;
		let mobile = localStorage.getItem('mobile');
		let selectTenant = document.getElementById('zh').value;
		if(selectTenant == '全部'){
			var sendTenant = tenants;
		}else{
			var sendTenant = [selectTenant];
		}
		this.props.dispatch(actions.orderStatusAsync({
			jgzj:document.getElementById('jgzj').value,
			ddh:document.getElementById('ddh').value,
			status:document.getElementById('zt').value,
			mobile:mobile,
			tenant:JSON.stringify(sendTenant)
		}));
	},
	render(){
		return (
			<div>
				<Title/>
				<div className='time-container'>
					<div className='selection'>
						<span>订单号 : </span>
						<select className='select' id='ddh' defaultValue={this.state.defaultOrderNum}>
							<option value='全部'>全部</option>
							{
								this.state.ddh.map(function(item){
									return <option key={item} value={item}>{item}</option>
								})
							}
						</select>
					</div>
					<div className='selection'>
						<span>结构直径 : </span>
						<select className='select' id='jgzj' defaultValue='全部'>
							<option value='全部'>全部</option>
							{
								this.state.jgzj.map(function(item){
									return <option key={item} value={item}>{item}</option>
								})
							}
						</select>
					</div>
					<div className='selection'>
						<span>状态 : </span>
						<select className='select' id='zt' defaultValue='全部'>
							<option value='全部'>全部</option>
							{
								this.state.status.map(function(item){
									return <option key={item} value={item}>{item}</option>
								})
							}
						</select>
					</div>
					<div className='selection'>
						<span>租户 : </span>
						<select className='select' id='zh' defaultValue='全部'>
							<option value='全部'>全部</option>
							{
								this.state.tenant.map(function(item){
									return <option key={item} value={item}>{item}</option>
								})
							}
						</select>
					</div>
					<Button type="primary" icon="search" id='search' onClick={this.handleSearch}>查询</Button>
					<div className='clear'></div>
				</div>
				<div className='table-container'>
					<div className='table-cont'>
						<Table
							dataSource={this.props.orderStatus.dataSource}
							loading={this.props.orderStatus.loading}
							scroll={{ x: config.orderStatusScroll}}
							pagination={{
								total:this.props.orderStatus.pagination.total,
								showSizeChanger:true,
								pageSizeOptions:config.pageSizeOptions
							}}
						>
							{
								this.props.orderStatus.columns.map(function(item){
									return  <Column
												title={item.title}
												dataIndex={item.dataIndex}
												key={item.title}
											>
											</Column>
								})
							}
							<Column
								title='操作'
								key='action'
								render={(text, record) => (
									<Link to={
										{
											pathname:'/combineProductPlan',
											query:{
												id:record.id,
												jgzj:record.jgzj,
												status:record.status,
												cpbh:record.cpbh,
												lx:record.lx,
												tenant:record.tenant
											}
										}
									}>
										查看
									</Link>
								)}
							>
							</Column>
							<Column
								title="步骤图"
								key='actions'
								render={(text, record) => (
									<Link to={
										{
											pathname:'/step',
											query:{
												id:record.id,
												jgzj:record.jgzj,
												status:record.status,
												cpbh:record.cpbh,
												lx:record.lx,
												tenant:record.tenant
											}
										}
									}>
										查看
									</Link>
								)}
							>
							</Column>
						</Table>
					</div>
				</div>
			</div>
		)
	}
});

const mapStateToProps = (state) => {
	return {
		tenant:state.tenant,
		orderStatus:state.orderStatus
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

OrderStatus = connect(mapStateToProps)(OrderStatus);

export default OrderStatus;
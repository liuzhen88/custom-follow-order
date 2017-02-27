import React from 'react';
import $ from 'jquery';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { Link } from 'react-router';
import actions from '../actions/action';
import Title from './title';
import config from './config';

const { Column } = Table;
const serverUrl = config.serverUrl;

let OrderStatus = React.createClass({
	componentDidMount() {
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
		console.log(this.props.orderStatus);
	},
	render(){
		return (
			<div>
				<Title/>
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
												lx:record.lx
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
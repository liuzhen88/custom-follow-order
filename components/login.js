import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import { message } from 'antd';
import {createHashHistory} from 'history';
import config from './config';
import headerImage from 'url?limit=10000!../images/header.png';
import actions from '../actions/action';

const serverUrl = config.serverUrl;
const history = createHashHistory();

let Login = React.createClass({
	getInitialState() {
		let width = $(window).width();
		let height = $(window).height();
		let mobile = localStorage.getItem('mobile') ? localStorage.getItem('mobile') : '';
		return {
			value:mobile,
			win:{
				width:width,
				height:height
			}
		}	
	},
	authLogin(){
		let that = this;
		let mobile = this.state.value;
		$.ajax({
			url:serverUrl+'/checkMobile',
			type:'get',
			data:{
				mobile:mobile
			},
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				if(data.code == '200'){
					let tenants = data.data.userTenants;
					that.props.dispatch(actions.tenantAction(tenants));
					localStorage.setItem('mobile',mobile);
					history.push('/');
					history.replace('/orderStatus');
				}else{
					let warningMessage = data.message;
					message.warning(warningMessage);
				}
			}
		});
	},
	changeMobile(e){
		let value = e.target.value;
		this.setState({
			value:value
		});
	},
	render(){
		return (
			<div className='container' style={this.state.win}>
				<div className='header'>
					<img src={headerImage}/>
				</div>
				<h1 className='title'>客户跟单</h1>
				<div className="username">
					<span className='span'>手机号</span>
					<input className="input" 
						id='username' 
						value={this.state.value} 
						placeholder='请输入手机号'
						onChange={this.changeMobile}
					/>
				</div>
				<div id='btn' onClick={this.authLogin}>登录</div>
			</div>
		)
	}
});

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

Login = connect(mapStateToProps)(Login);

export default Login;
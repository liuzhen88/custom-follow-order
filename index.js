import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route , hashHistory } from 'react-router';
import Login from './components/login';
import OrderStatus from './components/order_status';
import CombineProductPlan from './components/combine_product_plan';
import store from './store/store';
import './style/app.css';

render (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' components={Login}></Route>
			<Route path='/login' components={Login}></Route>
			<Route path='/orderStatus' components={OrderStatus}></Route>
			<Route path='/combineProductPlan' components={CombineProductPlan}></Route>
		</Router>
	</Provider>,
	document.getElementById('root'),
	function(){
		console.log("react.js SPA app start success");
	}
)
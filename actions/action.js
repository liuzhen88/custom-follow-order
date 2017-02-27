import $ from 'jquery';
import config from '../components/config';

let tenantAction = (data) => {
	return {
		type:'CHANGE_TENANT',
		data:data
	}
}

let orderStatusAsync = (list) => {
	return function(dispatch,getState){
		const serverUrl = config.serverUrl + '/getOrderStatus';
		$.ajax({
			url:serverUrl,
			type:'get',
			data:list,
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				let orderStatus = data.data.orderStatus;
				dispatch(orderStatusAction(orderStatus))
			}
		});
	}
}

let orderStatusAction = (data) => {
	return {
		type:'ORDER_STATUS',
		data:data
	}
}

export default {
	tenantAction,
	orderStatusAsync
}
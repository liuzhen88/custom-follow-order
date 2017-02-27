import { combineReducers } from 'redux';

const tenantReducer = (state='',action) => {
	switch(action.type){
		case "CHANGE_TENANT":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

const orderStatusReducer = (state='',action) => {
	switch(action.type){
		case "ORDER_STATUS":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let rootReducer = combineReducers({
	tenant:tenantReducer,
	orderStatus:orderStatusReducer
});

export default rootReducer;
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/reducers';

let initStore = {
	tenant:[],
	orderStatus:{
		columns:[],
		dataSource:[],
		pagination:{
			total:0
		},
		loading:true
	}
};

let store = createStore(
	reducers,
	initStore,
	applyMiddleware(thunk)
);

export default store;
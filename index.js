import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

render (
	<App/>,
	document.getElementById('root'),
	function(){
		console.log("react.js SPA app start success");
	}
)
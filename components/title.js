import React from 'react';
import back from 'url?limit=10000!../images/back.png';

let Title = React.createClass({
	goBack(){
		history.back();
	},
	render(){
		return (
			<div className='react-title'>
				客户跟单
				<div className='back' onClick={this.goBack}>
					<img src={back} width='20px'/>
				</div>
			</div>
		)
	}
});

export default Title;
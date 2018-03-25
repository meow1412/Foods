 import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route ,hashHistory} from 'react-router';


import PCIndex from './pcindex.js';
import Caipu from './pc/caipu/caipu.js';
import Mycaipu from './pc/caipu/mycaipu.js';
import Shicai from './pc/shicai/shicai.js';
import Jiankang from './pc/jiankang/jiankang.js';
import Shequ from './pc/shequ/shequ.js';
import Caipuxq from './pc/caipu/caipuxq.js';
import Collect from './pc/collect/collect.js';
import Searchpage from './pc/homepage/searchpage.js';

// 设计好所需的模块
class Root extends React.Component{
	render(){
		return (
			<div>
				<Router history={hashHistory}>
					<Route path="/" component={PCIndex}></Route>
					<Route path="/caipu" component={Caipu}></Route>
					<Route path="/mycaipu" component={Mycaipu}></Route>
					<Route path="/shicai" component={Shicai}></Route>
					<Route path="/jiankang" component={Jiankang}></Route>
					<Route path="/shequ" component={Shequ}></Route>
					<Route path="/searchpage/:searchValue" component={Searchpage}></Route>
					<Route path="/collect/:indexLi" component={Collect}></Route>
					<Route path="/caipuxq/:cpid" component={Caipuxq}></Route>
				</Router>
			</div>
		);
	}
}
ReactDOM.render(<Root />,document.querySelector("#wrap"));


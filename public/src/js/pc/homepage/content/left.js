import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
// import { Row, Col } from 'antd';
// import 'antd/dist/antd.css';

//轮播图-左侧li
export default class Left extends React.Component{
	render(){
		return (
			<ul className="header_left_wrap">				
				<Link to={`/caipu`}><li>美味菜谱</li></Link>
				<Link to={`/shicai`}><li>新鲜食材</li></Link>
				<Link to={`/jiankang`}><li>饮食健康</li></Link>
				<Link to={`/shequ`}><li>美食社区</li></Link>	
			</ul>
		)
	}
}

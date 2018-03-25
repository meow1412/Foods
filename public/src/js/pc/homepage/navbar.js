import React from 'react';
import {Row,Col,Input,Button,Icon} from 'antd';

import {Link,hashHistory} from 'react-router';


const Search = Input.Search;

export default class Navbar extends React.Component{
	constructor(){
		super();
		this.state = {
			searchValue:''
		}
	}
	render(){
		return (
			<Row>
				<Col span={2}>
				</Col>
				<Col span={4}>
					<div>
						<div className="navbarLogin">美食网</div>
					</div>
				</Col>
				<Col span={10}>
				<ul className="navbarUL">
					<li><Link to={`/`}>首页</Link></li>
					<li><Link to={`/caipu`}>美味菜谱</Link></li>
					<li><Link to={`/shicai`}>新鲜食材</Link></li>
					<li><Link to={`/jiankang`}>饮食健康</Link></li>
					<li><Link to={`/shequ`}>美食社区</Link></li>	
				</ul>
				</Col>
				<Col span={6}>
					<Link to={`/mycaipu`}><button className="fabu">发布菜谱+</button></Link>
					<Search
			    		placeholder="请输入关键字"
			    		style={{ width: 220 ,height: 30 ,float:"right",marginTop:25,marginRight:10}}
			    		onSearch={this._search.bind(this)} />
				</Col>
				<Col span={2}>
				</Col>
			</Row>
		)
	}
	_search(value){
		console.log(value)
		hashHistory.push(`/searchpage/${value}`);

	}
}

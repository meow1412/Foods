import React from 'react';
import {Row,Col} from 'antd';

import {Link} from 'react-router';

export default class Material extends React.Component{
	constructor(){
		super();
		this.state={
			data:[],
			TJcolor:0,
			type:"zxtj"
		}
	}
	componentDidMount(){
		var url = "/shicai";
		fetch(url)
		.then((response)=>{
			return response.json()
		})
		.then((json)=>{
			this.setState({
				data:json
			})
		})
	}
	render(){
		var contentli = this.state.data.length?this.state.data.map((item,index)=> {
			return (
					<Link to={`/Caipuxq`} key={index}>
					<li>
						<img className="gzcaipuIMG" src={item.scimg} />
						<span>{item.scname}</span>
					</li>
					</Link>);
		}):(<div>加载中...</div>)
		return (
			<div>
				{/*当季食材*/}
				<div className="TJCP">
					<b className="cpsc">当季食材</b>
				</div>
				{/*今日推荐*/}
				<div className="sysc">
					{contentli}
				</div>
			</div>
		)	
	}
	TJstyle(index){
		var that=this;
		return function(){
			console.log(index)
		that.setState({
			TJcolor:index
		})

		}
	}
}

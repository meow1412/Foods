import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import { Row, Col ,Input} from 'antd';
import 'antd/dist/antd.css';

var array = ["最新推荐","最新发布","热菜","凉菜","主食","小吃","西餐","自制食材"];
export default class Caipuli extends React.Component{
	constructor(){
		super();
		this.state={
			data:[],
			TJcolor:0,
			type:"zxtj"
		}
	}
	componentDidMount(){
		var url = "/caipu?type="+this.state.type;
		fetch(url)
		.then((response)=>{
			return response.json()
		})
		.then((json)=>{
			if(json.length>0)
			{
				this.setState({
					data:json
				})
			}
		})
	}
	render(){
		var content = array.map((item, index) =>
		{
			return (<li key={index} style={{color:this.state.TJcolor==index?"#ff6767":"#666"}} onClick={this.TJstyle(index).bind(this)}>{item}</li>)
		})
		var contentli = this.state.data.length?this.state.data.map((item,index)=> {
			return (
					<Link to={`/Caipuxq/${index+1}`} key={index}><li>
						<img src={item.cpimg} />
						<p>{item.cpdishes}</p>
						<span>{item.cpauthor}</span>
					</li></Link>);
		}):(<div>加载中...</div>)
		return (
			<div>
				{/*最新推荐*/}
				<div className="zxtj">
					{content}
				</div>
				{/*各种菜谱li*/}
				<ul className="gzcaipu">
					{contentli}
				</ul>
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

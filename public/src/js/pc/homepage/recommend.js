import React from 'react';
import {Row,Col} from 'antd';

import {Link} from 'react-router';


var array = ["今日推荐","美妙早餐","绝佳午餐","可口晚餐","全部菜谱"];
export default class Recommend extends React.Component{
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
		var title = array.map((item,index) =>{
			return (<li key={index} style={{color:this.state.TJcolor==index?"#ff6767":"#666"}} onClick={this.TJstyle(index).bind(this)}>{item}</li>)
		})
		var contentli = this.state.data.length?this.state.data.map((item,index)=> {
			if(index<9)
			{
				return (
				 	<Link to={`/Caipuxq/${index+1}`} key={index}>
				 	<li>
				 		<img className="gzcaipuIMG" src={item.cpimg} />
				 		<p>{item.cpdishes}</p>
				 		<span>{item.cpauthor}</span>
				 	</li>
				 	</Link>);
			}
		}):(<div>加载中...</div>)
		return (
			<div>
				{/*今日推荐导航栏*/}
				<div className="TJCP">
					<b className="cpsc">推荐菜谱</b>
					{title}
				</div>
				{/*今日推荐*/}
				<div className="sycaipu">
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

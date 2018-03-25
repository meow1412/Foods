import React from 'react';
import {Row,Col,Input,Icon,Button,message} from 'antd';
import {Link} from 'react-router';

import Ptap from './p.js';
export default class Mycaipu extends React.Component{
	constructor(){
		super();
		this.state={
			data:''
		}
	}
	componentDidMount(){
		this._selcollect();
	}	
	render(){
		// 	// console.log(this.state.datasc);
		// // var arr;
		// // // console.log("this.state.datasc",this.state.datasc)
		// var sc  = this.state.datasc.length?this.state.datasc.map((item2, index2)=>{

		// 	return (
		// 		<p key={index2}>{item2.scname}</p>
		// 		)
		// }):<p>dab</p>
		// // for(var i=0;i<this.state.datasc.length;i++)
		// // {
		// // 	arr.push()
		// // }
		// // console.log(arr)
		var collectLi = this.state.data.length?this.state.data.map((item, index)=>{
		// 	this.state.datasc.length?this.state.datasc.map((item1, index1)=>{
		// 		arr=[];
		// 		arr.push(item1.scname)
		// }):"aa"
		// console.log(item.cpdishes)
		return 	(
				<li  key={index}>
				<div style={{float:"left",width:"80%"}}>
					<Link to={`/Caipuxq/${item.cpid}`}>
					<img style={{float:"left",display:"block",width:140,height:140,borderRadius:5,marginLeft:20}} src={item.cpimg} />
					</Link>
					<div style={{float:"left",width:500,height:"100%",paddingLeft:20}}>
						<Link to={`/Caipuxq/${item.cpid}`}>
						<h1 className="collectLiTitle">{item.cpdishes}</h1>
						</Link>
						<span className="collectSpan">{item.cpauthor}</span>
						<p>原料：</p><Ptap data={item.cpid}/>
					</div>
				</div>
				<div style={{float:"right",width:"20%"}}>
					<div className="Remove" onClick={this._delete.bind(this,item.cpid)}>移除</div>
				</div>
			</li>
			);
		}):<div>暂无数据</div>
		return (
			<div className='CollectRight'>
				<ul className='CollectRight-navigation'>
					<li>我的菜谱</li>
				</ul>
				<ul className='CollectRight-content'>
					{collectLi}
				</ul>								
			</div>
		)
	}
	_selcollect(){
		fetch("/mycaipuSELECTuserId?userId="+localStorage.userId)
			.then((response)=>{
				return response.json()
			})
			.then((json)=>{
				// console.log("json",json)
				if(json.length)
				{
					this.setState({
						data:json
					})
					// for(var i =0;i<json.length;i++)
					// {
					// 	fetch("/caipuxq_material?cpid="+json[i].cpid)
					// 	.then((response2)=>{
					// 		return response2.json()
					// 	})
					// 	.then((json2)=>{
					// 		console.log("json2",json2)
					// 		if(json2.length)
					// 		{
					// 			this.setState({
					// 				datasc:json2
					// 			})
								
					// 			return (
					// 			<p key={index2}>{item2.scname}</p>
					// 			)
					// 			}):<p>dab</p>
					// 		}
					// 		else
					// 		{
					// 			this.setState({
					// 				datasc:''
					// 			})
					// 		}
					// 	})
					// }
				}
				else
				{
					this.setState({
						data:''
					})
				}
			})
	}
	_delete(cpid){
		fetch("/mycaipuDELETE?cpid="+cpid)
		.then((response)=>{
			return response.json()
		})
		.then((json)=>{
			if(json.isdel == '删除成功')
			{
				this._selcollect();
				message.success(json.isdel);
			}
		})
	}
}
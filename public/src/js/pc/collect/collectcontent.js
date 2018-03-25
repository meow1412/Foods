import React from 'react';
import {Row,Col,message} from 'antd';

import {Link} from 'react-router';

import Ptap from './p.js';
export default class Changepassword extends React.Component{
	constructor(){
		super();
		this.state={
			data:[],
			username:"",
		}
	}
	componentDidMount(){
		this._selcollect();
	}	
	render(){
		// console.log(this.state.data)
		var collectLi = this.state.data.length?this.state.data.map((item, index)=>{
				// console.log(index)
		return 	(
				<li  key={index}>
				<div style={{float:"left",width:"80%"}}>
					<Link to={`/Caipuxq/${item[0].cpid}`}>
					<img style={{float:"left",display:"block",width:140,height:140,borderRadius:5,marginLeft:20}} src={item[0].cpimg} />
					</Link>
					<div style={{float:"left",width:500,height:"100%",paddingLeft:20}}>
						<Link to={`/Caipuxq/${item[0].cpid}`}>
						<h1 className="collectLiTitle">{item[0].cpdishes}</h1>
						</Link>
						<span className="collectSpan">{item[0].cpauthor}</span>
						<p>原料：</p><Ptap data={item[0].cpid}/>
					</div>
				</div>
				<div style={{float:"right",width:"20%"}}>
					<div className="Remove" onClick={this._delete.bind(this,item[0].cpid)}>移除</div>
				</div>
			</li>
			);
		}):<div>暂无数据</div>
		return (
			<div className='CollectRight'>
				<ul className='CollectRight-navigation'>
					<li>菜谱</li>
				</ul>
				<ul className='CollectRight-content'>
					{collectLi}
				</ul>								
			</div>
		)
	}
	_selcollect(){
		// console.log(1)
		fetch("/collectSELECTusername?username="+localStorage.userName)
			.then((response)=>{
				return response.json()
			})
			.then((json)=>{
				if(json.length)
				{
					var arr=[];
					json.map((item3, index3)=> {
						fetch("/caipuxq?cpid="+item3.cpid)
							.then((response3)=>{
								return response3.json()
							})
							.then((json3)=>{
								if (json3.length>0)
								{
									arr.push(json3)
									this.setState({
										data:arr
									})
								}
							})
					})
				}
				else
				{
					this.setState({
						data:[]
					})
				}
			})
	}
	_delete(index){
		fetch("/collectDELETE?cpid="+index)
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
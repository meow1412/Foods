import React from 'react';
import {Row,Col,Input,Icon,Button,message} from 'antd';

import {Link} from 'react-router';

export default class Ptap extends React.Component{
	constructor(){
		super();
		this.state={
			data:''
		}
	}
	componentDidMount(){
		var cpid = this.props.data;
		fetch("/caipuxq_material?cpid="+cpid)
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
		var sc = this.state.data.length?this.state.data.map((item, index)=>{
			return (
				<p style={{display:"inline-block"}} key={index}>{item.scname}、</p>
				);
		}):<p>未知</p>
		return (
			<div>
			{sc}
			</div>
		)
	}
}
import React from 'react';
import {Row,Col,Input,Icon,Radio,Button,message} from 'antd';
const RadioGroup = Radio.Group;

import {Link} from 'react-router';
import Uploadface from './uploadface';

export default class Changeuserinformation extends React.Component{
	constructor(){
		super();
		this.state={
			data:'',
			nickname:localStorage.userNickname,
			face:localStorage.userFace,
			Newsex:1,
			Newnickname:'',
			Newaddress:'',
			Newemail:''
		}
	}
	componentDidMount(){
		fetch("/usersInformationShow?userid="+localStorage.userId)
		.then((response)=>{
			return response.json()
		})
		.then((json)=>{
			this.setState({
				Newsex:parseInt(json[0].sex),
				Newnickname:json[0].nickname,
				Newaddress:json[0].address,
				Newemail:json[0].email
			})
			localStorage.userNickname=json[0].nickname
		})	
	}	
	render(){
		return (
			<div className="information">
				<h2 style={{fontWeight:"bold",textIndent:"2em",marginBottom:20}}>修改资料：</h2>
				<Row>
				<Col span={12}>
					<div className="Informatleft">
				    	<RadioGroup style={{width:"100%",height:30,float:"left"}} onChange={this._Sex.bind(this)} value={this.state.Newsex}>
	        				<Radio value={1}>男</Radio>
	        				<Radio value={2}>女</Radio>
	   					</RadioGroup>
						<label>昵称:</label><Input placeholder="昵称" onChange={this._Nickname.bind(this)} value={this.state.Newnickname} />
						<label>地址:</label><Input placeholder="输入地址" onChange={this._Address.bind(this)} value={this.state.Newaddress} />
						<label>邮箱:</label><Input placeholder="电子邮箱" onChange={this._Email.bind(this)} value={this.state.Newemail} />
						<Button onClick={this._SetSave.bind(this)}type="primary">保存修改</Button>
					</div>
				</Col>
				<Col span={12}>
					<Uploadface />
				</Col>
				</Row>
			</div>
		)
	}
	_Sex(e){
		this.setState({
			Newsex:e.target.value
		})
	}
	_Nickname(e){
		this.setState({
			Newnickname:e.target.value
		})
	}
	_Address(e){
		this.setState({
			Newaddress:e.target.value
		})
	}
	_Email(e){
		this.setState({
			Newemail:e.target.value
		})
	}
	_SetSave(){
		fetch("/usersusersInformationChange?username="+localStorage.userName+"&sex="+this.state.Newsex+"&nickname="+this.state.Newnickname+"&address="+this.state.Newaddress+"&email="+this.state.Newemail)
		.then((response)=>{
			return response.json()
		})
		.then((json)=>{
			message.success("用户资料修改成功")
		})			
		window.location.reload();
	}
}
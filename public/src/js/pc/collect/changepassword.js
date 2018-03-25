import React from 'react';
import {Row,Col,Input,Icon,Button,message} from 'antd';

import {Link} from 'react-router';

export default class Changepassword extends React.Component{
	constructor(){
		super();
		this.state={
			data:[],
			initeValue:"",
			username:"",
			OldPassword:"",
			NewPassword:"",
			NewPasswordAgain:""
		}
	}
	render(){
		return (
			<div className="passwordPage">
				<Row>
					<Col span={4}>
					</Col>
					<Col span={8}>
						<h2>修改密码：</h2>
					</Col>
					<Col span={12}>
					</Col>
				</Row>
				<Row>
					<Col span={4}>
					</Col>
					<Col span={8}>
						<Input placeholder="请输入旧密码" type="password" onBlur={(e)=>{this.setState({OldPassword:e.target.value}) }}/>
					</Col>
					<Col span={12}>
					</Col>
				</Row>
				<Row>
					<Col span={4}>
					</Col>
					<Col span={8}>
						<Input placeholder="请输入新密码" type="password" onBlur={(e)=>{this.setState({NewPassword:e.target.value}) }}/>
					</Col>
					<Col span={12}>
					</Col>
				</Row>
				<Row>
					<Col span={4}>
					</Col>
					<Col span={8}>
						<Input placeholder="再次确认密码" type="password" onBlur={(e)=>{this.setState({NewPasswordAgain:e.target.value}) }}/>
					</Col>
					<Col span={12}>
					</Col>
				</Row>
				<Row>
					<Col span={4}>
					</Col>
					<Col span={8}>
						<Button style={{width:320,height:40,marginTop:20,borderRadius:50}} type="primary" onClick={this._savepasswored.bind(this)}>保存修改</Button>
					</Col>
					<Col span={12}>
					</Col>
				</Row>
			</div>
		)
	}
	_savepasswored(){
		fetch("/usersInformation?username="+localStorage.userName+"&password="+this.state.OldPassword)
		.then((response)=>{
			return response.json()
		})
		.then((json)=>{
			if(json.length>0)
			{
				if(this.state.NewPassword==""||undefined||null)
				{
					message.error("新密码不能为空！")
				}
				else
				{
					if(this.state.NewPassword==this.state.NewPasswordAgain)
					{
						fetch("/usersPasswordChange?username="+localStorage.userName+"&password="+this.state.NewPassword)
						.then((response)=>{
							return response.json()
						})
						.then((json)=>{
							message.success("修改密码成功！")
						})
					}
					else
					{
						message.error("两次新密码输入不一致！")
					}
				}
			}
			else
			{
				message.error("旧密码输入错误，请重新输入！")
			}
		})
	}
}
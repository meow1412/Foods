import React from 'react';
import ReactDOM from 'react-dom';

import { 
	Row,
 	Col,
	Icon,
	Form,
 	Input,
 	Modal,
 	Dropdown,
 	Menu,
 	Button,
	message,
	Checkbox,
	Affix
	} from 'antd';
import {Link} from 'react-router';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

class Header extends React.Component{
	constructor(){
		super();
		this.state = {
			visibleRegist:false,
			visibleLogin:false,
			id:localStorage.userId,
			username:localStorage.userName,
			face:localStorage.userFace,
			nickname:localStorage.userNickname,
			loginSuccess:false
		}
	}
	componentDidMount(){
		this.setState({loginSuccess:localStorage.userName?true:false});
	}
	render(){
		var Nickname = this.state.nickname!="null"?this.state.nickname:this.state.username;
		var headIMG = localStorage.userFace!="null"?localStorage.userFace:("https://misc.360buyimg.com/mtd/pc/common/img/no_login.jpg");
		var {getFieldDecorator} = this.props.form;
		const menu = (
		  <Menu style={{backgroundColor:"#333"}}>
		    <Menu.Item>
		      <span target="_blank"><Link style={{color:"skyblue"}} to={`/collect/0`}>个人中心</Link></span>
		    </Menu.Item>
		    <Menu.Item >
		      <span  target="blank"><Link style={{color:"#fff"}} to={`/collect/2`}>我的收藏</Link></span>
		    </Menu.Item>
		    <Menu.Item>
		      <span onClick={this.LoginOUT.bind(this)}><Link style={{color:"#fff"}} to={`/`}>退出</Link></span>
		    </Menu.Item>
		  </Menu>
		);
		var loginContent = this.state.loginSuccess == true?
		<div className="LoginOrNot">
			<img className="touxiang fr" src={headIMG} />		
			<Dropdown  overlay={menu} placement="bottomCenter">
	   			<a className="ant-dropdown-link" href="#">
	   				<div className="username" style={{color:"yellow"}}>
	      				{Nickname}<Icon type="down" />
	      			</div>
	   			</a>
	  		</Dropdown>
		</div>
		:
  		<div className="LoginOrNot">
			<div onClick={this.Login.bind(this)} className="login fr">登录</div>
			<div onClick={this.Regist.bind(this)} className="register fr">注册</div>
  		</div>
		return (
			<Affix>
			<div className="header">
				<div className="header_logo Header_FS fl">美食网</div>
				<ul className="header_ul Header_FS fl">
					<li><Link to={`/`}>首页</Link></li>
					<li><Link to={`/caipu`}>美味菜谱</Link></li>
					<li><Link to={`/shicai`}>新鲜食材</Link></li>
					<li><Link to={`/jiankang`}>饮食健康</Link></li>
					<li><Link to={`/shequ`}>美食社区</Link></li>	
				</ul>
				{loginContent}
        		{/*注册*/}
			    <Modal
          			title="注册"
          			visible={this.state.visibleRegist}
          			onCancel={this.RegistCancel.bind(this)}
          			footer={[
            		<Button key="back" size="large" onClick={this.RegistCancel.bind(this)}>取消</Button>,
            		<Button key="submit" type="primary" size="large" onClick={this.handleSubmitRegist.bind(this)}>
            		注册
            		</Button>,
         			]}
        		>
				<Form onSubmit={this.handleSubmitRegist.bind(this)}>
			        <FormItem>
					{getFieldDecorator('usernameRegist', {
        			})(
			        	<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
			      	)}
			        </FormItem>
			        <FormItem>
					{getFieldDecorator('passwordRegist', {})(
			            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
			      	)}
			        </FormItem>
			        <FormItem>
					{getFieldDecorator('confirm', {})(
			            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请再次输入密码" />
			      	)}
			        </FormItem>
			    </Form>
        		</Modal>
        		{/*登录*/}
			    <Modal
          			title="登录"
          			visible={this.state.visibleLogin}
          			onOk={this.handleSubmitLogin.bind(this)}
          			onCancel={this.LoginCancel.bind(this)}
          			footer={[
            		<Button key="back" size="large" onClick={this.LoginCancel.bind(this)}>取消</Button>,
            		<Button key="submit" type="primary" size="large" onClick={this.handleSubmitLogin.bind(this)}>
            		登录
            		</Button>,
         			]}
        		>
				<Form onSubmit={this.handleSubmitLogin.bind(this)}>
			        <FormItem>
					{getFieldDecorator('usernameLogin', {
        			})(
			        	<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
			      	)}
			        </FormItem>
			        <FormItem>
					{getFieldDecorator('passwordLogin', {})(
			            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请再次输入密码" />
			      	)}
			        </FormItem>
			    </Form>
        		</Modal>
			</div>
			</Affix>)
	}
	//注册Regist
	handleSubmitRegist(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		if(err)
		{
			console.log(err);
		}
		else
		{
			var username=values.usernameRegist;
			var password=values.passwordRegist;
			var confirm=values.confirm;
			if(username==''||password==''||confirm==''||username==undefined||password==undefined||confirm==undefined)
			{
				message.error('用户名或密码不能为空!');
				return;
			}
			else
			{
				fetch("/usersSELECT",
				{
					method:"POST",
					headers:{"Content-Type":"application/x-www-form-urlencoded"},
					body:`username=${username}`
				})
				.then(respose=>{return respose.json()})
				.then(json=>{
				if(json[0])
				{
					message.info('用户名已存在!');
				}
				else
				{
					if(password==confirm)
					{
						fetch("/usersINSERT",
						{
							method:"POST",
							headers:{"Content-Type":"application/x-www-form-urlencoded"},
							body:`username=${username}&password=${password}`
						})
						.then(respose=>{return respose.json()})
						.then(json=>{
							console.log("插入成功");
						})
						message.info('注册成功!');
						this.setvisibleRegist(false);
					}
					else
					{
						message.error('两次输入的密码不一致!');
					}
				}
				})
			}
		}
		})
	}
	Regist(){
		this.setvisibleRegist(true);
	}
	RegistCancel(){
		message.config({
		top:14,
 		duration:1,
		});
		this.setvisibleRegist(false);
		message.warn('取消注册');
	}
	setvisibleRegist(visibleRegist)
	{
		this.setState({
			visibleRegist:visibleRegist
		});	
	}
	//登录Login
	handleSubmitLogin(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		if(err)
		{
			console.log(err);
		}
		else
		{
			var username=values.usernameLogin;
			var password=values.passwordLogin;
			fetch("/usersLogin",
			{
				method:"POST",
				headers:{"Content-Type":"application/x-www-form-urlencoded"},
				body:`username=${username}&password=${password}`
			})
			.then(respose=>{return respose.json()})
			.then(json=>{
				if (json.issuccess != '登录失败')
				{
					message.success("登录成功");
					this.setState({
						username:json[0].username
					})
					this.setvisibleLogin(false);	
					localStorage.userId=json[0].id;
					localStorage.userName=json[0].username;
					localStorage.userFace=json[0].face;
					localStorage.userNickname=json[0].nickname;
					window.location.reload();
				}
				else{
					message.error(json.issuccess);
				}
			})
		}
		})
	}
	Login(){
		this.setvisibleLogin(true);	
	}
	LoginCancel(){
		message.config({
		top:14,
 		duration:1,
		});
		message.warn('取消登录');
		this.setvisibleLogin(false);
	}
	setvisibleLogin(visibleLogin)
	{
		this.setState({
			visibleLogin:visibleLogin
		});	
	}
	LoginOUT(){
		localStorage.userName='';
		window.location.reload();
		this.setState({
			loginSuccess:false
		});
	}

} 
export default Header = Form.create({})(Header);
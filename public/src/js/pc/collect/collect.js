import React from 'react';
import ReactDOM from 'react-dom';
import {Row,Col} from 'antd';

import Header from '../homepage/header';
import Footer from '../homepage/footer';
import Collectcontent from './collectcontent';
import Changepassword from './changepassword';
import Changeuserinformation from './Changeuserinformation';
import Mycaipu from './mycaipu';
var biu;
export default class Collect extends React.Component{
	constructor(){
		super();
		this.state = {
			RightContent:''
		}
	}
	componentDidMount(){
		this._grzxLi(parseInt(this.props.params.indexLi))
	}
	render(){
		var GRZX = ["个人中心","我的作品","我的收藏","修改资料","修改密码"];
		var icons = [
		"./src/icon/用户.png",
		"./src/icon/餐具.png",
		"./src/icon/收藏.png",
		"./src/icon/资料.png",
		"./src/icon/钥匙.png"];
		var grzx=GRZX.map((item, index)=> {
			return 	(
				<li onClick={this._grzxLi.bind(this,index)} key={index}>
					<img className="icons" src={icons[index]} />
					<span >{item}</span>
				</li>
			)
		})
		return (
			<div style={{background:"url(http://i3.meishichina.com/attachment/magic/2016/07/20/20160720146900157818213.jpg) no-repeat",backgroundSize:"100%",height:1000}}>
				<Header />
				<Row>
					<Col span={2}>
					</Col>
					<Col span={4}>
						<div style={{width:"100%",height:600}} >
							<div className="CollectLeft">
								<div className="CollectLeft-1">
									<img src={localStorage.userFace} style={{border:"2px solid steelblue"}} />
									<p>{localStorage.userNickname!="null"?localStorage.userNickname:localStorage.userName}</p>
								</div>
								<ul className="grzx">
									{grzx}
								</ul>
							</div>
						</div>
					</Col>
					<Col span={16}>
						{this.state.RightContent}
					</Col>
					<Col span={2}>
					</Col>
				</Row>
			</div>
		)
	}
	_grzxLi(index){
		switch(index)
		{
			case 0:
				this.setState({
					RightContent:<Mycaipu />
				})
				break;
			case 1:
				this.setState({
					RightContent:<Mycaipu />
				})
				break;
			case 2:
				this.setState({
					RightContent:<Collectcontent />
				})
				break;
			case 3:
				this.setState({
					RightContent:<Changeuserinformation />
				})
				break;
			case 4:
				this.setState({
					RightContent:<Changepassword />
				})
				break;
		}
	}
}
import React from 'react';
import ReactDOM from 'react-dom';

import { Row, Col ,Input,message} from 'antd';
import 'antd/dist/antd.css';

export default class Caipuxqli extends React.Component{
constructor(){
	super();
	this.state={
		data:'',
		data_material:'',
		data_process:'',
		data_step:'',
		TJcolor:0,
		type:"zxtj",
		cpid:"",
		cpAuthor:"",
		cpFace:"",
		cpmaterialsName:[],
		cpmaterialsNum:[],
		cpmaterialsProcess:[],
		cpstepImg:[],
		cpstepText:[],
		iscollect:false
		}
	}
componentDidMount(){
	this.setState({
		cpid:this.props.cpid
	})
	fetch("/caipuxq?cpid="+this.props.cpid)
	.then((response)=>{
		return response.json()
	})
	.then((json)=>{
		console.log("json",json)
		this.setState({
			data:json,
			cpDishes:json[0].cpdishes,
			cpAuthor:json[0].cpauthor,
			cpFace:json[0].cpface,
			cpImg:json[0].cpimg,
			cpIntroduce:json[0].cpintroduce
		})
	})
//查询菜谱食材表[caipu_material]
	fetch("/caipuxq_material?cpid="+this.props.cpid)
	.then((response)=>{
		return response.json()
	})
	.then((json)=>{
		this.setState({
			data_material:json
		})
	})
//查询菜谱工序表[caipu_process]
	fetch("/caipuxq_process?cpid="+this.props.cpid)
	.then((response)=>{
		return response.json()
	})
	.then((json)=>{
		this.setState({
			data_process:json[0]
		})
	})
//查询菜谱做法步骤表[caipu_step]
	fetch("/caipuxq_step?cpid="+this.props.cpid)
	.then((response)=>{
		return response.json()
	})
	.then((json)=>{
		console.log("asdf");
		console.log(json);
		this.setState({
			data_step:json
		})
	})
}
	render(){
		// console.log(this.state.data_step)
		console.log("啊啊啊",this.state.data_process)
		// console.log(this.state.data_process.tachnology)
		//菜谱所需的食材名字
		var cpmaterials = this.state.data_material==(null||undefined||"")?
		(<li><b>数据加载中...</b></li>)
		:
		this.state.data_material.map((item1, index1)=> {
		return  (<li key={index1}>
					<b>{item1.scname}</b>
					<span>{item1.scnum}</span>
				</li>);
				});
		//做法步骤 
		var zfbz = this.state.data_step==(null||undefined||"")?
		(<div>暂无步骤</div>)
		:
		this.state.data_step.map((item2, index2)=> {
		return 	(<div key={index2}>
					<li>
						<img src={item2.stepimg} />
						<div className="zfbz_content">
							<b className="XH">{index2+1}</b>
							<p>{item2.steptext}</p>
						</div>
					</li>
					<div style={{clear:"both"}}></div>
				</div>);
				})
		return (
			<div>
				<Row>
					<Col span={16}>
						<div style={{width:"100%",height:"500px"}}>
							{/*标题：食物名字+作者头像昵称*/}	
							<div className="Caipuxq_title">
								<h1>{this.state.cpDishes!=(null&&undefined&&"")?this.state.cpDishes:"未知黑暗料理"}</h1>
								<div className="xqtxbox">
									<img src={this.state.cpFace==(null||undefined||"")?"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512929206910&di=231e28b726bf718ea423e6a6420c924a&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-10-08%2F041717696.jpg":this.state.cpFace} />
									<span>{this.state.cpAuthor==(null||undefined||"")?"未知神秘人士":this.state.cpAuthor}</span>
								</div>
							</div>
							{/*菜谱介绍:大图+说明*/}
							<div className="Caipuxq_content">
								<img src={this.state.cpImg!=(null&&undefined&&"")?this.state.cpImg:"http://bpic.588ku.com/element_origin_min_pic/01/47/02/12574338a640011.jpg"} />
								<p>
									<span>“</span>
										{this.state.cpIntroduce!=(null&&undefined&&"")?this.state.cpIntroduce:"该作者很懒，暂无相关介绍"}
									<span>”</span>
								</p>
							</div>
							{/*食材明细*/}	
							<div className="scmx">
								<h3 className="scmxh3">食材明细</h3>
								<ul style={{marginBottom:40}}>
									{cpmaterials}
								</ul>
								<ul>
									<li>
										<b>{this.state.data_process.taste!=(null&&undefined&&"")?this.state.data_process.taste:"酸甜"}</b>
										<span>口味</span>
									</li>
									<li>
										<b>{this.state.data_process.technology!=(null&&undefined&&"")?this.state.data_process.technology:"炸"}</b>
										<span>工艺</span>
									</li>
									<li>
										<b>{this.state.data_process.time!=(null&&undefined&&"")?this.state.data_process.time:"若干分钟"}</b>
										<span>耗时</span>
									</li>
									<li>
										<b>{this.state.data_process.level!=(null&&undefined&&"")?this.state.data_process.level:"一般"}</b>
										<span>难度</span>
									</li>
								</ul>
							</div>
							{/*做法步骤*/}	
							<div className="zfbz">
								<h3 className="scmxh3">做法步骤</h3>
								<ul>
									{zfbz}
								</ul>
							</div>
							{/*使用厨具<span className="chuju">使用厨具</span>*/}
							
							{/*收藏点赞*/}
							<div className="like">
								<b className="collectB1" onClick={this._collect.bind(this)}></b><span></span>
								<b className="collectB2 "></b><span></span>
							</div>
						</div>
					</Col>
					<Col span={8}>	
						<div className="XQRightTitle">
							<h3>健康与话题</h3>
						</div>
						<div className="XQRightContent">
							<p>奶水不足，多试试这些催乳的食物吧！</p>
							<p>雾霾严重，食疗防肺病</p>
							<p>原来红心柚子比白柚贵是原因的！</p>
							<p>“冬藏补肾”，补肾的最佳时期！</p>
							<p>冬天咳嗽不止，食疗吃什么好？</p>
						</div>
						<div className="XQRightTitle">
							<h3>热门专题</h3>
						</div>
						<ul className="XQRightContentUL">
							<li><img src="http://i3.meishichina.com/static/banner/side/nanguadezuofadaquan.jpg" /></li>
							<li><img src="http://i3.meishichina.com/static/banner/side/zibutang.jpg" /></li>
							<li><img src="http://i3.meishichina.com/static/banner/side/kangganmao.jpg" /></li>
							<li><img src="http://i3.meishichina.com/static/banner/side/qiujibushui.jpg" /></li>
						</ul>						
					</Col>
				</Row>
			</div>
		)
	}
	_collect(){
		// console.log(this.state.cpid);
		//是否登录状态
		if(localStorage.userName){
			console.log("登录状态，用户名"+localStorage.userName);
			fetch("/collectSELECT?username="+localStorage.userName+"&cpid="+this.state.cpid)
			.then((response)=>{
				return response.json()                                           
			})
			.then((json)=>{
				console.log(json)
				if(json.length==0)
				{
					fetch("/collectINSERT?username="+localStorage.userName+"&cpid="+this.state.cpid)
					.then((response)=>{
						return response.json()
					})
					.then((json)=>{
						message.info("收藏成功");
					})
				}
				else
				{
					message.info("该菜谱已收藏！")
				}
			})
		}
		else
		{
			message.info("请先登录");
		}
	}

}

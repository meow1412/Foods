	import React from 'react';
import {Row,Col} from 'antd';

import {Link} from 'react-router';

import Header from './header';
import Footer from './footer';
import Ptap from '../collect/p.js';

export default class Searchpage extends React.Component{
	constructor(){
		super();
		this.state = {
			data:'',
			searchValue:'',
			searchValue2:''
		}
	}
	componentDidMount(){
		fetch('/caipuSEARCH?cpdishes='+this.props.params.searchValue)
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
		console.log(((this.state.searchValue2!='')&&(this.props.params.searchValue!='')));
		var SearchResult = this.state.data.length?
			this.state.data.map((item,index)=> {
			return 	(<li key={index}>
						<Link to={`/Caipuxq/${item.cpid}`}>
							<img style={{float:"left",display:"block",width:160,height:160,borderRadius:5,margin:20}} src={item.cpimg!=null?item.cpimg:'http://bpic.588ku.com/element_origin_min_pic/01/47/02/12574338a640011.jpg'} />
						</Link>
						<div style={{float:"left",width:790,height:"100%",padding:"20px 0"}}>
							<Link to={`/Caipuxq/${item.cpid}`}>
								<h1 style={{width:"100%"}}>{item.cpdishes}</h1>
							</Link>
							<span className="collectSpan">{item.cpauthor}</span>
							<p>原料：</p><Ptap data={item.cpid} />
						</div>
					</li>)
			}):<div style={{width:100,height:300,fontSize:14,margin:20}}>未找到相关菜谱</div>
		return (
			<div>
				<Header />
				<Row>
					<Col span={2}>
					</Col>
					<Col span={20}>
						<div className="searchBig">
							<input value={this.state.searchValue} onChange={this._searchValue.bind(this)} />
							<button onClick={this._search.bind(this)}>搜&emsp;索</button>
						</div>
					</Col>
					<Col span={2}>
					</Col>
				</Row>
				<Row>
					<Col span={2}>
					</Col>
					<Col span={20}>
					<div style={{width:990,margin:"0 auto"}}>
						<ul className='antistop'>
							{this.state.searchValue2!=''&&this.props.params.searchValue!=''?<li>{this.props.params.searchValue!=''?this.state.searchValue2:this.props.params.searchValue}</li>:<li>请输入关键词</li>}
							<p>约{this.state.data.length}条结果</p>
						</ul>
						<ul className='SearchContent'>
							{SearchResult}
						</ul>
					</div>
					</Col>
					<Col span={2}>
					</Col>
				</Row>
				<Footer />
			</div>
		)
	}
	_searchValue(e){
		this.setState({
			searchValue:e.target.value
		})
		console.log(this.state.searchValue)
	}
	_search(){
		fetch('/caipuSEARCH?cpdishes='+this.state.searchValue)
		.then((response)=>{
			return response.json()
		})
		.then((json)=>{
			console.log(json)
			this.setState({
				data:json
			})
		})
		this.setState({
			searchValue2:this.state.searchValue,
			searchValue:""
		})
	}
}

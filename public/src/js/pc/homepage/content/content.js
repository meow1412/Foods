import React from 'react';
import ReactDOM from 'react-dom';

import { Row, Col  } from 'antd';
import 'antd/dist/antd.css';

import Left from './left';
import Center from './center';
//轮播图
export default class Content extends React.Component{
	render(){
		return (
			<div style={{backgroundColor:"#f6f6f6",position:"relative"}}>
				<Row>
					<Col span={2}>
					</Col>
					<Col span={20}>
						<Left />
						<Center />
					</Col>
					<Col span={2}>
					</Col>
				</Row>
			</div>
		)
	}
}

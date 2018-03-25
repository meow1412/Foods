import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../homepage/header';
import Navbar from '../homepage/navbar';
import Mycaipucontent from './mycaipucontent';


import { Row, Col ,Input} from 'antd';
import 'antd/dist/antd.css';

export default class Mycaipu extends React.Component{
	render(){
		return (
			<div style={{backgroundColor:"#eee",height:2000}}>
				<Header />
				<Navbar />
				<Row>
					<Col span={2}>
					</Col>
					<Col span={20}>
						<Mycaipucontent />
					</Col>
					<Col span={2}>
					</Col>
				</Row>
			</div>
		)
	}
}


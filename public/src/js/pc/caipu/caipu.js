import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../homepage/header';
import Navbar from '../homepage/navbar';
import Footer from '../homepage/footer';

import Caipuli from './caipuli';

import { Row, Col ,Input} from 'antd';
import 'antd/dist/antd.css';

export default class Caipu extends React.Component{
	render(){
		return (
			<div>
				<Header />
				<Navbar />
				<Row>
					<Col span={2}>
					</Col>
					<Col span={20}>
					<Caipuli />
					</Col>
					<Col span={2}>
					</Col>
				</Row>
				<Footer />
			</div>
		)
	}
}

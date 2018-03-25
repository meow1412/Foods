import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../homepage/header';
import Navbar from '../homepage/navbar';
import Footer from '../homepage/footer';

import Caipuxqli from './caipuxqli';

import { Row, Col ,Input} from 'antd';
import 'antd/dist/antd.css';

export default class Caipuxq extends React.Component{
	render(){
		return (
			<div>
				<Header />
				<Navbar />
				<Row>
					<Col span={2}>
					</Col>
					<Col span={20}>
					<Caipuxqli cpid={this.props.params.cpid}/>
					</Col>
					<Col span={2}>
					</Col>
				</Row>
				<Footer />
			</div>
		)
	}
}

import React from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router';


import Recommend from './recommend';
import Material from './material';

import { Row, Col ,Input} from 'antd';
import 'antd/dist/antd.css';

export default class Cpsc extends React.Component{
	render(){
		return (
			<div>
				<Row>
					<Col span={2}>
					</Col>
					<Col span={14}>
					<Recommend />
					</Col>
					<Col span={6}>
					<Material />
					</Col>
					<Col span={2}>
					</Col>
				</Row>
			</div>
		)
	}
}

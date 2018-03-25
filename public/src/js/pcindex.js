import React from 'react';
import ReactDOM from 'react-dom';

import Header from './pc/homepage/header';
import Navbar from './pc/homepage/navbar';
import Content from './pc/homepage/content/content';
import Ready from './pc/homepage/ready/ready';
import Cpsc from './pc/homepage/cpsc';
import Footer from './pc/homepage/footer';


export default class PCIndex extends React.Component{
	render(){
		return (
			<div>
				<Header />
				<Navbar />
				<Content />
				<Ready />
				<Cpsc />
				<Footer />
			</div>
		)
	}
}
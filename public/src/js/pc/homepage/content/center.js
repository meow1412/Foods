import React from 'react';
import ReactDOM from 'react-dom';

import { Carousel } from 'antd';
// import 'antd/dist/antd.css';

//轮播图-图片
export default class Center extends React.Component{
	render(){
		var imgbox=[];
		for(var i=0;i<6;i++){
			var imgSrc= "./src/images/00"+(i+1)+".jpg";
			imgbox.push(
				<div className="Carousel" key={i}><img src={imgSrc} /></div>
			)	
		}
		return (
			<div className="content_Carousel">
				<Carousel autoplay>
				    {imgbox}
				</Carousel>
			</div>
		)
	}
}

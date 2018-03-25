import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input,Tabs,Button,Icon,Upload,message} from 'antd';

export default class Uploadface extends React.Component {
  constructor(){
    super();
    this.state = {
      imageUrl:'',
      userface:localStorage.userName
    };
  }
  render() {
    var imageUrl = this.state.imageUrl;
    var userid = {userid:localStorage.userId};
    return (
      	<div className='upload'>
        	<Upload
            	name="avatar"
            	showUploadList={false}
            	action="/post_upload"
            	beforeUpload={this.beforeUpload.bind(this)}
            	onChange={this.handleChange.bind(this)}
            	data={userid}
        	>
            {
              imageUrl ?
                <img src={imageUrl} alt="" className="UploadStyle" /> :
                <Icon type="plus" className="UploadStyle" />
            }
        	</Upload>
          <h1 style={{width:200,textAlign:"center"}}>头像上传</h1>
      </div>
    );
  }
  beforeUpload(file){
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('请上传 JPG 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传图片必须小于2MB!');
    }
    return isJPG && isLt2M;
  }

  handleChange(info){
    // console.log(localStorage.userName);
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
    var username = localStorage.userName;
    fetch("/usersSELECT",
		{
			method:"POST",
			headers:{"Content-Type":"application/x-www-form-urlencoded"},
			body:`username=${localStorage.userName}`
		})
		.then(respose=>{return respose.json()})
		.then(json=>{
      console.log(json[0].face);
			localStorage.userFace=json[0].face;
      console.log(localStorage.userFace);
		})
  }
  getBase64(img,callback){
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
}
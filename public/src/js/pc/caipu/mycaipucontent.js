import React from 'react';
import ReactDOM from 'react-dom';

import Uploadbigimg from './uploadbigimg';

import { Row, Col , Input, Dropdown, Menu, Icon, Button, Form ,Upload, message} from 'antd';
import {Link,hashHistory} from 'react-router';
import 'antd/dist/antd.css';
const InputGroup = Input.Group;
const { TextArea } = Input;
const FormItem = Form.Item;
let uuid = 0;
class DynamicFieldSet extends React.Component{
  constructor(){
    super();
    this.state={
      dish:'',
      bigimg:'',
      introduce:'',
      level:'难度',
      add:1,
      technology:[],
      dishname:'',
      dpN:'none',
      dpB:'block',
      insertId:''

    }
  }
  render(){
      var imageUrl = this.state.imageUrl;
      var cpid = {cpid:this.state.insertId};
      //下拉
        //       <FormItem {...formItemLayoutWithOutLabel}>
        //   {getFieldDecorator('introduce', {
        //   })(
        //        <Dropdown overlay={menu}>
        //           <Button style={{ marginLeft: 8 }}>
        //             {this.state.level} <Icon type="down" />
        //           </Button>
        //        </Dropdown>
        //   )}
        // </FormItem>
// const menu = (
//   <Menu>
//     <Menu.Item key="1" onChange={()=>{this.setState({level:"简单"}) console.log(this.state.level) } }>简单</Menu.Item>
//     <Menu.Item key="2" onChange={()=>{this.setState({level:"普通"}) console.log(this.state.level) } }>普通</Menu.Item>
//     <Menu.Item key="3" onChange={()=>{this.setState({level:"高级"}) console.log(this.state.level) } }>高级</Menu.Item>
//     <Menu.Item key="4" onChange={()=>{this.setState({level:"神级"}) console.log(this.state.level) } }>神级</Menu.Item>
//   </Menu>
// );
    // console.log(this);
    const { getFieldDecorator, getFieldValue } = this.props.form;
    // console.log(getFieldDecorator);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem style={{position:"relative",width:700}}
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '所需食材/用量' : ''}
          required={false}
          key={k}
        >
          <FormItem {...formItemLayoutWithOutLabel}>
                <InputGroup compact style={{width:406,paddingLeft:6}}>
              <FormItem>
                  {getFieldDecorator(`scname[${k}]`, {
              })(
                <Input placeholder="主/辅料 (如：猪肉/盐)" style={{ float:'left',width:240}} />
          )}
              </FormItem>
                <FormItem>
                  {getFieldDecorator(`scnum[${k}]`, {
              })(
                <Input placeholder="用量 (如：100g)" style={{ float:'left',width: 160 }} />
          )}
              </FormItem>
            </InputGroup>
          </FormItem>
         
            {keys.length > 1 ? (
            <Icon
              style={{position:"absolute",right:50}}
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
    return (
      <div>
          <div style={{display:this.state.dpB}}>
            <h2>请为您的作品取一个响亮的名字吧</h2>
            <Input placeholder="菜名" onChange={(e)=>{
                this.setState({
                  dishname:e.target.value
                })}} style={{ width: 300 }} />
            <Button onClick={()=>{
              if(this.state.dishname)
              {
                fetch("/mycaipuINSERTdishname?userId="+localStorage.userId+"&dishname="+this.state.dishname)
                .then((response)=>{
                  return response.json()
                })
                .then((json)=>{
                  console.log("创建",json.insertId);
                  message.success('创建菜谱成功!');
                  this.setState({
                    dpN:'block',
                    dpB:'none',
                    insertId:json.insertId
                  })
                })                
              }
              else
              {
                message.error('菜谱名不能为空!');
              }
            }}>确定</Button>
          </div>
        <Form style={{display:this.state.dpN}} onSubmit={this.handleSubmit.bind(this)}>
        <FormItem {...formItemLayoutWithOutLabel}
          label="完成图"
          extra="请使用横屏拍摄的照片，大小不超过2M"
        >
          <div className='Uploadbigimg'>
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile.bind(this),
          })(
          <Upload
              name="avatar"
              showUploadList={false}
              action="/post_uploadDishimg"
              beforeUpload={this.beforeUpload.bind(this)}
              onChange={this.handleChange.bind(this)}
              data={cpid}
              multiple={true}
          >
            {
              imageUrl ?
                <img src={imageUrl} alt="" className="UploadStyle2" /> :
                <Icon type="plus" className="UploadStyle2" />
            }
          </Upload>           
          )}
          <h1>上传成品照片</h1>
          <p>请使用横屏拍摄的照片，大小不超过2M</p>
          </div>
        </FormItem>
      	<FormItem {...formItemLayoutWithOutLabel}>
      		<h2>说说作品背后的故事</h2>
      		{getFieldDecorator('introduce', {
       		})(
      			<TextArea placeholder="不要超过500字哦" style={{width:700,height:200}} />
      		)}
      	</FormItem>
        {formItems}

        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add.bind(this)} style={{width:400}}>
            <Icon type="plus" /> 添加
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    </div>  
    );
  }
  remove(k){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  add(){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys, 
    });
  }
  // //上传文件
  normFile(e){
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  //上传图片
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
    // var username = localStorage.userName;
    // fetch("/usersSELECT",
    // {
    //   method:"POST",
    //   headers:{"Content-Type":"application/x-www-form-urlencoded"},
    //   body:`username=${localStorage.userName}`
    // })
    // .then(respose=>{return respose.json()})
    // .then(json=>{
    //   console.log("!!!!!!!!!!!!!!!!!!!!",json[0].face);
    //   localStorage.userFace=json[0].face;
    //   // console.log(localStorage.userFace);
    // })
  }
  getBase64(img,callback){
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  // ====
 handleButtonClick(e){
  message.info('Click on left button.');
  console.log('click left button', e);
}

 handleMenuClick(e){
  message.info('Click on menu item.');
  console.log('click', e);
}
  //--------------------------------------------------------------------------
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.insertId);
    console.log(localStorage.userNickname);
    console.log(localStorage.userFace);
    this.props.form.validateFields((err, values) => {
      if (!err)
      {
        console.log(values.scname);
        console.log(values.keys.length);
        //设置菜谱信息表[caipu] 介绍+作者名字+作者头像
        fetch('/mycaipuUPDATEinfo?introduce='+values.introduce+"&author="+localStorage.userNickname+"&face="+localStorage.userFace+"&insertId="+this.state.insertId)
        .then((response)=>{
        return response.json()
        })
        .then((json)=>{
        console.log("json")
        })        
        //插入菜谱食材表[caipu_material] 所需食材+食材数量
          for(var i = 0;i<values.keys.length;i++)
          {
  	        fetch('/mycaipuINSERTsc?scname='+values.scname[i]+"&scnum="+values.scnum[i]+"&cpid="+this.state.insertId)
  			    .then((response)=>{
  				  return response.json()
  			    })
  			    .then((json)=>{
              hashHistory.push( `/collect/1`);
  			    })
          }
      }
      else
      {
      	console.log("错误")
      }
    });
  }
}
export default DynamicFieldSet  = Form.create({})(DynamicFieldSet);



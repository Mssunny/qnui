'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/mobileMod';
import Breadcrumb from 'qnui/lib/breadcrumb';
import Button from 'qnui/lib/button';
import Dialog from 'qnui/lib/dialog';
import Tag from 'qnui/lib/tag';
import apimap from 'utils/apimap';
import LinkTool from 'utils/linkTools';
import Step,{Item as StepItem} from 'qnui/lib/step';
import { Row, Col } from 'qnui/lib/grid';
import $ from 'jquery';
import './mobileMod.scss';

let v="1";
const apienv = window.apienv || 'local';
const contOne = (<span>设置条件</span>);
const contTwo = (<span>设置奖品</span>);
const contThree = (<span>设置模板</span>);
const contFour = (<span>完成</span>);
const isSelected = false;

class MobileMod extends React.Component {
  constructor(props) {
        super(props);
        this.state={
          visible:false,
          imgUrl:""
        }
  }
  onClick(event) {
      let tagList = document.getElementsByClassName('custom-tag');
      for(let i=0; i<tagList.length; i++){
        tagList[i].index = i;
        if(tagList[i]==event.target.parentNode.parentNode){
          switch(i){
            case 0:
              v="8";
                this.state=({
                  selected1:true,
                  imgUrl:"https://img.alicdn.com/imgextra/i2/749864544/TB2_bOaaHWJ.eBjSspdXXXiXFXa-749864544.jpg"
                })
                break;
            case 1:
              v="1";
                this.state=({
                  selected2:true,
                  imgUrl:"http://img04.taobaocdn.com/imgextra/i4/749864544/TB2nWJDcXXXXXXnXXXXXXXXXXXX_!!749864544-0-tae.jpg"
                })
                break;
            case 2:
              v="2";
                this.state=({
                  selected3:true,
                  imgUrl:"http://img04.taobaocdn.com/imgextra/i4/749864544/TB2RztgcXXXXXcwXpXXXXXXXXXX_!!749864544-0-tae.jpg"
                })
                break;
            case 3:
              v="4";
                this.state=({
                  selected4:true,
                  imgUrl:"https://img.alicdn.com/imgextra/i4/749864544/TB23GC1qFXXXXa8XXXXXXXXXXXX-749864544.jpg"
                })
                break;
            case 4:
              v="5";
                this.state=({
                  selected5:true,
                  imgUrl:"https://img.alicdn.com/imgextra/i3/749864544/TB2vpBDrVXXXXXRXXXXXXXXXXXX-749864544.png"
                })
                break;
            case 5:
              v="7";
                this.state=({
                  selected6:true,
                  imgUrl:"https://img.alicdn.com/imgextra/i4/749864544/TB2prtHaRLxQeBjy0FnXXcQwpXa-749864544.png"
                })
                break;
            case 6:
              v="9";
                this.state=({
                  selected7:true,
                  imgUrl:"https://img.alicdn.com/imgextra/i4/749864544/TB2Y5oQeyKO.eBjSZPhXXXqcpXa-749864544.png"
                })
                break;
            default:
              v="9_1";
                this.state=({
                  selected8:true,
                  imgUrl:"https://img.alicdn.com/imgextra/i2/749864544/TB2wRlUcM0kpuFjSspdXXX4YXXa-749864544.png"
                })
          }
          console.log(tagList[i].index + ' clicked');
        }else{
          //console.log(tagList[i].index + ' NO clicked');
        }

      }
      this.setState({
        visible:true,
      });

      {/*console.log('class:' + event.target.className)//输出节点的className
      console.log('innerHTML:' + event.target.innerHTML)//输出节点的html
      console.log('parentNode.tagName:' + event.target.parentNode.tagName)// 这个可以看到target中的所有方法  */}
  }
    onClose = () => {
      this.setState({
        visible: false
      })
    }

  saveTem(){
    console.log(v);
    $.ajax({
      type: apienv=='local'?'GET':'POST',
      url: apienv=='local'?apimap[apienv]['MarketingDrawTemplateSavegenx']:apimap[apienv]['MarketingDrawTemplateSavegenx'],
      data: apienv=='local'?'':{"vals":v,"tempType":1},
      dataType: 'json',
      async: false,
      success: (json)=>{
        if(json.rlt==0){
          location.href = LinkTool['redux-activityList'];
        }else{
          Dialog.alert({content:json.txt});
        }
      },
      error: (xhr, status, error)=>{
        console.log('xhr=',xhr,' status=',status,' error=',error);
      }
    });
  }

  render() {
    const footer = <span><Button type='primary' onClick={this.saveTem.bind(this)}>确定使用模板</Button> <Button type='secondary' onClick={this.onClose}>取消</Button></span>;
    return <div>
          <Breadcrumb style={{padding:20}}>
            <Breadcrumb.Item link={LinkTool['index']}>抽奖活动</Breadcrumb.Item>
            <Breadcrumb.Item link={LinkTool['redux-setConfig']}>活动设置</Breadcrumb.Item>
            <Breadcrumb.Item link={LinkTool['redux-pcMod']}>选择抽奖模板</Breadcrumb.Item>
          </Breadcrumb>
          <Step style={{padding:20}} current={2} type='arrow'>
            <StepItem title={contOne} />
            <StepItem title={contTwo} />
            <StepItem title={contThree} />
            <StepItem title={contFour} />
        </Step>
      <Dialog visible = {this.state.visible}
              footer = {footer}
              onClose = {this.onClose}
      >
        <div style={{padding:10}}>
          <img style={{width:300,height:494}} src={this.state.imgUrl}/>
        </div>
      </Dialog>
      <Row className='mod-row'>
        <Col span='8'>
          <div className='demo-col-inset'>
            <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected1}>
              <img  onClick={this.onClick.bind(this)} src='https://img.alicdn.com/imgextra/i3/749864544/TB2V6JGa71M.eBjSZPiXXawfpXa-749864544.png'/>
              <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>移动端双11模版</Button>
            </Tag>
          </div>
        </Col>
        <Col span='8'>
          <div className='demo-col-inset'>
            <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected2}>
              <img  onClick={this.onClick.bind(this)} src='http://img03.taobaocdn.com/imgextra/i3/749864544/TB2BDd4cXXXXXaFXXXXXXXXXXXX_!!749864544-0-tae.jpg'/>
              <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>移动端九宫格模板</Button>
            </Tag>
          </div>
        </Col>
        <Col span='8'>
          <div className='demo-col-inset' onClick={this.onClick.bind(this)}>
            <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected3}>
              <img  onClick={this.onClick.bind(this)} src='http://img03.taobaocdn.com/imgextra/i3/749864544/TB23IN6cXXXXXXWXXXXXXXXXXXX_!!749864544-0-tae.jpg'/>
              <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>移动端老虎机模版</Button>
            </Tag>
          </div>
        </Col>
      </Row>
          <Row className='mod-row'>
            <Col span='8'>
              <div className='demo-col-inset'>
                <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected4}>
                  <img  onClick={this.onClick.bind(this)} src='https://img.alicdn.com/imgextra/i3/749864544/TB2C5K1qFXXXXboXXXXXXXXXXXX-749864544.jpg'/>
                  <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>移动端大转盘模版</Button>
                </Tag>
              </div>
            </Col>
            <Col span='8'>
              <div className='demo-col-inset'>
                <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected5}>
                  <img  onClick={this.onClick.bind(this)} src='https://img.alicdn.com/imgextra/i1/749864544/TB2TCXurVXXXXaNXXXXXXXXXXXX-749864544.jpg'/>
                  <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>移动端砸金蛋模版</Button>
                </Tag>
              </div>
            </Col>
            <Col span='8'>
              <div className='demo-col-inset'>
                <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected6}>
                  <img  onClick={this.onClick.bind(this)} src='https://img.alicdn.com/imgextra/i1/749864544/TB2ERdyaRYxQeBjSspdXXb6QXXa-749864544.png'/>
                  <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>移动端打地鼠模版</Button>
                </Tag>
              </div>
            </Col>
        </Row>
        <Row className='mod-row'>
          <Col span='8'>
            <div className='demo-col-inset'>
              <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected7}>
                <img  onClick={this.onClick.bind(this)} src='https://img.alicdn.com/imgextra/i3/749864544/TB2GAsSep5N.eBjSZFvXXbvMFXa-749864544.png'/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>移动端双12大转盘模版</Button>
              </Tag>
            </div>
          </Col>
          <Col span='8'>
            <div className='demo-col-inset'>
              <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected8}>
                <img  onClick={this.onClick.bind(this)} src='https://img.alicdn.com/imgextra/i2/749864544/TB2zRl9cG8lpuFjy0FpXXaGrpXa-749864544.png'/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>移动端摇一摇模版</Button>
              </Tag>
            </div>
          </Col>
        </Row>
    </div>;
  }
}

export default connect((state)=> {
  return {
    mobileMod: state.mobileMod
  };
})(MobileMod);

'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/fullMod';
import Breadcrumb from 'qnui/lib/breadcrumb';
import Button from 'qnui/lib/button';
import Dialog from 'qnui/lib/dialog';
import apimap from 'utils/apimap';
import Tag from 'qnui/lib/tag';
import Step,{Item as StepItem} from 'qnui/lib/step';
import { Row, Col } from 'qnui/lib/grid';
import LinkTool from 'utils/linkTools';
import $ from 'jquery';
import './fullMod.scss';

let v="1";
const apienv = window.apienv || 'local';
const contOne = (<span>设置条件</span>);
const contTwo = (<span>设置奖品</span>);
const contThree = (<span>设置模板</span>);
const contFour = (<span>完成</span>);
const isSelected = false;

class FullMod extends React.Component {
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
              v="fzp116";
                this.state=({
                  selected1:true,
                  imgUrl:"https://img.alicdn.com/imgextra/i3/749864544/TB2K_uacYVkpuFjSspcXXbSMVXa-749864544.png"
                })
                break;
            case 1:
              v="fjgg120";
                this.state=({
                  selected2:true,
                  imgUrl:"https://img.alicdn.com/imgextra/i4/749864544/TB21VY2c9FjpuFjSspbXXXagVXa-749864544.png"
                })
                break;
            case 2:
              v="fegg206";
                this.state=({
                  selected3:true,
                  imgUrl:"https://img.alicdn.com/imgextra/i3/749864544/TB2iAyKdCFjpuFjSszhXXaBuVXa-749864544.png"
                })
                break;
            case 3:
              v="flhj207";
                this.state=({
                  selected4:true,
                  imgUrl:"https://img.alicdn.com/imgextra/i2/749864544/TB2NYigduJ8puFjy1XbXXagqVXa-749864544.png"
                })
                break;
            default:
              v="ffp224";
                this.state=({
                  selected5:true,
                  imgUrl:"https://img.alicdn.com/imgextra/i2/749864544/TB2Zx0EgxhmpuFjSZFyXXcLdFXa-749864544.png"
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
      data: apienv=='local'?'':{"vals":v,"tempType":2},
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
              minMargin = {50}
      >
        <div style={{padding:15}}>
          <img style={{width:810,height:360}} src={this.state.imgUrl}/>
        </div>
      </Dialog>
        <Row className='mod-row'>
            <Col span='8'>
                <div className='demo-col-inset'>
                    <Tag shape='selectable' type='normal' className='custom-tag' selected={this.state.selected1}>
                        <img onClick={this.onClick.bind(this)} src='https://img.alicdn.com/imgextra/i3/749864544/TB2K_uacYVkpuFjSspcXXbSMVXa-749864544.png'/>
                        <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>全屏转盘抽奖模板</Button>
                    </Tag>
                </div>
            </Col>
            <Col span='8'>
                <div className='demo-col-inset'>
                    <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected2}>
                        <img   onClick={this.onClick.bind(this)} src='https://img.alicdn.com/imgextra/i4/749864544/TB21VY2c9FjpuFjSspbXXXagVXa-749864544.png'/>

                        <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>全屏九宫格抽奖模板</Button>
                    </Tag>
                </div>
            </Col>
            <Col span='8'>
                <div className='demo-col-inset'>
                    <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected3}>
                        <img   onClick={this.onClick.bind(this)} src='https://img.alicdn.com/imgextra/i3/749864544/TB2iAyKdCFjpuFjSszhXXaBuVXa-749864544.png'/>

                        <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>全屏砸金蛋抽奖模板</Button>
                    </Tag>
                </div>
            </Col>
          </Row>
          <Row className='mod-row'>
            <Col span='8'>
                <div className='demo-col-inset'>
                    <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected4}>
                        <img   onClick={this.onClick.bind(this)} src='https://img.alicdn.com/imgextra/i2/749864544/TB2NYigduJ8puFjy1XbXXagqVXa-749864544.png'/>
                        <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>全屏老虎机抽奖模板</Button>
                    </Tag>
                </div>
            </Col>
            <Col span='8'>
                <div className='demo-col-inset'>
                    <Tag  shape='selectable' type='normal' className='custom-tag' selected={this.state.selected5}>
                        <img   onClick={this.onClick.bind(this)} src='https://img.alicdn.com/imgextra/i2/749864544/TB2Zx0EgxhmpuFjSZFyXXcLdFXa-749864544.png'/>

                        <Button style={{paddingLeft:10,float:'left'}} onClick={this.onClick.bind(this)} type='primary' shape='text'>全屏翻牌模板</Button>
                    </Tag>
                </div>
            </Col>
        </Row>

    </div>;
  }
}

export default connect((state)=> {
  return {
    fullMod: state.fullMod
  };
})(FullMod);

'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/pcMod';
import Breadcrumb from 'qnui/lib/breadcrumb';
import Button from 'qnui/lib/button';
import Dialog from 'qnui/lib/dialog';
import apimap from 'utils/apimap';
import Tag from 'qnui/lib/tag';
import './pcMod.scss';
import Step,{Item as StepItem} from 'qnui/lib/step';
import { Row, Col } from 'qnui/lib/grid';
import LinkTool from 'utils/linkTools';
import $ from 'jquery';

const apienv = window.apienv || 'local';
const contOne = (<span>设置条件</span>);
const contTwo = (<span>设置奖品</span>);
const contThree = (<span>设置模板</span>);
const contFour = (<span>完成</span>);
const isSelected = false;
let v="1";

class PcMod extends React.Component {
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
              v="24";
              this.state=({
                selected1:true,
              })
              break;
            case 1:
              v="3058";
              this.state=({
                selected2:true,
              })
              break;
            case 2:
              v="2987";
              this.state=({
                selected3:true,
              })
              break;
            case 3:
              v="2750";
              this.state=({
                selected4:true,
              })
              break;
            case 4:
              v="1635";
              this.state=({
                selected5:true,
              })
              break;
            case 5:
              v="20";
              this.state=({
                selected6:true,
              })
              break;
            case 6:
              v="19";
              this.state=({
                selected7:true,
              })
              break;
            case 7:
              v="18";
              this.state=({
                selected8:true,
              })
              break;
            case 8:
              v="17";
              this.state=({
                selected9:true,
              })
              break;
            case 9:
              v="15";
              this.state=({
                selected10:true,
              })
              break;
            case 10:
              v="14";
              this.state=({
                selected11:true,
              })
              break;
            case 11:
              v="13";
              this.state=({
                selected12:true,
              })
              break;
            case 12:
              v="12";
              this.state=({
                selected13:true,
              })
              break;
            case 13:
              v="11";
              this.state=({
                selected14:true,
              })
              break;
            case 14:
              v="10";
              this.state=({
                selected15:true,
              })
              break;
            case 15:
              v="9";
              this.state=({
                selected16:true,
              })
              break;
            case 16:
              v="1";
              this.state=({
                selected17:true,
              })
              break;
            case 17:
              v="3";
              this.state=({
                selected18:true,
              })
              break;
            case 18:
              v="4";
              this.state=({
                selected19:true,
              })
              break;
            case 19:
              v="5";
              this.state=({
                selected20:true,
              })
              break;
            case 20:
              v="16";
              this.state=({
                selected21:true,
              })
              break;
            case 21:
              v="7";
              this.state=({
                selected22:true,
              })
              break;
            case 22:
              v="8";
              this.state=({
                selected23:true,
              })
              break;
            default:
              v="1212";
              this.state=({
                selected24:true,
              })
          }
          console.log(tagList[i].index + ' clicked');
          let imgUrl=event.target.getAttribute("data-setUrl");
          this.state=({
            imgUrl:imgUrl,
          })
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
      data: apienv=='local'?'':{"vals":v,"tempType":0},
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
          <Step style={{padding:20}} current={2} type="arrow">
            <StepItem title={contOne} />
            <StepItem title={contTwo} />
            <StepItem title={contThree} />
            <StepItem title={contFour} />
        </Step>
      <Dialog visible = {this.state.visible}
              footer = {footer}
              onClose = {this.onClose}
      >
        <div>
          {/*<img src={this.state.imgUrl}/>*/}
          <div style={{padding:15}}>
            <img style={{width:868,height:344}} src={this.state.imgUrl}/>
          </div>
        </div>
      </Dialog>
      <Row className="mod-row">
        <Col span="8">
          <div className="demo-col-inset">
            <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected1}>
              <img  onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i1/749864544/TB2LT27XOgSXeFjy0FcXXahAXXa-749864544.png" src="https://img.alicdn.com/imgextra/i1/749864544/TB2rbL_aiKO.eBjSZPhXXXqcpXa-749864544.png"/>
              <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i1/749864544/TB2LT27XOgSXeFjy0FcXXahAXXa-749864544.png" type='primary' shape='text'>双十一模板</Button>
            </Tag>
          </div>
        </Col>
        <Col span="8">
          <div className="demo-col-inset">
            <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected2}>
              <img  onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i2/749864544/TB2GCiujpXXXXbZXXXXXXXXXXXX-749864544.jpg" src="https://img.alicdn.com/imgextra/i4/749864544/TB2g.mrjpXXXXcqXXXXXXXXXXXX-749864544.jpg"/>
              <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i2/749864544/TB2GCiujpXXXXbZXXXXXXXXXXXX-749864544.jpg" type='primary' shape='text'>年货节模板</Button>
            </Tag>
          </div>
        </Col>
        <Col span="8">
          <div className="demo-col-inset">
            <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected3}>
              <img  onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i2/749864544/TB2w5P2iFXXXXXgXXXXXXXXXXXX-749864544.jpg" src="https://img.alicdn.com/imgextra/i1/749864544/TB2r5LliFXXXXcsXpXXXXXXXXXX-749864544.jpg"/>
              <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i2/749864544/TB2w5P2iFXXXXXgXXXXXXXXXXXX-749864544.jpg" type='primary' shape='text'>圣诞节模板</Button>
            </Tag>
          </div>
        </Col>
      </Row>
          <Row className="mod-row">
            <Col span="8">
              <div className="demo-col-inset">
                <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected4}>
                  <img  onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i4/749864544/TB2D0KlhVXXXXa9XpXXXXXXXXXX-749864544.jpg" src="https://img.alicdn.com/imgextra/i2/749864544/TB2zgWBhVXXXXbKXXXXXXXXXXXX-749864544.jpg"/>
                  <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i4/749864544/TB2D0KlhVXXXXa9XpXXXXXXXXXX-749864544.jpg" type='primary' shape='text'>双十二年度盛典</Button>
                </Tag>
              </div>
            </Col>
            <Col span="8">
              <div className="demo-col-inset">
                <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected5}>
                  <img  onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i4/749864544/TB2jm8OgFXXXXX_XXXXXXXXXXXX_!!749864544-0-tae.jpg" src="https://img.alicdn.com/imgextra/i3/749864544/TB24qhpgFXXXXbzXpXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                  <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i4/749864544/TB2jm8OgFXXXXX_XXXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>双十一全球狂欢节</Button>
                </Tag>
              </div>
            </Col>
            <Col span="8">
              <div className="demo-col-inset">
                <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected6}>
                  <img  onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2iGKEdpXXXXXRXXXXXXXXXXXX_!!749864544-0-tae.jpg" src="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2ymemdpXXXXXpXpXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                  <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2iGKEdpXXXXXRXXXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>老虎机紫色模版</Button>
                </Tag>
              </div>
            </Col>
        </Row>
         <Row className="mod-row">
           <Col span="8">
             <div className="demo-col-inset">
               <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected7}>
                 <img  onClick={::this.onClick} data-setUrl="http://img02.taobaocdn.com/imgextra/i2/749864544/TB2TMIGdXXXXXXdXpXXXXXXXXXX_!!749864544-0-tae.jpg" src="http://img01.taobaocdn.com/imgextra/i1/749864544/TB2zDABdXXXXXX0XpXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                 <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img02.taobaocdn.com/imgextra/i2/749864544/TB2TMIGdXXXXXXdXpXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>年中大促砸金蛋模版</Button>
               </Tag>
             </div>
           </Col>
           <Col span="8">
             <div className="demo-col-inset">
               <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected8}>
                 <img  onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2HkcXdXXXXXaZXXXXXXXXXXXX_!!749864544-0-tae.jpg" src="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2aCbWdXXXXXaoXpXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                 <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2HkcXdXXXXXaZXXXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>年中大促九宫格模版</Button>
               </Tag>
             </div>
           </Col>
           <Col span="8">
             <div className="demo-col-inset">
               <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected9}>
                 <img  onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2kf9.dXXXXXXWXXXXXXXXXXXX_!!749864544-0-tae.jpg" src="http://img02.taobaocdn.com/imgextra/i2/749864544/TB2dU52dXXXXXbVXXXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                 <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2kf9.dXXXXXXWXXXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>年中大促转盘模版</Button>
               </Tag>
             </div>
           </Col>
        </Row>
         <Row className="mod-row">
           <Col span="8">
             <div className="demo-col-inset">
               <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected10}>
                 <img  onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB21sKJcVXXXXcNXXXXXXXXXXXX_!!749864544-0-tae.jpg" src="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2XXyJcVXXXXcxXXXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                 <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB21sKJcVXXXXcNXXXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>六一转盘模版</Button>
               </Tag>
             </div>
           </Col>
           <Col span="8">
             <div className="demo-col-inset">
               <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected11}>
                 <img  onClick={::this.onClick} data-setUrl="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2rMTKcFXXXXcQXXXXXXXXXXXX_!!749864544-2-tae.png" src="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2HPi0cFXXXXX6XpXXXXXXXXXX_!!749864544-2-tae.png"/>
                 <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2rMTKcFXXXXcQXXXXXXXXXXXX_!!749864544-2-tae.png" type='primary' shape='text'>六一九宫格模版</Button>
               </Tag>
             </div>
           </Col>
           <Col span="8">
             <div className="demo-col-inset">
               <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected12}>
                 <img  onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2BcIscXXXXXcBXXXXXXXXXXXX_!!749864544-0-tae.jpg" src="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2_Q3rcXXXXXc8XXXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                 <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2BcIscXXXXXcBXXXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>老虎机模版</Button>
               </Tag>
             </div>
           </Col>
        </Row>
        <Row className="mod-row">
          <Col span="8">
            <div className="demo-col-inset">
              <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected13}>
                <img  onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2MI3obFXXXXXTXpXXXXXXXXXX_!!749864544-0-tae.jpg" src="http://img02.taobaocdn.com/imgextra/i2/749864544/TB2M0UnbFXXXXbYXpXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2MI3obFXXXXXTXpXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>新年转盘模版</Button>
              </Tag>
            </div>
          </Col>
          <Col span="8">
            <div className="demo-col-inset">
              <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected14}>
                <img  onClick={::this.onClick} data-setUrl="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2RkyHbFXXXXauXpXXXXXXXXXX_!!749864544-0-tae.jpg"  src="http://img01.taobaocdn.com/imgextra/i1/749864544/TB2jRyKbFXXXXX_XXXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2RkyHbFXXXXauXpXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>砸金蛋红色模版</Button>
              </Tag>
            </div>
          </Col>
          <Col span="8">
            <div className="demo-col-inset">
              <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected15}>
                <img  onClick={::this.onClick} data-setUrl="http://img01.taobaocdn.com/imgextra/i1/749864544/TB2M1qGbpXXXXcYXXXXXXXXXXXX_!!749864544-0-tae.jpg" src="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2ntyCbpXXXXaFXpXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img01.taobaocdn.com/imgextra/i1/749864544/TB2M1qGbpXXXXcYXXXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>转盘新年模版</Button>
              </Tag>
            </div>
          </Col>
        </Row>
        <Row className="mod-row">
          <Col span="8">
            <div className="demo-col-inset">
              <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected16}>
                <img  onClick={::this.onClick} data-setUrl="http://img01.taobaocdn.com/imgextra/i1/749864544/TB2ubOnbpXXXXbsXpXXXXXXXXXX_!!749864544-0-tae.jpg" src="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2q5KybpXXXXbhXXXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img01.taobaocdn.com/imgextra/i1/749864544/TB2ubOnbpXXXXbsXpXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>九宫格圣诞模版</Button>
              </Tag>
            </div>
          </Col>
            <Col span="8">
                <div className="demo-col-inset">
                    <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected17}>
                        <img   onClick={::this.onClick} data-setUrl="/cp/images/141121_img04.jpg" src="/cp/images/141121_img04_1.jpg"/>
                        <Button style={{paddingLeft:10,float:'left'}}  onClick={::this.onClick} data-setUrl="/cp/images/141121_img04.jpg"  type='primary' shape='text'>经典转盘模版</Button>
                    </Tag>
                </div>
            </Col>
          <Col span="8">
            <div className="demo-col-inset">
              <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected18}>
                <img  onClick={::this.onClick} data-setUrl="/cp/images/141121_img01.jpg" src="/cp/images/141121_img01_1.jpg"/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="/cp/images/141121_img01.jpg" type='primary' shape='text'>蓝色模版</Button>
              </Tag>
            </div>
          </Col>
        </Row>
        <Row className="mod-row">
          <Col span="8">
            <div className="demo-col-inset">
              <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected19}>
                <img  onClick={::this.onClick} data-setUrl="/cp/images/141121_img02.jpg" src="/cp/images/141121_img02_1.jpg"/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="/cp/images/141121_img02.jpg" type='primary' shape='text'>绿色模版</Button>
              </Tag>
            </div>
          </Col>
          <Col span="8">
            <div className="demo-col-inset">
              <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected20}>
                <img  onClick={::this.onClick} data-setUrl="/cp/images/141121_img03.jpg" src="/cp/images/140805_turnbg021.jpg"/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="/cp/images/141121_img03.jpg" type='primary' shape='text'>深蓝色模版</Button>
              </Tag>
            </div>
          </Col>
          <Col span="8">
            <div className="demo-col-inset">
              <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected21}>
                <img  onClick={::this.onClick} data-setUrl="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2Ly7YcVXXXXchXXXXXXXXXXXX_!!749864544-0-tae.jpg" src="http://img04.taobaocdn.com/imgextra/i4/749864544/TB23Fo6cVXXXXanXXXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2Ly7YcVXXXXchXXXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>九宫格模版</Button>
              </Tag>
            </div>
          </Col>
        </Row>
        <Row className="mod-row">
          <Col span="8">
            <div className="demo-col-inset">
              <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected22}>
                <img  onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2H3NFbpXXXXa9XXXXXXXXXXXX_!!749864544-0-tae.jpg"  src="http://img01.taobaocdn.com/imgextra/i1/749864544/TB2.ttxbpXXXXX5XpXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2H3NFbpXXXXa9XXXXXXXXXXXX_!!749864544-0-tae.jpg"  type='primary' shape='text'>九宫格粉色模版</Button>
              </Tag>
            </div>
          </Col>
          <Col span="8">
            <div className="demo-col-inset">
              <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected23}>
                <img  onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2n_VwbpXXXXcWXXXXXXXXXXXX_!!749864544-0-tae.jpg" src="http://img04.taobaocdn.com/imgextra/i4/749864544/TB2wEFrbpXXXXb0XpXXXXXXXXXX_!!749864544-0-tae.jpg"/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="http://img03.taobaocdn.com/imgextra/i3/749864544/TB2n_VwbpXXXXcWXXXXXXXXXXXX_!!749864544-0-tae.jpg" type='primary' shape='text'>九宫格橙色模版</Button>
              </Tag>
            </div>
          </Col>
          <Col span="8">
            <div className="demo-col-inset">
              <Tag  shape="selectable" type="normal" className="custom-tag" selected={this.state.selected24}>
                <img  onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i1/749864544/TB2dKbmdSqJ.eBjy1zbXXbx8FXa-749864544.png" src="https://img.alicdn.com/imgextra/i4/749864544/TB2vhzddNmJ.eBjy0FhXXbBdFXa-749864544.png"/>
                <Button style={{paddingLeft:10,float:'left'}} onClick={::this.onClick} data-setUrl="https://img.alicdn.com/imgextra/i1/749864544/TB2dKbmdSqJ.eBjy1zbXXbx8FXa-749864544.png" type='primary' shape='text'>双十二模板</Button>
              </Tag>
            </div>
          </Col>
        </Row>
    </div>;
  }
}

export default connect((state)=> {
  return {
    pcMod: state.pcMod
  };
})(PcMod);

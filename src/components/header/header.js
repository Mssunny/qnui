'use strict';

import React from 'react';
import './header.scss';
import Input from 'qnui/lib/input';
import {Navigation,Icon,Menu} from 'qnui';
import $ from 'jquery';
import Button from 'qnui/lib/button';
import apimap from 'utils/apimap';
import Balloon from 'qnui/lib/balloon';
import LinkTool from 'utils/linkTools';
import logoimg from "../../images/logo.png"; // 图片像模块一样引入
 
const apienv = window.apienv || 'local';
const apiname = 'ActivityDiv';
const {Item, Group} = Navigation
let onMouseEnter = (id, item, nav) => {
    // console.log('onMouseEnter')
}

let onMouseLeave = (id, item, nav) => {
    // console.log('onMouseLeave')
}
const MoveTarget = <Icon className='ml5' type='help' size='small'/>;

class Header extends React.Component {
  constructor(props){
    console.log("props"+JSON.stringify(props))
      super(props);
      this.state={
          rlt:[],
          unTeleCount:false
      }
  }
  componentWillMount(){ //render前，最好用来服务器端处理数据
    $.get(apimap[apienv]['HeadInfo'],function(data){
      var resultData = apienv=='local'? data:JSON.parse(data);
      this.setState({
        rlt:resultData
      })
      if(resultData.teleCount<10){
        this.setState({
          unTeleCount:true
        })
      }
    }.bind(this));
  }
  teleCountClose(){
    this.setState({
      unTeleCount:false
    })
  }
  render() {
    return (
       <Navigation
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        type="filling"
        activeDirection="bottom"
        >
        <li className="navigation-logo-zone">
  			<img src={logoimg} />
        <span>您好&nbsp;,&nbsp;{this.state.rlt.nick}&nbsp;&nbsp;</span>
        <a href="javascript:if(confirm('确认退出')){location.href='Exit.h4'};" style={{color:'white',fontSize:'10px'}}>退出</a>
        <Input htmlType="hidden" value={this.state.rlt.shopName } ref="shopName-hidden"/>
  		  </li>
        <li className="navigation-toolbar">
          <ul style={{width:'100%'}}>
            <li>
              <span>话费余额&nbsp;:</span><a style={{color:'yellow'}}>&nbsp;{this.state.rlt.teleCount}&nbsp;</a><span>元</span>
              <Balloon visible={this.state.unTeleCount} onCloseClick={this.teleCountClose.bind(this)} style={{lineHeight:0}}>
                  <span style={{verticalAlign:'middle'}}>亲 您<a style={{color:'orange'}}>话费余额</a>不足哦!</span>
              </Balloon>
              <Balloon trigger={MoveTarget} triggerType="hover" style={{height:'110px'}}>
                  <div >
                    <p style={{padding:0,margin:0,fontSize:'12px'}}><b>话费的用途：</b></p>
                    <p style={{fontSize:'10px'}}>是一种刺激和奖励买家的奖品；使用在营销手法中，店家可设置"<span>满就送</span>"、"<span>好评送</span>"抽奖等营销活动中，提高客户粘性和好评率！
                    </p>
                  </div>
              </Balloon>
            </li>
            <li>
              <span>用户短信余额&nbsp;:</span><a style={{color:'yellow'}}>&nbsp;{this.state.rlt.smsCount}&nbsp;</a><span>条</span>
            </li>
            <li>
              <Icon type="dollar" size='small'/>
              <span><a href={LinkTool['router-pay']} style={{color:'white',fontSize:'10px'}}>充值</a></span>
            </li>
			       {/*<li>*/}
              {/*<Icon type="set" size='small'/>*/}
              {/*<span><a href="/admin/Tools.h4" style={{color:'white',fontSize:'10px'}}>工具箱</a></span>*/}
            {/*</li>*/}
			      <li>
              <Icon type="descending" size='small'/>
              <span><a href="http://tb.cn/F2nhPWx" target="_blank" style={{color:'white',fontSize:'10px'}}>续费</a></span>
            </li>

          </ul>
        </li>
    </Navigation>


    );
  }
}
export default Header;

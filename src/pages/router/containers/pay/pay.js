'use strict';

import React from 'react';
import * as actions from '../../actions/praiseSend';
import { connect } from 'react-redux';
import Button from 'qnui/lib/button';
import Tab from 'qnui/lib/tab';
import $ from 'jquery';
import LinkTool from 'utils/linkTools';
import Notice from 'qnui/lib/notice';
import Breadcrumb from 'qnui/lib/breadcrumb';
import Tools from 'utils/index';
import apimap from 'utils/apimap';
import './pay.scss';
const apienv = window.apienv || 'local';

class Pay extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data:[],
    }
  }
  componentWillMount(){

  }

  render() {
    return (
      <div>
        <Breadcrumb style={{padding:20}}>
          <Breadcrumb.Item link={LinkTool['index']}>首页</Breadcrumb.Item>
          <Breadcrumb.Item link={LinkTool['router-pay']} style={{color:'#ff8804'}}>短信充值</Breadcrumb.Item>
        </Breadcrumb>
      <div className='div-index'>
      <div><b className="f333 mr10">话费包购买</b><span className="f60 f12">(抽奖活动专用礼品包)</span></div>
      <div className="border-b">
        <table className="mb15">
          <tbody>
           <tr>
            <td><a href="http://item.taobao.com/item.htm?id=41968239995" target="_blank"><img src="/cp/images/tele_1_02.gif" /></a></td>
            <td><a href="http://item.taobao.com/item.htm?spm=0.0.0.0.RViRfi&id=41987534616" target="_blank"><img src="/cp/images/tele_1_04.jpg" /></a></td>
            <td><a href="http://item.taobao.com/item.htm?spm=0.0.0.0.cskEDz&id=42031128495" target="_blank"><img src="/cp/images/tele_1_06.gif" /></a></td>
            <td><a href="http://item.taobao.com/item.htm?spm=0.0.0.0.YRtCSR&id=42016837092" target="_blank"><img src="/cp/images/tele_1_08.gif" /></a></td>
            <td><a href="http://item.taobao.com/item.htm?spm=0.0.0.0.Sp0YfS&id=42016541562" target="_blank"><img src="/cp/images/tele_1_10.gif" /></a></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="pb10 mb10 mt30 border-b">
        <b className="f333 mr10">短信购买</b>
        &nbsp;&nbsp;&nbsp;&nbsp;<a href="https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-359636479.2.Hkh9Ss&id=44931478036"
                                   target="_blank" className="buy-now f18">立即充值</a>
      </div>
      <div className="pop-b p10 f333 nn-sms-ts">
        <Notice title="" type="warning">
          <p className="f14 lh150 link-txt">短信包购买后预计30分钟到账，请您耐心等待<br/>
            短信是特殊商品，购买后永久有效且不可退款如短信未到账，请联系客服旺旺：<img src="/cp/images/ww.png" height="18" width="67"/><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2381021848&site=qq&menu=yes">杭州佑软科技有限公司</a></p>
        </Notice>
       </div>
    </div>
      </div>
   );
  }
}

export default connect((state)=> {
  return {
    pay: state.pay
  };
})(Pay);

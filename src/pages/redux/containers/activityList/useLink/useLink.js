'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/useLink';
import Step, { Item as StepItem } from 'qnui/lib/step';
import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';
import Field from 'qnui/lib/field';
import Dialog from 'qnui/lib/dialog';
import Icon from 'qnui/lib/icon';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';
import apimap from 'utils/apimap';
import Breadcrumb from 'qnui/lib/breadcrumb'
import Radio from 'qnui/lib/radio';
import Select from 'qnui/lib/select';
import NumberPicker from 'qnui/lib/number-picker';
import Search from 'qnui/lib/search';
import Pagination from 'qnui/lib/pagination';
import { Row, Col } from 'qnui/lib/grid';
import $ from 'jquery';
import LinkTool from 'utils/linkTools';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import './useLink.scss';

const apienv = window.apienv || 'local';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane=Tab.TabPane;
const formatFunc = (val) => {
    return val;
};


class UseLink extends React.Component {
   constructor(props){
    super(props);
      this.state = {
        data:[]
      };
     this.field = new Field(this);
  }
  componentWillMount() {
    $.get(apimap[apienv]['MarketingMobileLotterygenx'], function (result) {
      var resultData = (apienv == 'local' ? result : JSON.parse(result));
      console.log('useLink.resultData->', resultData);
      this.setState({
          data:resultData
      });
    }.bind(this));
  }
  mFitment(){
    self.location.href = LinkTool['redux-mobileMod'];
  }
  pFitment(){
    window.open('https://h5.m.taobao.com/channel/rgn/mobile/shop_manage.html?spm=a1z0e.1.0.0.2CHoZM&scm=1028.1.1.408');
  }
  fFitment(){
    self.location.href = LinkTool['redux-fullMod'];
  }
  render(){
    return (
      <div>
        <Breadcrumb style={{padding: 20}}>
            <Breadcrumb.Item link={LinkTool['index']}>抽奖活动</Breadcrumb.Item>
            <Breadcrumb.Item link={LinkTool['redux-setConfig']}>活动设置</Breadcrumb.Item>
            <Breadcrumb.Item link={LinkTool['redux-recordList']}>链接安装</Breadcrumb.Item>
        </Breadcrumb>
        <br/><br/>
        <Row className="pd20">
          <Col span="4">
            <div className="tx-right">手机模板：</div>
          </Col>
          <Col span="10">
            <div className="box">
              <div className="box-left">
                <div>
                  <img src={this.state.data.qrcodeurl}/>
                </div>
                <div className="mt5">
                  <img src="https://img.alicdn.com/imgextra/i1/749864544/TB29dnaXR0kpuFjy1XaXXaFkVXa-749864544.jpg" alt=" 02.jpg"/>
                </div>
              </div>
              <div className="box-right">
                <img src="https://img.alicdn.com/imgextra/i2/749864544/TB2pCUNXUhnpuFjSZFPXXb_4XXa-749864544.gif" alt="手机扫码.gif"/>
              </div>
            </div>
          </Col>
          <Col span="10">
            <div><Button type="primary" size="large" onClick={this.mFitment.bind(this)}>去装修</Button></div>
          </Col>
        </Row>
        <Row className="pd20">
          <Col span="4">
            <div className="tx-right">手淘专属链接：</div>
          </Col>
          <Col span="10"><div><Input multiple className="textarea" value={this.state.data.ma_urls} /></div></Col>
          <Col span="10">
            <div><Button type="primary" size="large" onClick={this.pFitment.bind(this)}>去装修</Button></div>
            <div className="mt10"><a href="https://fuwu.bbs.taobao.com/detail.html?spm=0.0.0.0.iW6c7x&postId=1801165" target="_blank">如何安装手机抽奖</a></div>
          </Col>
        </Row>
        <Row>
          <Col span="4">
            <div className="tx-right">全屏模板链接：</div>
          </Col>
          <Col span="10"><div><Input multiple className="textarea" value={this.state.data.full_urls} /></div></Col>
          <Col span="10">
            <div><Button type="primary" size="large" onClick={this.fFitment.bind(this)}>去装修</Button></div>
            <div className="mt10"><a href="https://isv081.bbs.taobao.com/detail.html?spm=a210m.7841120.0.0.2gcTU9&postId=7468960" target="_blank">如何安装全屏模板</a></div>
          </Col>
        </Row>
        {/*<Tab defaultActiveKey='1' size='medium'>*/}
          {/*<TabPane tab='全部赠送记录' key='1'>*/}
            {/*<div style={{paddingTop: 5, paddingBottom: 5}}>活动类型:*/}
              {/*&nbsp;&nbsp;<Select style={{verticalAlign: 'middle'}} dataSource={getSelectData}/>&nbsp;&nbsp;*/}
              {/*时间:*/}
              {/*&nbsp;&nbsp;<RangePicker format='YYYY-MM-DD' onChange={(val, str) => console.log(val, str)}/>&nbsp;&nbsp;*/}
               {/*用户昵称:*/}
               {/*&nbsp;&nbsp;<Input type='text' style={{width: 180}} onChange={(v)=>this.setState({userNickValue:v})}/>&nbsp;&nbsp;*/}
               {/*&nbsp;&nbsp;<Button type='primary' onClick={this.handleClicked.bind(this)}>搜索</Button>&nbsp;&nbsp;*/}
               {/*&nbsp;&nbsp;<Button type='primary' onClick={this.handleCancel.bind(this)}>清空所有消息</Button>&nbsp;&nbsp;*/}
            {/*</div>*/}
            {/*<br></br>*/}
            {/*<Table dataSource={getTableData(this.state.tableNum)}>*/}
                {/*<Table.Column title='昵称' width={120} dataIndex='nickName'/>*/}
                {/*<Table.Column title='满就送/已送' width={120} dataIndex='manSend' />*/}
                {/*<Table.Column title='买就送/已送' width={120} dataIndex='maiSend'/>*/}
                {/*<Table.Column title='评价送/已送' width={120} dataIndex='pingjiaSend'/>*/}
                {/*<Table.Column title='收藏送/已送' width={120} dataIndex='shoucangSend'/>*/}
                {/*<Table.Column title='签到送/已送' width={120} dataIndex='qiandaoSend'/>*/}
                {/*<Table.Column title='分享送/已送' width={120} dataIndex='fenxiangSend'/>*/}
                {/*<Table.Column title='进店送/已送' width={120} dataIndex='jindianSend'/>*/}
                {/*<Table.Column title='最后修改时间' width={120} dataIndex='lastModify'/>*/}
            {/*</Table>*/}
            {/*<Pagination style={{paddingTop:20, paddingBottom:20, textAlign: 'center'}} defaultCurrent={1} onChange={this.paginationChange.bind(this)} />*/}
          {/*</TabPane>*/}
          {/*<TabPane tab='全部中奖记录' key='2'>全部中奖记录</TabPane>*/}
          {/*<TabPane tab='短信发送记录' key='3'>短信发送记录</TabPane>*/}
        {/*</Tab>*/}

      </div>
      );
  }
}
export {UseLink as default};

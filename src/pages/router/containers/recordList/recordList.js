'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/recordList';
import Step, { Item as StepItem } from 'qnui/lib/step';
import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Field from 'qnui/lib/field';
import Breadcrumb from 'qnui/lib/breadcrumb'
import Radio from 'qnui/lib/radio';
import Select from 'qnui/lib/select';
import apimap from 'utils/apimap';
import Pagination from 'qnui/lib/pagination';
import LinkTool from 'utils/linkTools';
import { RangePicker } from 'qnui/lib/date-picker';
import Dialog from 'qnui/lib/dialog';
import $ from 'jquery';
import './recordList.scss';
const apienv = window.apienv || 'local';
const TabPane=Tab.TabPane;
const onDrawChange = function(...args){
    console.log(...args);
};
// const getTableData = (num) => {
//     let result = [];
//     for(let i = 0; i< num; i++){
//       let date = new Date();
//       date = date.toTimeString();
//       //console.log(date);
//       result.push({
//           nickName: `f_xuxinxin${1+i}`,
//           manSend: '0/0',
//           maiSend: '0/0',
//           pingjiaSend: '0/0',
//           jindianSend: '0/0',
//           shoucangSend: '0/0',
//           fenxiangSend: '0/0',
//           qiandaoSend: '0/0',
//           lastModify: date
//         })
//     }
//     return result;
// };
const getDrawTableData = (num) => {
    let result = [];
    for(let i = 0; i< num; i++){
      let date = new Date();
      date = date.toTimeString();
      //console.log(date);
      result.push({
          nickName: `f_xuxinxin${1+i}`,
          drawState: '已发奖',
          sendType: '',
          prizeLv: '',
          prizeName: '笑话段子',
          drawNum: '1',
          drawTime: date
        })
    }
    return result;
};
var getSelectData = [
  {label:'全部', value:'allActivity'},
  {label:'买就送', value:'maiSend'},
  {label:'满就送', value:'manSend'},
  {label:'评价送', value:'pingjiaSend'},
  {label:'进店送', value:'jindianSend'},
  {label:'收藏送', value:'shoucangSend'},
  {label:'分享送', value:'fenxiangSend'},
  {label:'签到送', value:'qiandaoSend'}
];
var getStateData = [
  {label:'正在运行', value:'isRunning'},
  {label:'已暂停', value:'isStoped'},
  {label:'已结束', value:'isFinished'}
];
var getPrizeData = [
  {label:'一等奖', value:'first'},
  {label:'二等奖', value:'second'},
  {label:'三等奖', value:'third'},
  {label:'四等奖', value:'fourth'},
  {label:'五等奖', value:'fifth'},
  {label:'六等奖', value:'sixth'}
];

class RecordList extends React.Component {
   constructor(props){
    super(props);
      this.state = {
        all_userNickValue:'',
        draw_userNickValue:'',
        tableNum:8,
        drawTableNum:1,
        zhengsong:[],
        zhongjiang:[],
        duanxin:[]
      };
     this.field = new Field(this);
  }
  // 全部赠送记录
  zhengsongPage(){
    $.ajax({
      type: apienv=='local'?'GET':'POST',
      url: apienv=='local'?apimap[apienv]['GiftDrawChancetoo']:apimap[apienv]['GiftDrawChancetoo'],
      data: {"activityId": this.props.activityId},
      dataType: 'json',
      async: false,
      success: function(data) {
        console.log(data);
        this.setState({
          zhengsong:data.data
        })
      }
    }.bind(this));
  }
  // 全部中奖记录
  zhongjiangPage(){
    $.ajax({
      type: apienv=='local'?'GET':'POST',
      url: apienv=='local'?apimap[apienv]['MarketingMeansDrawgx']:apimap[apienv]['MarketingMeansDrawgx'],
      data: {"type":"z","activityId":this.props.activityId},
      dataType: 'json',
      async: false,
      success: function(data) {
        console.log(data);
        this.setState({
          zhongjiang:data.data
        })
      }
    }.bind(this));
  }
  // 短信发送记录
  duanxinPage(){
    $.ajax({
      type: apienv=='local'?'GET':'POST',
      url: apienv=='local'?apimap[apienv]['SMSDrawChancegx']:apimap[apienv]['SMSDrawChancegx'],
      data: {"type":"z"},
      dataType: 'json',
      async: false,
      success: function(data) {
        console.log(data);
        this.setState({
          duanxin:data.data
        })
      }
    }.bind(this));
  }
  paginationChange(Obj){
    console.log(Obj);
  }
  onSearch(value) {
       console.log(value);
   }
   onChange(value) {
       console.log(value);
   }
   handleClicked(event){
     event.preventDefault();
     console.log('点击获取value');
     console.log('all_userNickValue:'+ this.state.all_userNickValue);
     $.ajax({
       type: apienv=='local'?'GET':'POST',
       url: apienv=='local'?apimap[apienv]['GiftDrawChancetoo']:apimap[apienv]['GiftDrawChancetoo'],
       data: '',
       dataType: 'json',
       async: false,
       success: function(data) {
         console.log(data);
       }
     });
   }
   handleCancel(){
     console.log('handleCancel');
     Dialog.confirm({
       content: '请慎重操作，您确定要清空所有赠送记录，清空后不可恢复?',
       onOk: () => {
         $.ajax({
           type: apienv=='local'?'GET':'POST',
           url: apienv=='local'?apimap[apienv]['MarketingMeansDrawDel']:apimap[apienv]['MarketingMeansDrawDel'],
           data: apienv=='local'?{}:{},
           dataType: 'json',
           async: false,
           success: (json)=>{
             if(json.rlt==0){
               //location.reload();
               this.setState({
                 tableNum:0
               })
             }else{
               Dialog.alert({content:json.txt});
             }
           },
           error: (xhr, status, error)=>{
             console.log('xhr=',xhr,' status=',status,' error=',error);
           }
         });
       }
     });
   }
   handleDrawSearch(event){
     event.preventDefault();
     console.log('handleSearch');
     console.log('draw_userNickValue:'+ this.state.draw_userNickValue);
   }
   handleMarkSended(){
     console.log('handleMarkSended');
   }
   handleSendDraw(){
     console.log('handleSendDraw');
   }
   handleExport(){
     console.log('handleExport');
   }
   handleClearAllRecord(){
     this.setState({
       drawTableNum:0
     });
     console.log('handleClearAllRecord');
   }

  render(){
    const rowSelection = {
        onChange: onDrawChange,
        getProps: (record) =>{
            return {
                disabled: record.nickName == f_xuxinxin
            }
        }
    }
    return (
      <div>
        <Breadcrumb style={{padding: 20}}>
        <Breadcrumb.Item link={LinkTool['index']}>活动信息</Breadcrumb.Item>
        <Breadcrumb.Item link={LinkTool['router-recordList']}>送礼记录</Breadcrumb.Item>
        </Breadcrumb>
        <br></br>
        <Tab defaultActiveKey='1' size='medium'>
          <TabPane tab='全部赠送记录' key='1'>
            <div style={{paddingTop: 5, paddingBottom: 5}}>活动类型:
              &nbsp;&nbsp;<Select style={{verticalAlign: 'middle'}} dataSource={getSelectData}/>&nbsp;&nbsp;
              时间:
              &nbsp;&nbsp;<RangePicker format='YYYY-MM-DD' onChange={(val, str) => console.log(val, str)}/>&nbsp;&nbsp;
               用户昵称:
               &nbsp;&nbsp;<Input type='text' style={{width: 180}} onChange={(v)=>this.setState({all_userNickValue:v})}/>&nbsp;&nbsp;
               &nbsp;&nbsp;<Button type='primary' onClick={this.handleClicked.bind(this)}>搜索</Button>&nbsp;&nbsp;
               &nbsp;&nbsp;<Button type='primary' onClick={this.handleCancel.bind(this)}>清空所有消息</Button>&nbsp;&nbsp;
            </div>
            <br></br>
            <Table dataSource={this.state.zhengsong}>
                <Table.Column title='昵称' width={120} dataIndex='buyerNick'/>
                <Table.Column title='满就送/已送' dataIndex='fullCount/aleradyFullCount' />
                <Table.Column title='买就送/已送' dataIndex='buyerCount/aleradyBuyerCount'/>
                <Table.Column title='评价送/已送' dataIndex='rateCount/aleradyRateCount'/>
                <Table.Column title='收藏送/已送' dataIndex='intoCount/aleradyIntoCount'/>
                <Table.Column title='签到送/已送' dataIndex='cartCount/aleradyCartCount'/>
                <Table.Column title='分享送/已送' dataIndex='shareCount/aleradyShareCount'/>
                <Table.Column title='进店送/已送' dataIndex='collectionCount/aleradyCollectionCount'/>
                <Table.Column title='最后修改时间' dataIndex='addTime'/>
            </Table>
            <Pagination style={{paddingTop:20, paddingBottom:20, textAlign: 'center'}} defaultCurrent={1} onChange={this.paginationChange.bind(this)} />
          </TabPane>
          <TabPane tab='全部中奖记录' key='2'>
            用户昵称:
            &nbsp;&nbsp;<Input type='text' style={{width: 180}} onChange={(v)=>this.setState({draw_userNickValue:v})}/>&nbsp;&nbsp;
            活动状态:
            &nbsp;&nbsp;<Select style={{verticalAlign: 'middle'}} dataSource={getStateData}/>&nbsp;&nbsp;
            奖项:
            &nbsp;&nbsp;<Select style={{verticalAlign: 'middle'}} dataSource={getPrizeData}/>&nbsp;&nbsp;
            <br></br>
            <div style={{paddingTop:10, paddingBottom:10}}>
              &nbsp;&nbsp;<Button type='primary' onClick={this.handleDrawSearch.bind(this)}>搜索</Button>&nbsp;&nbsp;
              &nbsp;&nbsp;<Button type='primary' onClick={this.handleMarkSended.bind(this)}>标记为已发奖</Button>&nbsp;&nbsp;
              &nbsp;&nbsp;<Button type='primary' onClick={this.handleSendDraw.bind(this)}>选中发放</Button>&nbsp;&nbsp;
              &nbsp;&nbsp;<Button type='primary' onClick={this.handleExport.bind(this)}>导出</Button>&nbsp;&nbsp;
              &nbsp;&nbsp;<Button type='primary' onClick={this.handleClearAllRecord.bind(this)}>清空所有中奖记录</Button>&nbsp;&nbsp;
            </div>
            <Table rowSelection={this.rowSelection} dataSource={getDrawTableData(this.state.drawTableNum)}>
                <Table.Column title='昵称' width={120} dataIndex='nickName'/>
                <Table.Column title='状态' dataIndex='drawState' />
                <Table.Column title='赠送方式' dataIndex='sendType'/>
                <Table.Column title='奖项' dataIndex='prizeLv'/>
                <Table.Column title='奖品' dataIndex='prizeName'/>
                <Table.Column title='摇奖数量' dataIndex='drawNum'/>
                <Table.Column title='摇奖时间' dataIndex='drawTime'/>
                <Table.Column title='操作' dataIndex='opration'/>
            </Table>
          </TabPane>
          <TabPane tab='短信发送记录' key='3'>
            <div style={{paddingTop: 5, paddingBottom: 5}}>
              时间:
              &nbsp;&nbsp;<RangePicker format='YYYY-MM-DD' onChange={(val, str) => console.log(val, str)}/>&nbsp;&nbsp;
              用户昵称:
              &nbsp;&nbsp;<Input type='text' style={{width: 180}} onChange={(v)=>this.setState({all_userNickValue:v})}/>&nbsp;&nbsp;
              &nbsp;&nbsp;<Button type='primary' onClick={this.handleClicked.bind(this)}>搜索</Button>&nbsp;&nbsp;
            </div>
            <br></br>
            <Table rowSelection={this.rowSelection} dataSource={getDrawTableData(this.state.drawTableNum)}>
              <Table.Column title='昵称' width={120} dataIndex='nickName'/>
              <Table.Column title='手机号码' width={120} dataIndex='drawState' />
              <Table.Column title='发送时间' width={120} dataIndex='sendType'/>
              <Table.Column title='短信内容' width={120} dataIndex='prizeLv'/>
            </Table>
            <Pagination style={{paddingTop:20, paddingBottom:20, textAlign: 'center'}} defaultCurrent={1} onChange={this.paginationChange.bind(this)} />
          </TabPane>
        </Tab>


      </div>
      );
  }
}
export default connect((state)=> {
  return {
    recordList: state.recordList
  };
})(RecordList);

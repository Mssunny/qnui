'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/recordList';
import Step, { Item as StepItem } from 'qnui/lib/step';
import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import apimap from 'utils/apimap';
import Checkbox from 'qnui/lib/checkbox';
import Field from 'qnui/lib/field';
import Dialog from 'qnui/lib/dialog';
import Icon from 'qnui/lib/icon';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';
import Breadcrumb from 'qnui/lib/breadcrumb'
import Radio from 'qnui/lib/radio';
import Select from 'qnui/lib/select';
import NumberPicker from 'qnui/lib/number-picker';
import Search from 'qnui/lib/search';
import Pagination from 'qnui/lib/pagination';
import DatePicker, { MonthPicker, YearPicker, RangePicker } from 'qnui/lib/date-picker';
import moment from 'qnui/lib/moment';
import LinkTool from 'utils/linkTools';
import $ from 'jquery';
import './recordList.scss';

const apienv = window.apienv || 'local';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane=Tab.TabPane;
const contOne = (<span>设置条件</span>);
const contTwo = (<span>设置奖品</span>);
const contThree = (<span>设置模板</span>);
const contFour = (<span>完成</span>);
const formatFunc = (val) => {
    return val;
};
let startime="";
let endtime="";
let drawIds=''
const onDrawChange = function(ids, records){
    console.log("Keys==========="+ids, records);
    drawIds=','+ids;
};
const getTableData = (num) => {
    let result = [];
    for(let i = 0; i< num; i++){
      let date = new Date();
      date = date.toTimeString();
      //console.log(date);
      result.push({
          nickName: `f_xuxinxin${1+i}`,
          manSend: '0/0',
          maiSend: '0/0',
          pingjiaSend: '0/0',
          jindianSend: '0/0',
          shoucangSend: '0/0',
          fenxiangSend: '0/0',
          qiandaoSend: '0/0',
          lastModify: date
        })
    }
    return result;
};
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
  // {label:'全部', value:'allActivity'},
  // {label:'买就送', value:'maiSend'},
  // {label:'满就送', value:'manSend'},
  // {label:'评价送', value:'pingjiaSend'},
  // {label:'进店送', value:'jindianSend'},
  // {label:'收藏送', value:'shoucangSend'},
  // {label:'分享送', value:'fenxiangSend'},
  // {label:'签到送', value:'qiandaoSend'}
  {label:'全部', value:'0'},
  {label:'刺激引流送', value:'1'},
  {label:'好评送', value:'2'},
  {label:'满就送', value:'3'},
  {label:'买就送', value:'4'}
];

var getStateData = [
  {label:'全部', value:''},
  {label:'未发奖', value:'1'},
  {label:'已发奖', value:'2'},
  {label:'发奖失败', value:'3'}
];
var getPrizeData = [
  {label:'全部', value:''},
  {label:'一等奖', value:'1'},
  {label:'二等奖', value:'2'},
  {label:'三等奖', value:'3'},
  {label:'四等奖', value:'4'},
  {label:'五等奖', value:'5'},
  {label:'六等奖', value:'6'}
];

class RecordList extends React.Component {
   constructor(props){
    super(props);
      this.state = {
        all_userNickValue:'',
        draw_userNickValue:'',
        draw_status:'',
        draw_prize_level:'',
        tableNum:8,
        drawTableNum:1,
        activityId:this.props.location.query.activityId,
        mxVisible:false,
        zhengsong:[],
        current1:'1',
        total1:'10',
        zhongjiang:[],
        current2:'1',
        total2:'10',
        duanxin:[],
        zjType:'',
        zjId:"",
        marketType:'',
        current3:'1',
        total3:'10',
        mxInfo:[]
      };
     this.field = new Field(this);
  }
  // 全部赠送记录
  zhengsongPage(){
     const _this=this;
    $.ajax({
      type: apienv=='local'?'GET':'POST',
      url: apienv=='local'?apimap[apienv]['GiftDrawChancetoo']:apimap[apienv]['GiftDrawChancetoo'],
      data: {"activityId": this.state.activityId},
      dataType: 'json',
      async: false,
      success: function(data) {
        if(data.rlt==0){
          let list=[];
          for(let i=0;i<data.data.length;i++){
            list.push(data.data[i]);
          }
          console.log(data);
          const mType=(data.mtype=="" || data.mtype=="null")? "0":data.mType
          _this.setState({
            zhengsong:list,
            current1:data.curPage,
            total1:data.totalRecord,
            zsmType:mType
          })
        }
      }
    });
  }
  manSend = (value, index, record) => {
    return (record.fullCount+'/'+record.aleradyFullCount);
  }
  maiSend = (value, index, record) => {
    return (record.buyerCount+'/'+record.aleradyBuyerCount);
  }
  pingjiaSend = (value, index, record) => {
    return (record.rateCount+'/'+record.aleradyRateCount);
  }
  jindianSend = (value, index, record) => {
    return (record.intoCount+'/'+record.aleradyIntoCount);
  }
  shoucangSend = (value, index, record) => {
    return (record.collectionCount+'/'+record.aleradyCollectionCount);
  }
  fenxiangSend = (value, index, record) => {
    return (record.shareCount+'/'+record.aleradyShareCount);
  }
  qiandaoSend= (value, index, record) => {
    return (record.signCount+'/'+record.aleradySignCount);
  }
  // 全部中奖记录
  zhongjiangPage(){
    const _this=this;
    $.ajax({
      type: apienv=='local'?'GET':'POST',
      url: apienv=='local'?apimap[apienv]['MarketingMeansDrawgx']:apimap[apienv]['MarketingMeansDrawgx'],
      data: {"type":"z","activityId":this.state.activityId},
      dataType: 'json',
      async: false,
      success: function(data) {
        console.log('中奖纪录'+data);
        if(data.rlt==0){
          let list=[];
          for(let i=0;i<data.data.length;i++){
            list.push(data.data[i]);
          }
          _this.setState({
            zhongjiang:list,
            current2:data.curPage,
            total2:data.totalRecord,
            zjType:data.type,
            zjId:data.id,
            marketType:data.marketType
          })
        }
      }
    });
  }
  buyerNick = (value, index, record) => {
    return (<div dangerouslySetInnerHTML={{__html:record.buyerNick +'<a target="_blank" href="http://www.taobao.com/webww/ww.php?ver=3&touid='+record.buyerNick+'&siteid=cntaobao&status=2" ><img border="0" src="http://amos.im.alisoft.com/online.aw?v=2&uid='+record.buyerNick+'&site=cntaobao&s=1&charset=utf-8" alt="有事联系我" /></a>'}}/>);
  }
  drawState = (value, index, record) => {
    if(record.isSend=='0'){
      return ('未发奖');
    }else if(record.isSend=='1'){
      return ('未发奖');
    }else if(record.isSend=='2'){
      return ('已发奖');
    }else if(record.isSend=='3'){
      return ('发奖失败');
    }else if(record.isSend=='9'){
      return ('系统自动发奖失败');
    }
  }
  sendType = (value, index, record) => {
    if(record.marketType=='drainage'){
      return ('刺激引流');
    }else if(record.marketType=='full'){
      return ('满就送');
    }else if(record.marketType=='buyer'){
      return ('买就送');
    }else if(record.marketType=='praise'){
      return ('好评送');
    }
  }
  prizeLv = (value, index, record) => {
    if(record.prize=='1'){
      return ('一等奖');
    }else if(record.prize=='2'){
      return ('二等奖');
    }else if(record.prize=='3'){
      return ('三等奖');
    }else if(record.prize=='4'){
      return ('四等奖');
    }else if(record.prize=='5'){
      return ('五等奖');
    }else if(record.prize=='6'){
      return ('六等奖');
    }
  }
  drawNum = (value, index, record) => {
    return (1);
  }
  opration = (value, index, record) => {
    // console.log('明细'+value, index,record);
    if(this.state.zjType=='z'){
      return (<a href="javascript:void(0)" onClick={this.mx_info.bind(this,record.id,record.buyerNick)}>明细</a>);
    }
  }
  mx_info(uid,buyerNick){
    console.log('uid,buyerNick'+uid,buyerNick);
    this.setState({
      mxVisible:true
    })
    const _this=this;
    $.ajax({
      type: apienv=='local'?'GET':'POST',
      url: apienv=='local'?apimap[apienv]['MarketingMeansDrawUserInfo']:apimap[apienv]['MarketingMeansDrawUserInfo'],
      data: {"nick":buyerNick,"uid":uid},
      dataType: 'json',
      async: false,
      success: function(data) {
        console.log(data);
        _this.setState({
          mxInfo:data.mixUser,
          mxVisible:true
        })
      }
    });
  }
  // 短信发送记录
  duanxinPage(){
    const _this=this;
    $.ajax({
      type: apienv=='local'?'GET':'POST',
      url: apienv=='local'?apimap[apienv]['SMSDrawChancegx']:apimap[apienv]['SMSDrawChancegx'],
      data: {"type":"z"},
      dataType: 'json',
      async: false,
      success: function(data) {
        console.log(data);
        if(data.rlt==0){
          let list=[];
          for(let i=0;i<data.data.length;i++){
            list.push(data.data[i]);
          }
          _this.setState({
            duanxin:data.data,
            current3:data.curPage,
            total3:data.totalRecord,
          })
        }
      }
    });
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
  componentWillMount(){
    this.zhengsongPage();
    this.zhongjiangPage();
    this.duanxinPage();
  }
   handleClicked(event){
     event.preventDefault();
     console.log('点击获取value');
     console.log('all_userNickValue:'+ this.state.all_userNickValue);
     let data={
       'startime':startime,
       'endtime':endtime,
       'nick':this.state.all_userNickValue,
       'mtype':this.state.zsmType,
       'activityId':this.state.activityId
     }
     console.log("data"+data);
     $.ajax({
       type: apienv=='local'?'GET':'POST',
       url: apienv=='local'?apimap[apienv]['GiftDrawChancetoo']:apimap[apienv]['GiftDrawChancetoo'],
       data: data,
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
           data:{"type":"2","activityId":this.state.activityId},
           dataType: 'json',
           async: false,
           success: (json)=>{
             if(json.rlt==0){
               //location.reload();
               this.setState({
                 zhengsong:{}
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
   timeChange(val, str){
     console.log(val, str);
     startime=str[0];
     endtime=str[1];
   }
   handleDrawSearch(event){
     event.preventDefault();
     console.log('handleSearch');
     console.log('draw_userNickValue:'+ this.state.draw_userNickValue);
     let params={
       "search":this.state.draw_userNickValue,
       "type":this.state.zjType,
       "id":this.state.zjId,
       "marketType":this.state.marketType,
       "statue":this.state.draw_status,
       "prize_level":this.state.draw_prize_level,
       "activityId":this.state.activityId
     };
     $.ajax({
       type: apienv=='local'?'GET':'POST',
       url: apienv=='local'?apimap[apienv]['MarketingMeansDrawgx']:apimap[apienv]['MarketingMeansDrawgx'],
       data:params,
       dataType: 'json',
       async: false,
       success: (json)=>{
          this.setState({
            zhongjiang:json.data
          })
       },
       error: (xhr, status, error)=>{
         console.log('xhr=',xhr,' status=',status,' error=',error);
       }
     });
   }
   handleMarkSended(){
     console.log('handleMarkSended');
     if(drawIds==''||drawIds.length<=1){
       Dialog.alert({content:"请选择要标记的列！"});
       return ;
     }else{
       $.ajax({
         type: apienv=='local'?'GET':'POST',
         url: apienv=='local'?apimap[apienv]['MarketingMeansDrawUpdateSendType']:apimap[apienv]['MarketingMeansDrawUpdateSendType'],
         data:{"drawIds":drawIds,"activityId":this.state.activityId},
         dataType: 'json',
         async: false,
         success: (json)=>{
           if(json.rlt==0){
             Dialog.alert({content:"标记成功！"});
           }else{
             Dialog.alert({content:json.txt});
           }
         },
         error: (xhr, status, error)=>{
           console.log('xhr=',xhr,' status=',status,' error=',error);
         }
       });
     }
   }
   handleSendDraw(){
     console.log('handleSendDraw');
     if(drawIds==null||drawIds.length<=1){
       Dialog.alert({content:"请选择要发放的列！"});
       return;
     }else{
       $.ajax({
         type: apienv=='local'?'GET':'POST',
         url: apienv=='local'?apimap[apienv]['MarketingMeansDrawUpdateSendType']:apimap[apienv]['MarketingMeansDrawUpdateSendType'],
         data:{"drawIds":drawIds,"operation":1,"activityId":this.state.activityId},
         dataType: 'json',
         async: false,
         success: (json)=>{
           if(json.rlt==0){
             Dialog.alert({content:"操作成功！"});
           }else{
             Dialog.alert({content:json.txt});
           }
         },
         error: (xhr, status, error)=>{
           console.log('xhr=',xhr,' status=',status,' error=',error);
         }
       });
     }
   }
   handleExport(){
     const queryval=this.state.draw_userNickValue;
     const prize_level=$("#prize_level").val();
     const status=$("#status").val();
     console.log('handleExport');
     window.open("MarketingMeansDrawExportExcel.json?search="+queryval+"&type="+this.state.zjType+"&id="+this.state.zjId+"&marketType="+this.state.marketType+"&statue="+status+"&prize_level="+prize_level+"&activityId="+this.state.activityId,"_blank");
   }
   handleClearAllRecord(){
     Dialog.confirm({
       content: '请慎重操作，您确定要清空所有中奖记录，清空后不可恢复?',
       onOk: () => {
         $.ajax({
           type: apienv=='local'?'GET':'POST',
           url: apienv=='local'?apimap[apienv]['MarketingMeansDrawDel']:apimap[apienv]['MarketingMeansDrawDel'],
           data:{"type":"1","activityId":this.state.activityId},
           dataType: 'json',
           async: false,
           success: (json)=>{
             if(json.rlt==0){
               //location.reload();
               this.setState({
                 zhongjiang:{}
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

  rowSelection = {
    onChange: onDrawChange,
    getProps: (record) =>{
      // console.log(record);
      return {
        // disabled: record.buyerNick == f_xuxinxin
      }
    }
  }
  info_close(){
     this.setState({
       mxVisible:false
     })
  }

  render(){
    const noFoot=<div></div>;
    return (
      <div>
        <Breadcrumb style={{padding: 20}}>
            <Breadcrumb.Item link={LinkTool['index']}>抽奖活动</Breadcrumb.Item>
            <Breadcrumb.Item link={LinkTool['redux-setConfig']}>活动设置</Breadcrumb.Item>
            <Breadcrumb.Item link={LinkTool['redux-recordList']}>记录列表</Breadcrumb.Item>
        </Breadcrumb>
        <br></br>
        <Tab defaultActiveKey='1' size='medium'>
          <TabPane tab='全部赠送记录' key='1'>
            <div style={{paddingTop: 5, paddingBottom: 5}}>
              活动类型:
              &nbsp;&nbsp;<Select style={{verticalAlign: 'middle'}} defaultValue="0" dataSource={getSelectData}/>&nbsp;&nbsp;
              时间:
              &nbsp;&nbsp;<RangePicker showTime={{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }} onChange={this.timeChange.bind(this)}/>&nbsp;&nbsp;
               用户昵称:
               &nbsp;&nbsp;<Input type='text' style={{width: 180}} onChange={(v)=>this.setState({all_userNickValue:v})}/>&nbsp;&nbsp;
               &nbsp;&nbsp;<Button type='primary' onClick={this.handleClicked.bind(this)}>搜索</Button>&nbsp;&nbsp;
               &nbsp;&nbsp;<Button type='primary' onClick={this.handleCancel.bind(this)}>清空所有消息</Button>&nbsp;&nbsp;
            </div>
            <br></br>
            <Table dataSource={this.state.zhengsong}>
                <Table.Column title='昵称' width={120} dataIndex='buyerNick'/>
                <Table.Column title='满就送/已送' className="center" cell={this.manSend}/>
                <Table.Column title='买就送/已送' className="center" cell={this.maiSend}/>
                <Table.Column title='评价送/已送' className="center" cell={this.pingjiaSend}/>
                <Table.Column title='收藏送/已送' className="center" cell={this.shoucangSend}/>
                <Table.Column title='签到送/已送' className="center" cell={this.qiandaoSend}/>
                <Table.Column title='分享送/已送' className="center" cell={this.fenxiangSend}/>
                <Table.Column title='进店送/已送' className="center" cell={this.jindianSend}/>
                <Table.Column title='最后修改时间' className="center" width={160} dataIndex='addTime'/>
            </Table>
            <Pagination style={{paddingTop:20, paddingBottom:20, textAlign: 'center'}} current={this.state.current1} total={this.state.total1} onChange={this.paginationChange.bind(this)} />
          </TabPane>
          <TabPane tab='全部中奖记录' key='2'>
            <div style={{ paddingBottom:10}}>
            用户昵称:
            &nbsp;&nbsp;<Input type='text' style={{width: 180}} onChange={(v)=>this.setState({draw_userNickValue:v})}/>&nbsp;&nbsp;
            活动状态:
            &nbsp;&nbsp;<Select style={{verticalAlign: 'middle'}} defaultValue="" onChange={(v)=>this.setState({draw_status:v})} dataSource={getStateData}/>&nbsp;&nbsp;
            奖项:
            &nbsp;&nbsp;<Select style={{verticalAlign: 'middle'}} defaultValue="" onChange={(v)=>this.setState({draw_prize_level:v})} dataSource={getPrizeData}/>&nbsp;&nbsp;
              &nbsp;&nbsp;<Button type='primary' onClick={this.handleDrawSearch.bind(this)}>搜索</Button>&nbsp;&nbsp;
              &nbsp;&nbsp;<Button type='primary' onClick={this.handleMarkSended.bind(this)}>标记为已发奖</Button>&nbsp;&nbsp;
              &nbsp;&nbsp;<Button type='primary' onClick={this.handleSendDraw.bind(this)}>选中发放</Button>&nbsp;&nbsp;
              &nbsp;&nbsp;<Button type='primary' onClick={this.handleExport.bind(this)}>导出</Button>&nbsp;&nbsp;
              &nbsp;&nbsp;<Button type='primary' onClick={this.handleClearAllRecord.bind(this)}>清空所有中奖记录</Button>&nbsp;&nbsp;
            </div>
            <br/>
            <Table rowSelection={this.rowSelection} dataSource={this.state.zhongjiang}>
                <Table.Column title='昵称' width={120} cell={this.buyerNick}/>
                <Table.Column title='状态' cell={this.drawState} />
                <Table.Column title='赠送方式' cell={this.sendType}/>
                <Table.Column title='奖项' cell={this.prizeLv} dataIndex='prizeLv'/>
                <Table.Column title='奖品' dataIndex='prizeName'/>
                <Table.Column title='摇奖数量' cell={this.drawNum}/>
                <Table.Column title='摇奖时间' width={120} dataIndex='createTime'/>
                <Table.Column title='操作' cell={this.opration}/>
            </Table>
            <Pagination style={{paddingTop:20, paddingBottom:20, textAlign: 'center'}} current={this.state.current2} total={this.state.total2} onChange={this.paginationChange.bind(this)} />
          </TabPane>
          {/*<TabPane tab='短信发送记录' key='3'>*/}
            {/*<div style={{paddingTop: 5, paddingBottom: 5}}>*/}
              {/*时间:*/}
              {/*&nbsp;&nbsp;<RangePicker format='YYYY-MM-DD' onChange={(val, str) => console.log(val, str)}/>&nbsp;&nbsp;*/}
              {/*用户昵称:*/}
              {/*&nbsp;&nbsp;<Input type='text' style={{width: 180}} onChange={(v)=>this.setState({all_userNickValue:v})}/>&nbsp;&nbsp;*/}
              {/*&nbsp;&nbsp;<Button type='primary' onClick={this.handleClicked.bind(this)}>搜索</Button>&nbsp;&nbsp;*/}
            {/*</div>*/}
            {/*<br></br>*/}
            {/*<Table dataSource={this.state.duanxin}>*/}
              {/*<Table.Column title='昵称' dataIndex='buyerNick'/>*/}
              {/*<Table.Column title='手机号码' dataIndex='mobile' />*/}
              {/*<Table.Column title='发送时间' dataIndex='sendDate'/>*/}
              {/*<Table.Column title='短信内容' width={420} dataIndex='smsContent'/>*/}
            {/*</Table>*/}
            {/*<Pagination style={{paddingTop:20, paddingBottom:20, textAlign: 'center'}} current={this.state.current3} pageSize={20} total={this.state.total3} onChange={this.paginationChange.bind(this)} />*/}
          {/*</TabPane>*/}
        </Tab>
        <Dialog footer={noFoot}
                visible={this.state.mxVisible}
                title="用户信息"
                wid
                onClose={this.info_close.bind(this)} >
          <table className="mxTable">
            <tbody>
             <tr>
               <td width={150} className="right">用户昵称：</td>
               <td>{this.state.mxInfo.userNick}</td>
             </tr>
            <tr>
              <td width={150} className="right">手机号码：</td>
              <td>{this.state.mxInfo.mobile}</td>
            </tr>
            <tr>
              <td width={150} className="right">用户信息及地址：</td>
              <td>{this.state.mxInfo.address}</td>
             </tr>
            </tbody>
          </table>
        </Dialog>
      </div>
      );
  }
}
export {RecordList as default};

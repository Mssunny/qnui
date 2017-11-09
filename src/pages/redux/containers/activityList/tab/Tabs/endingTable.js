'use strict';

import React from 'react';
import Table from 'qnui/lib/table';
import Button from 'qnui/lib/button';
import Dialog from 'qnui/lib/dialog';
import apimap from 'utils/apimap';
import Pagination from 'qnui/lib/pagination';
import LinkTool from 'utils/linkTools';
import { Row, Col } from 'qnui/lib/grid';
import $ from 'jquery';
// import 'whatwg-fetch';
// import 'es6-promise';
import './runningTable.scss';

const apienv = window.apienv || 'local';
class EndingTable extends React.Component{
    constructor(props){
      super(props);
        this.state = {
          activityStopState: false,
          activityDeleteState: false,
          sendDrawState: false,
          url:'',
          result:[],
          data:[],
          currentPage:1,
          totalRecord:1,
        };
    }
    componentWillMount(){
      console.log('apienv:',apienv,'this.state.currentPage:',this.state.currentPage);
      $.get(apienv=='local'?'/data/EndingTable.json'.replace('.json',this.state.currentPage+'.json'):apimap[apienv]['MarketingMeansliebt'],function(result) {
        let resultData=(apienv=='local'?result:JSON.parse(result));
        console.log('endingTable-resultData->',resultData);
        this.setState({
          result:resultData,
          data:resultData.data,
          currentPage:resultData.curPage,
          totalRecord:resultData.totalRecord,
          activityId:resultData.activityId
        });
      }.bind(this));

    }
    rowSelection = {
      onChange: function(selectedKeys){
        console.log('rowSelection'+selectedKeys);
      }
    }
    EndingChange = (value) => {
        /*伪数据*/
        console.log(apimap[apienv]['MarketingMeansliebt']+'?page='+value);
        $.get(apienv=='local'?apimap[apienv]['MarketingMeansliebt'].replace('.json',value+'.json'):(apimap[apienv]['MarketingMeansliebt']+'?page='+value),function(result) {
          let resultData=apienv=='local'?result:JSON.parse(result);
          // let resultData=apienv=='local'?result:result;
          console.log('endingTable-resultData->',resultData);
            this.setState({
              result:resultData,
              data:resultData.data,
              currentPage:value,
              totalPage:resultData.totalPage,
              totalRecord:resultData.totalRecord
            });
            console.log('state->',this.state);
          console.log('翻页器当前页码:',this.state.currentPage,'翻页器总记录:',this.state.totalRecord,'翻页器总页码:',this.state.totalPage);
        }.bind(this));
        //get方法，只填写url参数
        // console.log(apienv=='local'?apimap[apienv][apiname].replace('.json',value+'.json'):(apimap[apienv][apiname]+'?page='+value);
        // fetch(apienv=='local'?apimap[apienv][apiname].replace('.json',value+'.json'):(apimap[apienv][apiname]+'?page='+value)
        //   //上面一行会返回响应对象，即response
        //   .then((response)=>response.json())
        //   //response.json()将返回一个json类型对象
        //   .then((json)=>{
        //     this.setState({result:json});
        //     console.log(this.state);
        //   //注意我们在Promise调用链的最后调用了done() —— 这样可以抛出异常而不是简单忽略。
        // }.bind(this));
      };
    fetchResults = () =>{
      return function(){
        console.log('fetch:');
      }
    }
    optionRender = (index, value, record) => {
      return (<div>
        <Button className="marginR-4" type='primary' shape='text'><div className='orange' onClick={this.onSetDrawConfigClick(record)}>设置抽奖条件</div></Button>
        <Button type='primary' shape='text' onClick={this.onSetActivityPrizeClick(record).bind(this)}><div className='orange'>设置活动奖品</div></Button>
        </div>)
    }
    setRender = (index, value, record) => {
      return <div>
        <div>
            <Button className="set-box" style={{textAlign:'center'}} type='primary' shape='text' onClick={this.onSetDrawResetClick(record)}>重启活动</Button>
            <Button style={{textAlign:'center'}} type='primary' shape='text' onClick={this.onSetDrawConfigClick(record)}>查看活动设置</Button>
        </div>
        <div>
            <Button className="set-box" style={{textAlign:'center'}} type='primary' shape='text' onClick={this.deleteMarket.bind(this,record)}>删除</Button>
            <Button style={{textAlign:'center'}} type='primary' shape='text' onClick={this.onRecordListClick(record)}>记录列表</Button>
        </div>
      </div>
      // <div>
      //   <Button type='primary' shape='text'>重启活动</Button>
      //   <Button type='primary' shape='text'>查看活动设置</Button>
      //   <Button type='primary' shape='text'>删除</Button>
      //   <Button type='primary' shape='text'>记录列表</Button>
      // </div>
    }
    statusRender = (index,value,record) => {
      switch(record.status){
        case 0:{
          return(<div><b style={{fontSize:'18px',color:'red'}}>未开始...</b><br/><Button shape='text' type='normal'>修改抽奖规则</Button></div>);
        }
        case -1:{
          return(<div><b style={{fontSize:'18px',color:'red'}}>已删除...</b><br/><Button shape='text' type='normal'>收藏送</Button><Button shape='text' type='normal'>关注送</Button></div>);
        }
        case 3:{
          return(<div><b style={{fontSize:'18px',color:'red'}}>进行中...</b><br/><Button shape='text' type='normal'>修改抽奖规则</Button></div>);
        }
        case 4:{
          return(<div><b style={{fontSize:'18px',color:'red'}}>暂停中...</b><br/><Button shape='text' type='normal'>修改抽奖规则</Button></div>);
        }
        case 9:{
          return(<div><b style={{fontSize:'18px',color:'red'}}>已结束...</b><br/><Button style={{marginRight:'5px',color:'lightgreen'}} shape='text' size='small' type='normal'>收藏送</Button><Button style={{color:'lightgreen'}} shape='text' size='small' type='normal'>关注送</Button></div>);
        }
        default:{
          break;
        }
      }
    }
    activityTimeRender = (value,index,record) =>{
      return <div>
          <span>开始时间&nbsp;{record.startTime}</span><br/><br/>
          <span>结束时间&nbsp;{record.endTime}</span>
      </div>
    }
    onRowClick = (record, index, e) => {
      //console.log(record, index, e);
    }
    // 跳转链接
  onSetDrawResetClick = (record) => {
    // console.log('onSetDrawConfigClick', record);
    return function () {
      self.location.href = LinkTool['redux-setConfig'] + '?status=u&type=' + record.marketingType + '&ifover=yover&activityId=' + record.activityId + '&reset=1&cjorxg=xg';
    }
  }
  // 查看活动设置
  onSetDrawConfigClick = (record) => {
    // console.log('onSetDrawConfigClick', record);
    return function () {
      self.location.href = LinkTool['redux-setConfig'] + '?status=u&type=' + record.marketingType + '&ifover=yover&activityId=' + record.activityId + '&cjorxg=xg';
    }
  }
  onSetActivityPrizeClick = (record) => {
    return function () {
      console.log('onSetActivityPrizeClick', record);
      self.location.href = LinkTool['redux-setPrize'] + '?type=' + this.state.result.type + '&id=' + this.state.result.id + '&startTime=' + record.startTime + '&endTime=' + record.endTime + '&ifover=yover&activityId=' + record.activityId;
    }
  }
//点击记录列表
  onRecordListClick = (record) => {
    // console.log(`${LinkTool['router-recordList']}`+record.activityId)
    return function () {
      // self.location.href = `${LinkTool['router-recordList']}` + '?activityId=' + record.activityId;
      self.location.href = LinkTool['redux-recordList'] + '?activityId=' + record.activityId;
    }
  }
  // 删除活动
  deleteMarket=(record)=>{
      console.log("index,rec========="+record,record.mId);
    Dialog.confirm({
      content: '确定要删除此活动?',
      onOk: () => {
        $.ajax({
          type: apienv=='local'?'GET':'POST',
          url: apienv=='local'?apimap[apienv]['MarketingMeansRunControlgenx']:apimap[apienv]['MarketingMeansRunControlgenx'],
          data: apienv=='local'?'':{"id":record.mId},
          dataType: 'json',
          async: false,
          success: (json)=>{
            if(json.rlt==0){
              this.reloadTask();
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
  // 页面重加载
  reloadTask(){
    location.reload(true);
  }
    onActivityStop=()=>{
      this.setState({
        activityStopState:true,
      });
      console.log('ActivityStop:' + this.state.activityStopState);
    }
    onSendDraw=()=>{
      this.setState({
        sendDrawState:true,
      });
      console.log('sendDraw:' + this.state.sendDrawState);
    }
    onActivityDelete=()=>{
      this.setState({
        activityDeleteState:true,
      });
      console.log('ActivityDelete:' + this.state.activityDeleteState);
    }
    closeActivityStop=()=>{
         this.setState({
        activityStopState:false,
      });
      console.log('ActivityStop:' + this.state.activityStopState);
    }
    closeSendDraw=()=>{
        this.setState({
        sendDrawState:false,
      });
      console.log('sendDraw:' + this.state.sendDrawState);
    }
    closeActivityDelete=()=>{
         this.setState({
        activityDeleteState:false,
      });
      console.log('ActivityStop:' + this.state.activityStopState);
    }
    render(){
      return (<div>
        <Table dataSource={this.state.data} hasBorder={false} onRowClick={this.onRowClick}>
              <Table.Column title='活动名称' width={150} dataIndex='mName'/>
              <Table.Column title='活动时间' width={150} cell={this.activityTimeRender}/>
              <Table.Column title='状态' width={100} cell={this.statusRender}/>
              <Table.Column title='设置' cell={this.setRender} width={120} dataIndex='setButton'/>
              {/*<Table.Column title='操作' cell={this.optionRender} width={100} dataIndex='optionButton'/>*/}
        </Table>
        <Dialog visible = {this.state.activityStopState}
          onOk = {this.closeActivityStop}
          onCancel = {this.closeActivityStop}
          onClose = {this.closeActivityStop} style={{width:800}} title = '活动暂停'>
          <span style={{paddingLeft:200}}>是否要将此活动暂停!</span>
        </Dialog>
        <Dialog visible = {this.state.activityDeleteState}
          onOk = {this.closeActivityDelete}
          onCancel = {this.closeActivityDelete}
          onClose = {this.closeActivityDelete} style={{width:800}} title = '活动删除'>
          <span style={{paddingLeft:200}}>删除活动之前请一定要注意保存哦!</span>
        </Dialog>
        <Dialog visible = {this.state.sendDrawState}
          onOk = {this.closeSendDraw}
          onCancel = {this.closeSendDraw}
          onClose = {this.closeSendDraw} style={{width:800}} title = '赠送抽奖名单'>
          <span style={{paddingLeft:10}}>手动赠送记录列表</span><Button type='primary' style={{zIndex:999, float:'right'}}>手动赠送</Button>
          <br></br>
          <br></br>

          <Table>
              <Table.Column title='序号' dataIndex='id'/>
              <Table.Column title='用户昵称' dataIndex='userNick'/>
              <Table.Column title='赠送次数' dataIndex='sendTime'/>
              <Table.Column title='活动类别' dataIndex='activityKind'/>
          </Table>

        </Dialog>
        <Pagination style={{textAlign:'center',paddingTop:20, paddingBottom:20}} pageSize={5} hideOnlyOnePage={true} current={this.state.currentPage} total={this.state.totalRecord} onChange={this.EndingChange} />
    </div>);
  }
}

export default (EndingTable);

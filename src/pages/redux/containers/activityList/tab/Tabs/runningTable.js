'use strict';

import React from 'react';
import Form from 'qnui/lib/form';
import Table from 'qnui/lib/table';
import Button from 'qnui/lib/button';
import Input from 'qnui/lib/input';
import Dialog from 'qnui/lib/dialog';
import Pagination from 'qnui/lib/pagination';
import apimap from 'utils/apimap';
import LinkTool from 'utils/linkTools';
import { Row, Col } from 'qnui/lib/grid';
import $ from 'jquery';
import Select from 'qnui/lib/select';
import Field from 'qnui/lib/field';
import './runningTable.scss';
const FormItem = Form.Item;
const apienv = window.apienv || 'local';
let marketId='';
let activityId ='';
class RunningTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityId: '',
      marketId: '',
      deleteMarket_show_div_visible: false,
      activityStopState: false,
      activityDeleteState: false,
      sendDrawState: false,
      result: [],
      data: [],
      currentPage: 1,
      totalRecord: 1,
      sendResultData:[],
      handSend:false,
      querenDisplay:'block',
      divEbookList188Display:'none',
      overlayDiv:'none'
    };
    this.field = new Field(this);
  }
  componentWillMount() {
    $.get(apimap[apienv]['MarketingMeanslieb2'], function (result) {
      var resultData = (apienv == 'local' ? result : JSON.parse(result));
      console.log('runningTable.resultData->', resultData);
      this.setState({
        data: resultData.data,
        result: resultData,
        currentPage: resultData.curPage,
        totalRecord: resultData.totalRecord,
        activityId: resultData.activityId
      });
    }.bind(this));
  }
  activityNameRender=(value,index,record)=>{
    return (<div>
        <span className='F0F0F0'>{record.mName}</span>
      </div>)
    }
  activityTimeRender = (value, index, record) => {
    return (<div>
      <span className='F0F0F0'>开始时间&nbsp;{record.startTime}</span><br /><br />
      <span className='F0F0F0'>结束时间&nbsp;{record.endTime}</span>
    </div>)
  }
  statusRender = (index, value, record) => {
    switch (record.status) {
      case 0: {
        return (<div><span>未开始...</span><br></br><Button shape='text' type='normal' onClick={this.modifyDrawRules(record)}>修改抽奖规则</Button></div>);
      }
      case -1: {
        return (<div><span>已删除...</span><br></br></div>);
      }
      case 3: {
        return (<div><span>进行中...</span><br></br><Button shape='text' type='normal' onClick={this.modifyDrawRules(record)}><span className='red'>修改抽奖规则</span></Button></div>);
      }
      case 4: {
        return (<div><span>暂停中...</span><br></br></div>);
      }
      case 9: {
        return (<div><span>已结束...</span><br></br></div>);
      }
      default: {
        break;
      }
    }
  }
  optionRender = (index, value, record) => {
    console.log("record.status============"+record.status);
    switch (record.status) {
      case 0: {
        return (
          <div style={{textAlign:'center'}}>
            <Row>
              <Col span='12'>
                <Button type='primary' shape='text' onClick={this.onSetDrawConfigClick(record)}>修改</Button>
              </Col>
              <Col span='12'>
                <Button type='primary' shape='text' onClick={this.deleteMarket_show_div.bind(this,record)}>删除</Button>
                <br/>
                <Button type='primary' shape='text' onClick={this.onRecordListClick(record)}>记录列表</Button>
              </Col>
            </Row>
          </div>
        )
      }
      case -1: {
        return (
          <div style={{textAlign:'center'}}>
            <Row>
              <Col span='12'>
                <Button type='primary' shape='text' onClick={this.onSetDrawConfigClick(record)}>修改</Button>
                <br/>
                <Button type='primary' shape='text' component='a' href={'www.baidu.com?type=zanting'}>暂停</Button>
              </Col>
              <Col span='12'>
                <Button type='primary' shape='text' onClick={this.deleteMarket_show_div.bind(this,record)}>删除</Button>
                <br/>
                <Button type='primary' shape='text' onClick={this.onRecordList(record)}>记录列表</Button>
              </Col>
            </Row>
          </div>
        )
      }
      case 3: {
        return (
          <div style={{textAlign:'center'}}>
            <Row>
              <Col span='12'>
                <Button type='primary' shape='text'  onClick={this.onSetDrawConfigClick(record)}>修改</Button>
                <br/>
                <Button type='primary' shape='text' onClick={this.stopmarketdoControl.bind(this,'stop',record.mId,record.activityId)}>暂停</Button>
              </Col>
              <Col span='12'>
                <Button type='primary' shape='text' onClick={this.deleteMarket_show_div.bind(this,record)}>删除</Button>
                <br/>
                <Button type='primary' shape='text' onClick={this.onRecordListClick(record)}>记录列表</Button>
              </Col>
            </Row>
          </div>
        )
      }
      case 4: {
        return (
          <div style={{textAlign:'center'}}>
            <Row>
              <Col span='12'>
                <Button type='primary' shape='text' onClick={this.onSetDrawConfigClick(record)}>修改</Button>
                <br/>
                <Button type='primary' shape='text' onClick={this.stopmarketdoControl.bind(this,'start',record.MId,record.activityId)}>启动</Button>
              </Col>
              <Col span='12'>
                <Button type='primary' shape='text' onClick={this.deleteMarket_show_div.bind(this,record)}>删除</Button>
                <br/>
                <Button type='primary' shape='text' onClick={this.onRecordListClick(record)}>记录列表</Button>
              </Col>
            </Row>
          </div>
        )
      }
      case 9: {
        return (
          <div style={{textAlign:'center'}}>
            <Row>
              <Col span='12'>
                <Button type='primary' shape='text' onClick={this.onSetDrawConfigClick(record)}>修改</Button>
              </Col>
              <Col span='12'>
                <Button type='primary' shape='text' onClick={this.deleteMarket_show_div.bind(this,record)}>删除</Button>
                <br/>
                <Button type='primary' shape='text' onClick={this.onRecordListClick(record)}>记录列表</Button>
              </Col>
            </Row>
          </div>
        )
      }
      default: {
        break;
      }
    }
  }

  // msgmove();
  //   $(".messagewrap ul").hover(function(){
  //     $(this).attr("name","hovered"); //鼠标经过设置ul的name值为"hovered"
  //   },
  //   function(){
  //     $(this).removeAttr("name");
  //   });
  // });
  // msgmove(){
  //   var isIE=!!window.ActiveXObject;
  //   var isIE6=isIE&&!window.XMLHttpRequest;
  //   if($("ul").attr("name") != "hovered"){
  // //判断ul的name属性是否为"hovered"，决定下面代码块是否运行，以实现鼠标经过暂停滚动。
  // var height = $(".messagewrap li:last").height();
  // $(".messagewrap li:last").css({"opacity":0,"height":0});
  // //列表最后的li透明和高度设置为0 }
  // $(".messagewrap li:first").before($(".messagewrap li:last"));
  // //把列表最后的li提升到顶部，实现有限列表项无限循环滚动显示
  // $(".messagewrap li:first").animate({"height":height},100);
  // //列表顶部的li高度逐渐变高以把下面的li推下去 if(!isIE6){
  // $(".messagewrap li:first").animate({"opacity":"1"},100);
  // //在非IE6浏览器中设置透明淡入效果

  // }
  // setTimeout("msgmove()",4000);
  // //设置5秒滚动一次

  // 暂停活动
  stopmarketdoControl(f,ids,activityId){
    console.log(ids,activityId);
    var run=false;
    if(f=='start')
      run=true;
    Dialog.confirm({
      content: "确定"+(run?"开始":"暂停")+"此活动?",
      onOk: () => {
        $.ajax({
          type: apienv=='local'?'GET':'POST',
          url: apienv=='local'?apimap[apienv]['MarketingMeansRunControlgenx']:apimap[apienv]['MarketingMeansRunControlgenx'],
          data: apienv=='local'?'':{"run":run,"id":ids,"activityId":activityId},
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

  setRender = (index, value, record) => {
    return <div style={{textAlign:'center'}}>
      <Row>
        <Col span='14'>
          <Button style={{textAlign:'left'}} type='primary' shape='text' onClick={this.onSetDrawConfigClick(record)}><div className='orange'>设置抽奖条件</div></Button>
          <br/>
          <Button style={{textAlign:'left'}} type='primary' shape='text' onClick={this.onSetActivityPrizeClick(record).bind(this)}><div className='orange'>设置活动奖品</div></Button>
        </Col>
        <Col span='10'>
          <Button style={{textAlign:'left'}} type='primary' shape='text' onClick={this.onUserSendClick.bind(this,record)}><div className='orange'>手动赠送</div></Button>
          <br/>
          <Button style={{textAlign:'left'}} type='primary' shape='text' onClick={this.onUseLink(record).bind(this)}><div className='orange'>安装链接</div></Button>
        </Col>
      </Row>
    </div>
  }
  onSetDrawConfigClick = (record) => {
    // console.log('onSetDrawConfigClick', record);
    return function () {
      self.location.href = LinkTool['redux-setConfig'] + '?status=u&type=' + record.marketingType + '&ifover=nover&activityId=' + record.activityId + '&cjorxg=xg';
    }
  }
  onSetActivityPrizeClick = (record) => {
    return function () {
      console.log('onSetActivityPrizeClick', record);
      self.location.href = LinkTool['redux-setPrize'] + '?type=' + this.state.result.type + '&id=' + this.state.result.id + '&startTime=' + record.startTime + '&endTime=' + record.endTime + '&ifover=nover&activityId=' + record.activityId;
    }
  }
  //点击记录列表
  onRecordListClick = (record) => {
    // console.log(`${LinkTool['router-recordList']}`+record.activityId)
    return function () {
      console.log(`${LinkTool['router-recordList']}`+record.activityId)
      // self.location.href = `${LinkTool['router-recordList']}` + '?activityId=' + record.activityId;
      self.location.href = LinkTool['redux-recordList'] + '?activityId=' + record.activityId;
    }
  }
  //点击手动赠送
  onUserSendClick = (record) =>{
    this.setState({
      sendDrawState: true
    });
    $.post(apimap[apienv]['MarketingManualSendgenx'],{'mname':record.mName, 'activityId':record.activityId},function(resultData){
      console.log(resultData);
      this.setState({
        sendResultData : resultData
      })
      // console.log('onUserSendClick_Callback:',resultData);
    }.bind(this),'json');
  }
  onUseLink = (record) => {
    // console.log('onUseLink', record);
    return function () {
      console.log('onUseLink进来了', record);
      self.location.href = LinkTool['redux-useLink'] + '?id=&type=&startTime=&endTime=';
      //  MarketingMobileLotterygenx.h4?id=&type=&startTime=&endTime=
    }
  }
  modifyDrawRules = (record) => {
    // console.log('modifyDrawRules', record);
    return function () {
      // console.log('running点击修改规则传过来的activityId:',record.activityId);
      self.location.href = LinkTool['redux-modifyRules'] + '?activityId=' + record.activityId;
    }
  }
  addTask = (type) => {
    return function () {
      $.post('MarketingMeansSet.json', { status: 'n', type: type }, function (json) {
        if (json.rlt == 0) {
          location.href = LinkTool['redux-activityList'] + '?status=n&type=' + type;
        } else {
          Dialog.alert({content:json.txt});
        }
      }, 'json');
    }
  }
  // 删除
  deleteMarket_show_div = (record) => {
    marketId=record.mId;
    activityId = record.activityId;
    console.log("删除;"+marketId,activityId);
    this.setState({
      deleteMarket_show_div_visible: true
    });
  }
  deleteMarket(){
    $.ajax({
      type: apienv=='local'?'GET':'POST',
      url: apienv=='local'?apimap[apienv]['MarketingMeansRunControlgenx']:apimap[apienv]['MarketingMeansRunControlgenx'],
      data: apienv=='local'?'':{"id":marketId, "activityId":activityId},
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

  optionFunc = () => {
    // console.log('optionClicked');
  }
  handSendValueChange = (value) => {
    return function(){
     console.log('handSendValueChange:',value);
    }
  }
  //表行点击事件
  onRowClick = (record, index, e) => {
    // console.log('onRowClick');
  }
  onActivityStop = () => {
    this.setState({
      activityStopState: true
    });
    // console.log('ActivityStop:' + this.state.activityStopState);
  }
  onSendDraw = () => {
    this.setState({
      sendDrawState: true
    });
    // console.log('sendDraw:' + this.state.sendDrawState);
  }
  onActivityDelete = () => {
    this.setState({
      activityDeleteState: true
    });
    // console.log('ActivityDelete:' + this.state.activityDeleteState);
  }
  closeActivityStop = () => {
    this.setState({
      activityStopState: false
    });
    // console.log('ActivityStop:' + this.state.activityStopState);
  }
  closeSendDraw = () => {
    this.setState({
      sendDrawState: false
    });
    // console.log('sendDraw:' + this.state.sendDrawState);
  }
  submitHandSend = () => {
    const _this=this;
    let activityId = this.state.sendResultData.activityId;
    let optLimit = this.refs.optLimit.props.value;
    if(typeof(optLimit)=='undefined'){
      Dialog.alert({content:'请选择活动类型!'});
      return;
    }
    let manualType = optLimit.substr(0, 1);
    let marketId = optLimit.substr(2, 35);
    let mname;
    if (manualType == 1) {
      mname = '刺激引流送';
    }
    if (manualType == 2) {
      mname = '好评送';
    }
    if (manualType == 3) {
      mname = '满就送';
    }
    if (manualType == 4) {
      mname = '买就送';
    }
    let draw_num = this.refs.draw_num.props.value;
    let buyer_nick = this.refs.buyer_nick.props.value;
    if (buyer_nick == null || buyer_nick == '') {
      Dialog.alert({content:'用户昵称必须输入！'});
      return;
    } if (draw_num == null || draw_num == '') {
      Dialog.alert({content:'赠送次数不能为空！'});
      return;
    }
    if (!(buyer_nick.indexOf(' ') == -1)) {
      Dialog.alert({content:'用户昵称不能有空格！'});
      return;
    }
    this.setState({
      querenDisplay:'block',
      divEbookList188Display:'block'
    })
    var params = {
      'draw_num': draw_num,
      'buyer_nick': buyer_nick,
      'manualType': manualType,
      'market_id': marketId,
      'activityId': activityId
    };
    $.ajax({
      type: 'POST',
      url: apimap[apienv]['MarketingManualSendSavegenx'],
      data: params,
      dataType: 'json',
      async: false,
      success: function (result, statusText, xhr) {
        console.log('success--------------result',result,'statusText:',statusText,'  xhr:',xhr);
        if (result.rlt == 0) {
          Dialog.alert({content:'添加成功！'});
          // this.giftBtnCgenx(this.state.result.mname,this.state.result.activityId);
          // this.setState({
          //   handSend: false
          // });
          // this.onUserSendClick(this.state.data);
          setTimeout(()=>{
            location.reload(true);
          },1000);
        } else {
          Dialog.alert({content:result.txt});
          this.setState({
            querenDisplay : 'block',
            divEbookList188Display :'none'
          })
        }
      }.bind(this),
      error:function (result, statusText, xhr) {

        console.log('error--------------result',result,'statusText:',statusText,'  xhr:',xhr);
        Dialog.alert({content:'数据量太多  请稍后刷新页面!请勿再次导入相同数据!'});
        this.setState({
          divEbookList188Display : 'none',
          overlayDiv : 'none'
        })
      }.bind(this)
    });
  }

  giftBtnCgenx=(mname,activitiId)=>{
    console.log('giftBtnCgenx->mname:',mname,'  activitiId:',activitiId);
 		$.post(apimap[apienv]["MarketingManualSendgenx"],{"mname":mname,"activityId":activitiId},function(data){
 			console.log(data);
 		},'json');

 	}
  closeHandSend = () => {
    this.setState({
      handSend: false
    });
  }
  openHandSend = () => {
    this.setState({
      handSend: true
    });
  }
  closeActivityDelete = () => {
    this.setState({
      activityDeleteState: false
    });
    // console.log('ActivityStop:' + this.state.activityStopState);
  }

  renderSendTime=(index, value, item)=>{
    if(this.state.sendResultData.idd!=''){
      if(item.intoCount + item.shareCount + item.collectionCount + item.signCount + item.cartCount + item.shougoodsCount != 0){
        return <span>{item.intoCount + item.shareCount + item.collectionCount + item.signCount + item.cartCount + item.shougoodsCount}</span>;
      }
    }
    if(this.state.sendResultData.idp!=''){
      if(item.rateCount!=0){
        return <span>{item.rateCount}</span>;
      }
    }
    if(this.state.sendResultData.idf!=''){
      if(item.fullCount!=0){
        return <span>{item.fullCount}</span>;
      }
    }
    if(this.state.sendResultData.idb!=''){
      if(item.buyerCount!=0){
        return <span>{item.buyerCount}</span>;
      }
    }
  }
  renderSendActivity=(index, value, item)=>{
    if(this.state.sendResultData.idd!=''){
      if(item.intoCount + item.shareCount + item.collectionCount + item.signCount + item.cartCount + item.shougoodsCount != 0){
        return <span>刺激引流送</span>;
      }
    }
    if(this.state.sendResultData.idp!=''){
      if(item.rateCount!=0){
        return <span>好评送</span>;
      }
    }
    if(this.state.sendResultData.idf!=''){
      if(item.fullCount!=0){
        return <span>满就送</span>;
      }
    }
    if(this.state.sendResultData.idb!=''){
      if(item.buyerCount!=0){
        return <span>买就送</span>;
      }
    }
  }
  deleteMarket_show_div_close = () => {
    // console.log('close');
    this.setState({
      deleteMarket_show_div_visible: false
    });
  }
  pageChange=(value)=>{
      this.setState({
        currentPage:value
     })
  }
  render() {
    const init = this.field.init;
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 }
    };
    var item1 = '1_'+this.state.sendResultData.idd;
    var item2 = '2_'+this.state.sendResultData.idp;
    var item3 = '3_'+this.state.sendResultData.idf;
    var item4 = '4_'+this.state.sendResultData.idb;
    const handSendFooter = <div style={{textAlign:'center',position:'relative',display:this.state.querenDisplay}}><Button size='medium' onClick={this.submitHandSend} type='primary'>确定</Button></div>;
    const titleOption = function(){
      return(<div style={{textAlign:'center'}}>操作</div>)
    }
    const titleSet = function(){
      return(<div style={{textAlign:'center'}}>设置</div>)
    }
    const deleteMarket_show_div_footer = <div style={{ width: '100%', textAlign: 'center' }}><Button onClick={this.deleteMarket.bind(this)}>确定</Button></div>;
    return (<div>
      <Table dataSource={this.state.data} hasBorder={false} onRowClick={this.onRowClick}>
        <Table.Column title='活动名称' cell={this.activityNameRender} width={110}/>
        <Table.Column title='活动时间' cell={this.activityTimeRender} width={140} />
        <Table.Column title='状态' cell={this.statusRender} width={100}/>
        <Table.Column title={titleSet} cell={this.setRender} width={150}/>
        <Table.Column title={titleOption} cell={this.optionRender} width={120}/>
      </Table>
      <Dialog visible={this.state.activityStopState}
        onOk={this.closeActivityStop}
        onCancel={this.closeActivityStop}
        onClose={this.closeActivityStop} style={{ width: 800 }} title='活动暂停'>
        <span style={{ paddingLeft: 200 }}>是否要将此活动暂停!</span>
      </Dialog>
      <Dialog visible={this.state.activityDeleteState}
        onOk={this.closeActivityDelete}
        onCancel={this.closeActivityDelete}
        onClose={this.closeActivityDelete} style={{ width: 800 }} title='活动删除'>
        <span style={{ paddingLeft: 200 }}>删除活动之前请一定要注意保存哦!</span>
      </Dialog>
      <Dialog visible={this.state.sendDrawState}
        onOk={this.closeSendDraw}
        onCancel={this.closeSendDraw}
        onClose={this.closeSendDraw} style={{ width: 800 }} title='赠送抽奖名单'>
        <span style={{ paddingLeft: 10 }}>手动赠送记录列表</span><Button type='primary' style={{ zIndex: 999, float: 'right' }} onClick={this.openHandSend}>手动赠送</Button>
        <br></br>
        <br></br>
        <Table dataSource={this.state.sendResultData.data}>
          <Table.Column title='序号' dataIndex='id'/>
          <Table.Column title='用户昵称' dataIndex='buyerNick'/>
          <Table.Column title='赠送次数' cell={this.renderSendTime} />
          <Table.Column title='活动类别' cell={this.renderSendActivity}/>
        </Table>
        <Dialog visible={this.state.handSend}
        footer={handSendFooter}
        footerAlign={'right'}
        onCancel={this.closeHandSend}
        onClose={this.closeHandSend} style={{ width: 800 }} title='添加抽奖名单'>
          <Form field={this.field}>
              <FormItem label='活动类型 :' {...formItemLayout}>
                  <Select size='small' style={{ verticalAlign: 'middle', width: '180px',lineHeight:'22px',height:'22px'}} ref='optLimit' {...init('optLimit', {
                      props: {
                          onChange: (v) => {
                              this.handSendValueChange(v).bind(this);
                          }
                      }
                  }) }>
                    {(this.state.sendResultData.idf==null||this.state.sendResultData.idf=='')?'':<Option key={3} value={item3}>满就送</Option>}
										{(this.state.sendResultData.idb==null||this.state.sendResultData.idb=='')?'':<Option key={4} value={item4}>买就送</Option>}
										{(this.state.sendResultData.idp==null||this.state.sendResultData.idp=='')?'':<Option key={2} value={item2}>好评送</Option>}
										{(this.state.sendResultData.idd==null||this.state.sendResultData.idd=='')?'':<Option key={1} value={item1}>刺激引流送</Option>}
                  </Select>
              </FormItem>
              <FormItem label='赠送次数 :' {...formItemLayout}>
                  <Input ref='draw_num' {...init('draw_num')} style={{ width: '100px' }} />
              </FormItem>
              <FormItem label='用户昵称 :' {...formItemLayout}>
                  <Input style={{width:'550px',marginTop:'10px'}} multiple rows='7' ref='buyer_nick' {...init('buyer_nick')}/>
                  <br/>
                  <span style={{color:'orange'}}>批量粘贴（买家昵称,多个用','隔开或者每行一个）</span>
              </FormItem>
          </Form>
        </Dialog>
        <Pagination style={{ textAlign: 'center'}} pageSize={5} current={this.state.sendResultData.curPage} total={this.state.sendResultData.totalPage} onChange={this.onSendTableChange} />
      </Dialog>

      <Dialog style={{ width: 500, borderRadius: '10px' }} visible={this.state.deleteMarket_show_div_visible}
        footer={deleteMarket_show_div_footer}
        onClose={this.deleteMarket_show_div_close.bind(this)} >
        <div style={{ textAlign: 'center' }}>确认删除别忘了导出哦!</div>
      </Dialog>
      <Pagination style={{ textAlign: 'center',paddingTop:20, paddingBottom:20}} pageSize={5} current={this.state.currentPage} total={this.state.totalRecord} onChange={this.pageChange} />

    </div>);
  }
}



export default RunningTable;

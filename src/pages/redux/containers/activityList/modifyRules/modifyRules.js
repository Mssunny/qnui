'use strict';
import './modifyRules.scss';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/modifyRules';
import Step, { Item as StepItem } from 'qnui/lib/step';
import Input from 'qnui/lib/input';
import Breadcrumb from 'qnui/lib/breadcrumb'
import Form, {Item as FormItem } from 'qnui/lib/form';
import Button from 'qnui/lib/button';
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';
import { Row, Col } from 'qnui/lib/grid';
import LinkTool from 'utils/linkTools';
import Field from 'qnui/lib/field';
import apimap from 'utils/apimap';
import $ from 'jquery';
const contOne = (<span>设置条件</span>);
const contTwo = (<span>设置奖品</span>);
const contThree = (<span>设置模板</span>);
const contFour = (<span>完成</span>);
const apienv = window.apienv || 'local';
const apiname = 'ModifyRules';

class ModifyRules extends React.Component {
    constructor(props){
        super(props);
          this.state = {
            winnersHead: '',
            noWinners: '',
            value: '',
            rows: 8,
            txtt:'',
            result:''
          };
        this.field = new Field(this);
        //  this.onChange = this.onChange.bind(this);
    }
    componentWillMount(){
        // console.log('componentWillMount',apimap[apienv][apiname]);
        $.get(apimap[apienv][apiname]+'?activityId='+this.props.location.query.activityId,function(result) {
            let resultData=apienv=='local'?result:JSON.parse(result);
            console.log('ModifyRules-resultData->',resultData);
            // if(resultData.txtt==''){
            //     this.usertemp();
            // }
            this.field.setValue('txtt',resultData.txtt.replace('<br />','/n'));
            this.field.setValue('drawNum',resultData.info.drawNum);
            this.field.setValue('drawTimes',resultData.info.drawTimes);
            this.field.setValue('winnersHead',resultData.info.winnersHead);
            this.field.setValue('noWinners',resultData.info.noWinners);
            this.field.setValue('winnersFormat',resultData.info.winnersFormat);
            this.field.setValue('activityId',resultData.activityId);
            this.field.setValue('marketId',resultData.marketId);
            this.setState({
                result:resultData,
                txtt:resultData.txtt,
                drawNum:resultData.info.drawNum,
                drawTimes:resultData.info.drawTimes,
                winnersHead:resultData.info.winnersHead,
                noWinners:resultData.info.noWinners,
                winnersFormat:resultData.info.winnersFormat,
                activityId:resultData.activityId,
                marketId:resultData.id
            });
        }.bind(this));
    }
    onFormatChange(value) {
        console.log('onFormatChange:',value);
        this.setState({
            winnersFormat: value
        });
        //console.log(value);
    }

    handleReset(e) {
        e.preventDefault();
        this.field.reset();
    }
    returnMod(){
        self.location.href=`${LinkTool['redux-pcMod']}`;
    }
    // usertemp(){
    //     console.log('usertemp()');
    //     var temp=document.getElementsByName('prized');
        
    //     //name_prize_name  lever_draw
    //     var content="本店于${resultData.startTime} 至${resultData.endTime} 期间开展抽奖活动！感恩回馈！\r\n具体的抽奖条件请查看\"抽奖条件\"说明。\r\n 奖项设置：\r\n  ";

    //     /* var t=document.getElementsByName('lever_draw');
    //     var name_prize_name=document.getElementsByName('name_prize_name');
    //     for(var i=0;i<t.length;i++){
    //         if(name_prize_name!=null&&name_prize_name[i]!=null)
    //         content=content+"     " +t[i].value+"："+name_prize_name[i].value+"\r\n";
    //     } */
    //     for(var i=0;i<temp.length;i++){
    //         /* alert(temp[i].value);
    //         alert(temp[i].id); */
    //         content=content+"     " +temp[i].value+"："+temp[i].id+"\r\n";
    //     }
    //     $("#hdxzs").html(content+"抽奖条件：10天内评价(从收货开始计算时间)50字以上送抽奖一次\r\n抽奖方式：手机抽奖 电脑抽奖\r\n[奖品发放规则]\r\n 1、手机流量奖品：会发放到淘宝帐户上，请在我的淘宝我的卡券包中查看。\r\n 2、话费奖品：直接充值到淘宝网内登记的手机号码上。");
    //     //easyDialog.close();
    // }
    resizablef(){
        // window.location.href='https://siteadmin.taobao.com/design.htm';
        window.open(LinkTool['design']);
    }
    resizableft(){
        location.href=LinkTool['redux-activityList'];
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.field.validate((errors, values) => {
            if (errors) {
                console.error('modifyRules下form出错!');
                return;
            }
            console.log('modifyRules提交数据:',values);
            let params={
			 	'drawNum':values.drawNum,
		    	'drawTimes':values.drawTimes,
		    	'winnersHead':values.winnersHead,
			   	'noWinners':values.noWinners,
		   	   	'win_format':values.winnersFormat,
		   		'activityId':values.activityId
			};
            let params1={
                'activityId':values.activityId,
                'hdxz':values.txtt,
                'marketId':values.marketId
            }
            
            console.log('params:',params);

            console.log('params1:',params1);
            if(apienv=='local'){
                $.get(apimap[apienv]['SysSetUpSave'],(data)=>{
                    let resultData=apienv=='local'?data:JSON.parse(data);
                    if(resultData.rlt==0){
                        // self.location.href=`${LinkTool['redux-setPrize']}`;
                    }else{
                        alert(resultData.txt);
                    }
                })
                $.get(apimap[apienv]['MarketingMeansSetUpdate'],(data)=>{
                    let resultData=apienv=='local'?data:JSON.parse(data);
                    console.log('$.post(MarketingMeansSetUpdate) data:',data);
                    if(resultData.rlt==0){
                        // self.location.href=`${LinkTool['redux-setPrize']}`;
                    }else{
                        alert(resultData.txt);
                    }
                })
                this.timer = setTimeout(() => {
                    this.resizableft();
                },1000);

            }else{
                $.post(apimap[apienv]['SysSetUpSave'], params,(data)=>{
                    let resultData=apienv=='local'?data:JSON.parse(data);
                    console.log('$.post(SysSetUpSave) data:',data);
                    if(resultData.rlt==0){
                        // self.location.href=`${LinkTool['redux-setPrize']}`;
                    }else{
                        alert(resultData.txt);
                    }
                })
                
                $.post(apimap[apienv]['MarketingMeansSetUpdate'],params1,(data)=>{
                    let resultData=apienv=='local'?data:JSON.parse(data);
                    console.log('$.post(MarketingMeansSetUpdate) data:',data);
                    if(resultData.rlt==0){
                        // self.location.href=`${LinkTool['redux-setPrize']}`;
                    }else{
                        alert(resultData.txt);
                    }
                })
                this.timer = setTimeout(() => {
                    this.resizableft();
                },1000);
            }
            // $.get(apimap[apienv]['SysSetUpSave'],(data)=>{
            //     console.log('111');
            //     console.log('$.post(apimap[apienv][\'SysSetUpSave\'] data:',data);
            // })
            // self.location.href=`${LinkTool['redux-setPrize']}`;
        });
    }

    userExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === 'frank') {
                    callback([new Error('抱歉，该用户名已被占用。')]);
                } else {
                    callback();
                }
            }, 1000);
        }
    }

    checkPass(rule, value, callback) {
        const { validate } = this.field;
        if (value) {
            validate(['rePasswd']);
        }
        callback();
    }

    checkPass2(rule, value, callback) {
        const { getValue } = this.field;
        if (value && value !== getValue('passwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    nextStep(){
        console.log('nextStep');
        window.open('QnRedux.h4#/page1', '_self');
    }
    // getTxtt=()=>{
    //     // console.log(this.state.txtt);
    //     return this.state.txtt;
    // }
    render(){
        const {init, getError, getState } = this.field;
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 16
            }
        };
        const footer = <a></a>
        // console.log('render');
        return (
            <div>
                <Breadcrumb style={{padding:20}}>
                        <Breadcrumb.Item link='javascript:void(0);'>抽奖活动</Breadcrumb.Item>
                        <Breadcrumb.Item link='javascript:void(0);'>活动设置</Breadcrumb.Item>
                        <Breadcrumb.Item link='javascript:void(0);'>设置抽奖前台参数</Breadcrumb.Item>
                    </Breadcrumb>
                <Step style={{padding:20}} current={2} type='arrow'>
                    <StepItem title={contOne} />
                    <StepItem title={contTwo} />
                    <StepItem title={contThree} />
                    <StepItem title={contFour} />
                </Step>
                <Form  field={this.field}>
                    <FormItem {...formItemLayout}
                        label='设置初始化摇奖次数：'>
                        <Input {...init('drawNum')} style={{width:80}}/><span>&nbsp;&nbsp;前台抽奖模板中展示 </span>
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label='设置初始化中奖次数：'>
                        <Input {...init('drawTimes')} style={{width:80}}/><span>&nbsp;&nbsp;前台抽奖模板中展示 </span>
                    </FormItem>
                   <FormItem {...formItemLayout}
                        label='有中奖名单显示：'>
                        <Input {...init('winnersHead')} style={{width:240}}/><span>&nbsp;&nbsp;+中奖名单 </span>
                    </FormItem>

                    <FormItem {...formItemLayout}
                        label='无中奖名单显示：'>
                        <span><Input {...init('noWinners')} style={{width:240}}/></span>
                    </FormItem>

                    <FormItem {...formItemLayout}
                        label='中奖名单显示格式：'>
                        <RadioGroup {...init('winnersFormat',{
                            props:{
                                onChange:(v)=>{
                                    this.onFormatChange(v);
                                }
                            }})}>
                            <Radio id='geshi1' value='1'>格式1：东**侠，马**云，张**玉...</Radio>
                            <br/>
                            <Radio id='geshi2' value='2'>格式2：东**侠 中一等奖，马**云中二等奖，张**玉中二等奖...</Radio>
                            <br/>
                            <Radio id='geshi3' value='3'>格式3：东**侠 （中话费50元），马**云（中话费10元），张**玉（中话费10元）...</Radio>
                            <br/>
                        </RadioGroup>
                    </FormItem>
                    <FormItem {...formItemLayout}
                    label='活动细则：'>
                        <Input multiple {...init('txtt')} style={{width:'100%'}} rows={this.state.rows}/>
                        <div className='mt20'>
                            <Button type='secondary' onClick={this.returnMod} target='_self'>返回选择模板</Button>
                            <Button style={{marginLeft: 20, width:'80px'}} type='primary' onClick={this.handleSubmit.bind(this)}>保存</Button>
                            <Button style={{marginLeft: 20, width:'80px'}} type='primary' component='a' href='http://www.taobao.com' target='_blank'>去装修</Button>
                            <Button style={{marginLeft: 20, width:'80px'}} type='normal'  component='a' href='https://isv081.bbs.taobao.com/detail.html?postId=1818813' target='_blank' shape='text'>装修教程</Button>
                        </div>
                    </FormItem>
                    {/*<FormItem  wrapperCol={{ span: 16, offset: 6 }}>*/}
                    {/*</FormItem>*/}
                    <FormItem {...formItemLayout}>
                        <Input htmlType='hidden' {...init('marketId')}/>
                        <Input htmlType='hidden' {...init('activityId')}/>
                    </FormItem>
                </Form>
                {/*
                <Form field={this.field}>
                    <FormItem
                        label='用户名：'
                        {...formItemLayout}
                        hasFeedback
                        help={getState('name') === 'validating' ? '校验中...' : (getError('name') || []).join(', ')}>
                        <Input maxLength={20} hasLimitHint placeholder='实时校验，输入 frank 看看'
                            {...init('name', {
                                rules: [
                                    {required: true, min: 5, message: '用户名至少为 5 个字符'},
                                    {validator: this.userExists},
                                ],
                            })} />
                    </FormItem>

                    <FormItem
                        label='邮箱：'
                        {...formItemLayout}
                        hasFeedback>
                        <Input type='email' placeholder='onBlur 与 onChange 相结合'
                            {...init('email', {
                                rules: [
                                    {required: true, trigger: 'onBlur'},
                                    {type: 'email', message: <span>请输入正确的邮箱地址</span>, trigger: ['onBlur', 'onChange']}
                                ]
                            })}/>
                    </FormItem>

                    <FormItem
                        label='密码：'
                        {...formItemLayout}
                        hasFeedback>
                        <Input htmlType='password'
                            {...init('passwd', {
                                rules: [
                                    {required: true, whitespace: true, message: '请填写密码'},
                                    {validator: this.checkPass.bind(this)},
                                ],
                            })}
                            />
                    </FormItem>

                    <FormItem
                        label='确认密码：'
                        {...formItemLayout}
                        hasFeedback>
                        <Input htmlType='password' placeholder='两次输入密码保持一致'
                            {...init('rePasswd', {
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '请再次输入密码',
                                }, {
                                    validator: this.checkPass2.bind(this),
                                }],
                            })}/>
                    </FormItem>

                    <FormItem
                        label='性别：' hasFeedback
                        {...formItemLayout}>
                        <RadioGroup
                            {...init('radio', {
                                rules: [
                                    {required: true, message: '请选择您的性别'}
                                ]
                            })}
                            >
                            <Radio value='male'>男</Radio>
                            <Radio value='female'>女</Radio>
                        </RadioGroup>
                    </FormItem>

                    <FormItem
                        label='备注：'
                        {...formItemLayout}>
                        <Input multiple maxLength={20} hasLimitHint placeholder='随便写'
                            {...init('textarea', {
                                rules: [
                                    {required: true, message: '真的不打算写点什么吗？'},
                                ]
                            })}/>
                    </FormItem>

                    <FormItem wrapperCol={{ offset: 6 }}>
                        <Button type='primary' onClick={this.handleSubmit.bind(this)}>确定</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button onClick={this.handleReset.bind(this)}>重置</Button>
                    </FormItem>
                </Form>
            */}
            </div>
        );
    }
}
export default connect((state)=> {
  return {
    home: state.modifyRules
  };
})(ModifyRules);

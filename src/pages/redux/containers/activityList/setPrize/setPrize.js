'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/setPrize';
import Step, { Item as StepItem } from 'qnui/lib/step';
import Table from 'qnui/lib/table';
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';
import Field from 'qnui/lib/field';
import Dialog from 'qnui/lib/dialog';
import Icon from 'qnui/lib/icon';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';
import Breadcrumb from 'qnui/lib/breadcrumb'
import Radio from 'qnui/lib/radio';
import Select from 'qnui/lib/select';
import DatePicker from 'qnui/lib/date-picker';
import NumberPicker from 'qnui/lib/number-picker';
import LinkTool from 'utils/linkTools';
import apimap from 'utils/apimap';
import CreatePrize from './createPrize';
import EditPrize from './EditPrize';
import $ from 'jquery';
import './setPrize.scss';
const apienv = window.apienv || 'local';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let editPrizeData=[];
const contOne = (<span>设置条件</span>);
const contTwo = (<span>设置奖品</span>);
const contThree = (<span>设置模板</span>);
const contFour = (<span>完成</span>);
class RenderSend extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            total:0,
            dataSource:this.props.dataSource,
            // prizePercent:(this.props.propData&&JSON.stringify(this.props.propData)!='{}')?this.props.propData:{},
            isExist:typeof(this.props.isExist)=='undefined'?true:this.props.isExist
        }
    }
    componentWillReceiveProps(nextprops){
        this.setState({
            dataSource:nextprops.dataSource,
        },
            ()=>{
                let total=0;
                this.state.dataSource[this.props.dataSourceName].map((item,index)=>{
                    let percentValue=parseFloat(parseFloat(item.prizePercent).toFixed(3));
                    if(isNaN(percentValue)){
                        percentValue=0;
                    }
                    total+=percentValue
                })
                this.onTotalChange(total);
            }
            // console.log('total:',this.state.total);
        // ()=>{console.log('新数据:',this.state.dataSource)}
        )
    }
    onTotalChange=(value)=>{
        this.setState({
            total: parseFloat(parseFloat(value).toFixed(3))
        })
    }
    componentDidMount(){
        if(this.state.isExist&&this.state.dataSource[this.props.dataSourceName]!=null&&this.state.dataSource[this.props.dataSourceName].length>0){
            let total=0;
            this.state.dataSource[this.props.dataSourceName].map((item,index)=>{
                let percentValue=parseFloat(parseFloat(item.prizePercent).toFixed(3));
                if(isNaN(percentValue)){
                    percentValue=0;
                }
                total+=percentValue
            })
            this.onTotalChange(total);
        }
    }
    onChange=(e)=>{
        let index=e.target.getAttribute('alt')-1;
        let targetValue=e.target.value;
      // console.log("e============"+index,targetValue,name);
      // console.log("e============"+e.target);
       this.props.callBack(this.props.dataSourceName,targetValue,index);
      // console.log("this.props.name=============="+this.props.name);
    }
    render() {
      // console.log("this.props.trId"+JSON.stringify(this.props.trId));
      // console.log("this.props.trName"+JSON.stringify(this.props.trName));
      // console.log("this.props.name"+JSON.stringify(this.props.name));
        if(this.state.isExist&&this.state.dataSource[this.props.dataSourceName]!=null&&this.state.dataSource[this.props.dataSourceName].length>0){
            if(this.props.display){
                return (
                <tr id={this.props.trId} name={this.props.trName} style={{display:this.props.display}}>
                    <td width="100" height='40px'>{this.props.name}</td>
                    {
                        this.state.dataSource[this.props.dataSourceName].map((item,index)=>{
                            console.log("item==========="+item);
                            if(this.props.xiugai==true){
                                return (<td className="f14 border" key={index} id={'rowgl'+item.prizeLevel}>
                                <input ref={this.props.xiugai==true?((this.props.showType==true)?(this.props.inputName0+item.prizeLevel):'prizepercent'):'prizepercent1'}
                                name={this.props.xiugai==true?((this.props.showType==true)?(this.props.inputName0+item.prizeLevel):'prizepercent'):'prizepercent1'} type="text"
                                 value={item.prizePercent} onChange={this.onChange.bind(this)} id={item.id}
                                // alt={item.prizeLevel} style={{width:'50px'}} className="input w50" />&nbsp;%
                                alt={item.prizeLevel} style={{width:'50px'}} className="input w50" />&nbsp;%
                                {
                                    (this.props.xiugai==true&&this.props.inputName)?
                                    <input ref={this.props.inputName+item.drawType} name={this.props.inputName+item.drawType} type="hidden" value={item.id} alt={item.prizeLevel}
                                    style={{width:'50px'}} className="input w50" />
                                    :null
                                }
                                </td>)
                            }else{
                                return (<td className="f14 border" key={index} id={'rowgl'+item.prizeLevel}>
                                <input ref={this.props.xiugai==true?((this.props.showType==true)?(this.props.inputName0+item.prizeLevel):'prizepercent'):'prizepercent1'}
                                disabled name={this.props.xiugai==true?((this.props.showType==true)?(this.props.inputName0+item.prizeLevel):'prizepercent'):'prizepercent1'} type="text"
                                value={item.prizePercent} id={item.id}
                                alt={item.prizeLevel} style={{width:'50px'}} className="input w50" />&nbsp;%
                                {
                                    (this.props.xiugai==true&&this.props.inputName)?
                                    <input ref={this.props.inputName+item.drawType} name={this.props.inputName+item.drawType} type="hidden" value={item.id} alt={item.prizeLevel }
                                    style={{width:'50px'}} className="input w50" />
                                    :null
                                }
                                </td>)
                            }
                        })
                    }
                    <td width="100">
                        <input ref={this.props.tdName} name={this.props.tdName} type="text" id={this.props.tdId} disabled style={{width:'50px'}} value={this.state.total} className="input w50" />&nbsp;%
                    </td>
                </tr>
                )
            }else{
                return (
                <tr id={this.props.trId} name={this.props.trName} >
                    <td style={{textAlign:'left',paddingLeft:'10px'}} className="border" width="100" height='40px'>{this.props.name}</td>
                    {
                        this.state.dataSource[this.props.dataSourceName].map((item,index)=>{
                            if(this.props.xiugai==true){
                                return (<td className="f14 border" key={index} id={'rowgl'+item.prizeLevel}>
                                <input ref={this.props.xiugai==true?((this.props.showType==true)?(this.props.inputName0+item.prizeLevel):'prizepercent'):'prizepercent1'}
                                name={this.props.xiugai==true?((this.props.showType==true)?(this.props.inputName0+item.prizeLevel):'prizepercent'):'prizepercent1'} type="text"
                                 value={item.prizePercent} onChange={this.onChange} id={item.id}
                                alt={item.prizeLevel} style={{width:'50px'}} className="input w50" />&nbsp;%
                                {
                                    (this.props.xiugai==true&&this.props.inputName)?
                                    <input ref={this.props.inputName+item.drawType} name={this.props.inputName+item.drawType} type="hidden" value={item.id} alt={item.prizeLevel }
                                    style={{width:'50px'}} className="input w50" />
                                    :null
                                }
                                </td>)
                            }else{
                                return (<td className="f14 border" key={index} id={'rowgl'+item.prizeLevel}>
                                <input ref={this.props.xiugai==true?((this.props.showType==true)?(this.props.inputName0+item.prizeLevel):'prizepercent'):'prizepercent1'}
                                disabled name={this.props.xiugai==true?((this.props.showType==true)?(this.props.inputName0+item.prizeLevel):'prizepercent'):'prizepercent1'} type="text"
                                 value={item.prizePercent} id={item.id}
                                alt={item.prizeLevel} style={{width:'50px'}} className="input w50" />&nbsp;%
                                {
                                    (this.props.xiugai==true&&this.props.inputName)?
                                    <input ref={this.props.inputName+item.drawType} name={this.props.inputName+item.drawType} type="hidden" value={item.id} alt={item.prizeLevel }
                                    style={{width:'50px'}} className="input w50" />
                                    :null
                                }
                                </td>)
                            }
                        })
                    }
                    <td width="100" className="border" height='40px'>
                        <input ref={this.props.tdName} name={this.props.tdName} type="text" id={this.props.tdId} disabled style={{width:'50px'}} value={this.state.total} className="input w50" />&nbsp;%
                    </td>
                </tr>
                )
            }

        }else{
            return null
        }
    }
}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        name:'',
        item:this.props.item
    }
  }
  handleClick=(e)=>{
      this.setState({
          name:e.target.value
      })
  }
  componentDidMount(){
      this.props.returnRef(this.refs);
    //   console.log('子组件refs=',this.refs)
  }
  render() {
    return (
    <div>
        <input type='hidden' ref={'id' + this.state.item.id} value={this.state.item.id} data-name={this.state.name} onClick={this.handleClick}/>
        <input type='hidden' ref={'prizeType' + this.state.item.id} value={this.state.item.prizeType} />
        <input type='hidden' ref={'name' + this.state.item.id} name='name_prize_name' value={this.state.item.prizeName} />
        <input type='hidden' ref={'prizeNum' + this.state.item.id} value={this.state.item.prizeNum} />
        <input type='hidden' ref={'limit' + this.state.item.id} value={this.state.item.drawLimit} />
        <input type='hidden' ref={'percent' + this.state.item.id} name='percent_draw' value={this.state.item.prizePercent} />
        <input type='hidden' ref={'smsContent' + this.state.item.id} value={this.state.item.smsContent} />
        <input type='hidden' ref={'level' + this.state.item.id} value={this.state.item.prizeLevel} />
        <input type='hidden' ref={'images' + this.state.item.id} value={this.state.item.prizeImages} />
        <input type='hidden' ref={'flag' + this.state.item.id} value={this.state.item.isRemarks} />
        <input type='hidden' ref={'ljremarks' + this.state.item.id} value={this.state.item.remarks} />
        <input type='hidden' ref={'remarksContent' + this.state.item.id} value={this.state.item.remarksContent} />
        <input type='hidden' ref={'getAwardInfo' + this.state.item.id} value={this.state.item.getAwardInfo} />
        <input type='hidden' ref={'prizeRedInfo' + this.state.item.id} value={this.state.item.redInfo} />
      </div>
    );
  }
}

class SetPrize extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            prizeData:[],
            flow_id:'',
            tele_id:'',
            red_id:'',
            joke_id:'',
            custom_id:'',
            lottery_id:'',
            prizeGailvVisible: false,
            createPrizeVisible: false,
            editPrizeVisible: false,
            hbData:null,
            prizetype_div_val:'',
            prizeType: 4,
            seeGailvBtnDisplay:'none',
            createPrizeBtnDisplay:'',
            ifedit:'0',
            zjData:[],
            gailvDisplay:'block',
            refsArr:[],
            prizeSetDisplay:'block',
            qdsShow:'none',
            hbRadioLimit:'',
            manTotal:0,
            xiugaiDisplay:'none',
            xiugainoDisplay:'',
            xiugaiBtnDisplay:'',
            quedingBtnDisplay:'none',
            totalPercent:{},
            prizePercent:{},
            saveFinished:false,
            restGailv:100.000,
            AwardList:[]
        };
        this.field = new Field(this);
    }
    componentWillMount() {
        $.ajax({
            type: apienv=='local'?'GET':'POST',
            url: apimap[apienv]['MarketingMeansSet2genx'],
            data: apienv=='local'?'':this.props.location.query,
            dataType: 'json',
            async: false,
            success: (data) => {
                this.setState({
                    prizeData: data
                },()=>{console.log('ajax数据=',this.state.prizeData)
            })
            }
        });
    }
    componentDidMount(){
        // console.log('父组件refs===',this.refs)
        if(this.state.prizeData.ifover==1){
            this.onSeeGailvBtnDisplayChange('');
            this.onCreatePrizeBtnDisplayChange('none');
        }else{
            if(this.state.prizeData.telechargeDrawList.length>0){
                this.onSeeGailvBtnDisplayChange('');
            }
        }
        if(this.state.prizeData.id=="null"){
            // document.getElementById("saveh").style.display="none";
            // document.getElementById("savehua").style.display="none";
            // document.getElementById("savex").style.display="none";
            // document.getElementById("YesBtn2").style.display="none";
            // document.getElementById("YesBtn1").style.display="none";
        }
        //签到送
        if(this.state.prizeData.ifmarketd4==1){
            this.setState({
                qdsShow:''
            })
        }else{
             this.setState({
                qdsShow:'none'
            })
        }
        //收藏送
        if(this.state.prizeData.ifmarketd3==1){
            this.setState({
                scsShow:''
            })
        }else{
             this.setState({
                scsShow:'none'
            })
        }
        //加入购物车送
        if(this.state.prizeData.ifmarketd6==1){
            this.setState({
                gwcsShow:''
            })
        }else{
             this.setState({
                gwcsShow:'none'
            })
        }
        //分享送
        if(this.state.prizeData.ifmarketd2==1){
            this.setState({
                fxsShow:''
            })
        }else{
             this.setState({
                fxsShow:'none'
            })
        }
        //进店送
        if(this.state.prizeData.ifmarketd1==1){
            this.setState({
                jdsShow:''
            })
        }else{
             this.setState({
                jdsShow:'none'
            })
        }
        //收藏商品送
        if(this.state.prizeData.ifmarketd7==1){
            this.setState({
                scspsShow:''
            })
        }else{
             this.setState({
                scspsShow:'none'
            })
        }
    }
    componentDidUpdate(){
        // console.log('componentDidUpdate=>state:',this.state,'refs:',this.refs)
    }
    returnTotalValue=(dataSourceName,name)=>{
        let totalPercent={};
        let total=0;
        this.state.prizeData[dataSourceName].map((item,index)=>{
            let percentValue=parseFloat(parseFloat(item.prizePercent).toFixed(3));
            if(isNaN(percentValue)){
                percentValue=0;
            }
            total+=percentValue
        })
        totalPercent[name]=total
        this.setState({
            totalPercent:totalPercent
        })
    }
    callBack=(name,obj,inx)=>{
      console.log("callback返回"+name,obj,inx);
        let newPrizeData=this.state.prizeData;
        console.log(newPrizeData);
        newPrizeData[name][inx].prizePercent=obj;
        // console.log(newPrizeData);
        this.setState((prevProps)=>({
            prizeData:newPrizeData
        }))
    }
    popupConfirm = (id) => {
        Dialog.confirm({
            content: '确定要删除此奖项?',
            title: '提示',
            onOk: () => {
                const {prizeData} = this.state;
                let dataSource=prizeData.telechargeDrawList1;
                let index = -1;
                dataSource.forEach((item, i) => {
                    if (item.id === id) {
                        index = i;
                    }
                });
                if (index !== -1) {
                    dataSource.splice(index, 1);
                    let newPrizeData=this.state.prizeData;
                    newPrizeData.telechargeDrawList1=dataSource;
                    this.setState({
                        prizeData:newPrizeData
                    });
                }
            }
        });
    };
    onCreatePrizeClick = () => {
        this.setState({
            flow_id:'',
            tele_id:'',
            red_id:'',
            joke_id:'',
            custom_id:'',
            lottery_id:'',
            gailvDisplay:'inlineBlock',
            prizeSetDisplay:'inlineBlock',
            createPrizeVisible: true,
            ifedit: '2'
        })
    }
    onCreatePrizeClose = () => {
        this.setState({
            createPrizeVisible: false,
            editPrizeVisible: false
        })
    }
    checkPrizeType=(value)=>{
        if(2==value){
            $.ajax({
                type: apienv=='local'?'GET':'POST',
                url: apienv=='local'?apimap[apienv]['QueryPrizeTempList']:apimap[apienv]['QueryPrizeTempList'],
                data: apienv=='local'?'':{'awardType':1},
                dataType: 'json',
                async: false,
                success: (json)=>{
                    let obj=json;
                    this.setState({
                        hbData:obj,
                        prizetype_div_val: '支付宝红包'
                    })
                },
                error: (xhr, status, error)=>{
                    console.log('xhr=',xhr,' status=',status,' error=',error);
                }
            });
        }
        if(6==value){
            $.ajax({
                type: apienv=='local'?'GET':'POST',
                url: apienv=='local'?apimap[apienv]['QueryPrizeTempList']:apimap[apienv]['QueryPrizeTempList'],
                data: apienv=='local'?'':{'awardType':0},
                dataType: 'json',
                async: false,
                success: (data)=>{
                    if(data.code==-2){
                        // var yhqName = "<select  name=\"\" onchange=\"changeAmount(this.value)\" class=\"dropdown\" id=\"coupon_type\">";
                        // $("#coupon_type_value").val("");
                        // yhqName += "</select>";
                        // $("#yhqName").html(yhqName);
                        // var yhqAmount = "<select disabled=\"disabled\" name=\"\" class=\"dropdown\" id=\"coupon_value\">";
                        // yhqAmount += "</select>";
                        // $("#yhqAmount").html(yhqAmount);
                        console.log('优惠券:','    data.code==-2');
                    }else{
                        console.log('AwardList:',data.AwardList);
                        if(data.AwardList.length>0){
                            console.log('优惠券:','    data.code!=-2&&data.AwardList.length>0');
                            let AwardList=[];
                            for (let i=0;i<data.AwardList.length;i++){
                              AwardList.push(data.AwardList[i]);
                            }
                            // var yhqName = "<select  name=\"\" onchange=\"changeAmount(this.value)\" class=\"dropdown\" id=\"coupon_type\">";
                            // for(var i = 0;i<data.AwardList.length;i++){
                            //     if(i==0){
                            //         $("#coupon_value_name").val();
                            //         $("#coupon_type_value").val(data.AwardList[0].awardInstId);
                            //         yhqName += "<option selected=\"selected\" value=\""+data.AwardList[i].awardInstId+"\">"+data.AwardList[i].name+"</option>";
                            //     }else{
                            //         yhqName += "<option value=\""+data.AwardList[i].awardInstId+"\">"+data.AwardList[i].name+"</option>";
                            //     }
                            // }
                            // yhqName += "</select>";
                            // $("#yhqName").html(yhqName);
                            // var yhqAmount = "<select disabled=\"disabled\" name=\"\" class=\"dropdown\" id=\"coupon_value\">";
                            // for(var i = 0;i<data.AwardList.length;i++){
                            //     if(i==0){
                            //         yhqAmount += "<option selected=\"selected\" value=\""+data.AwardList[i].awardInstId+"\">"+data.AwardList[i].awardPrice/100+data.AwardList[i].currency+"</option>";
                            //     }else{
                            //         yhqAmount += "<option value=\""+data.AwardList[i].awardInstId+"\">"+data.AwardList[i].awardPrice/100+data.AwardList[i].currency+"</option>";
                            //     }
                            // }
                            // yhqAmount += "</select>";
                            // $("#yhqAmount").html(yhqAmount);

                          this.setState({
                            AwardList:AwardList,
                          })
                        }
                    }
                },
                error: (xhr, status, error)=>{
                    console.log('xhr=',xhr,' status=',status,' error=',error);
                }
            });
        }
    }
    onPrizeTypeChange = (value) => {
        this.setState({
            prizeType: value
        });
        this.checkPrizeType(value);
    }
    onXiugaiBtnClick=()=>{
        this.setState({
            xiugaiBtnDisplay:'none',
            quedingBtnDisplay:'',
            xiugaiDisplay:'',
            xiugainoDisplay:'none',
        })
    }
    getTotalValue=()=>{
        if(this.state.prizeData.length>0){
            this.state.prizeData.map((item,index)=>{
                console.log('getTotalValue',item)
            })
        }

    }
    onQuedingBtnClick=()=>{
        this.saveGailv();
        // if(this.state.saveFinished){
        //     this.setState({
        //         xiugaiBtnDisplay:'',
        //         quedingBtnDisplay:'none',
        //         xiugaiDisplay:'none',
        //         xiugainoDisplay:'',
        //     })
        // }
    }
    reloadThis=()=>{
        // console.log('reloadThis()');
        location.reload(true);
    }
    saveGailv=()=>{
        // console.log('saveGailv()');
        var idd=document.getElementsByName("prizepercent");
        var itemidvalue="";
        for(var i=0;i<idd.length;i++){
            //alert(idd[i].id+"  "+idd[i].value);
            itemidvalue+=idd[i].id+">>"+idd[i].value+">>>"
            //alert(itemidvalue);
        }
        var iddt1=document.getElementsByName("prizepercenttoo1");
        // console.log('iddt1:',iddt1)
        var iddt2=document.getElementsByName("prizepercenttoo2");
        var iddt3=document.getElementsByName("prizepercenttoo3");
        var iddt4=document.getElementsByName("prizepercenttoo4");
        var iddt5=document.getElementsByName("prizepercenttoo5");
        var iddt6=document.getElementsByName("prizepercenttoo6");
        var iddt7=document.getElementsByName("prizepercenttoo7");
        if(iddt1.length>0){
            for(var k=0;k<iddt1.length;k++){
                itemidvalue+=iddt1[k].id+">>"+iddt1[k].value+">>>"
            }
        }
        if(iddt2.length>0){
            for(var k=0;k<iddt2.length;k++){
                itemidvalue+=iddt2[k].id+">>"+iddt2[k].value+">>>"
            }
        }
        if(iddt3.length>0){
            for(var k=0;k<iddt3.length;k++){
                itemidvalue+=iddt3[k].id+">>"+iddt3[k].value+">>>"
            }
        }
        if(iddt4.length>0){
            for(var k=0;k<iddt4.length;k++){
                itemidvalue+=iddt4[k].id+">>"+iddt4[k].value+">>>"
            }
        }
        if(iddt5.length>0){
            for(var k=0;k<iddt5.length;k++){
                itemidvalue+=iddt5[k].id+">>"+iddt5[k].value+">>>"
            }
        }
        if(iddt6.length>0){
            for(var k=0;k<iddt6.length;k++){
                itemidvalue+=iddt6[k].id+">>"+iddt6[k].value+">>>"
            }
        }
        if(iddt7.length>0){
            for(var k=0;k<iddt7.length;k++){
                itemidvalue+=iddt7[k].id+">>"+iddt7[k].value+">>>"
            }
        }
        // var ff;
        // var f1f=0;
        // var mdd=document.getElementsByName("prizepercentmfull");
        // for(var m=0;m<mdd.length;m++){
        //     f1f+=parseFloat(document.getElementById(""+mdd[m].value).value);
        // }
        // var fb;
        // var f1b=0;
        // var bdd=document.getElementsByName("prizepercentbbuyer");
        // for(var b=0;b<bdd.length;b++){
        //     f1b+=parseFloat(document.getElementById(""+bdd[b].value).value);
        // }
        // var fp;
        // var f1p=0;
        // var pdd=document.getElementsByName("prizepercentppraise");
        // for(var p=0;p<pdd.length;p++){
        //     f1p+=parseFloat(document.getElementById(""+pdd[p].value).value);
        // }
        for(name in this.state.totalPercent){
            console.log('名称:',name,'值:',this.state.totalPercent[name]);
            if(this.state.totalPercent[name]>100){
                let content= name+'的中奖总概率已经超过100%当前总概率为'+this.state.totalPercent[name]+'%'
                Dialog.alert({
                    content:content
                })
                return;
            }
        }
        // this.state.prizeData.
        var f;
        var f1=0;
        if(this.state.prizeData.ifmarketd4==1){
            var tdd=document.getElementsByName("prizepercenttoodrainage");
            for(var i=0;i<tdd.length;i++){
                f1+=parseFloat(document.getElementById(""+tdd[i].value).value);
            }
            if(tdd.length != 0 && this.state.prizeData.telechargeDrawListd.length != 0) {
                f1 = f1 / (tdd.length / this.state.prizeData.telechargeDrawListd.length);
            }
        }
        var fa;
        var f2=0;
        if(this.state.prizeData.ifmarketd3==1){
            for(var i=0;i<this.state.prizeData.telechargeDrawListd.length;i++){
                var iddzj2=document.getElementById("trHeader_pdsong1").getElementsByTagName("INPUT")[i * 2].value;
                fa = parseFloat(iddzj2);
                f2=f2+fa;
            }
        }
        var fa3;
        var f3=0;
        if(this.state.prizeData.ifmarketd6==1){
            for(var i=0;i<this.state.prizeData.telechargeDrawListd.length;i++){
                var iddzj3=document.getElementById("trHeader_pdsong2").getElementsByTagName("INPUT")[i * 2].value;
                fa3 = parseFloat(iddzj3);
                f3=f3+fa3;
            }
        }
        var fa4;
        var f4=0;
        if(this.state.prizeData.ifmarketd5==1){
            for(var i=0;i<this.state.prizeData.telechargeDrawListd.length;i++){
                var iddzj4=document.getElementById("trHeader_pdsong3").getElementsByTagName("INPUT")[i * 2].value;
                fa4 = parseFloat(iddzj4);
                f4=f4+fa4;
            }
        }
        var fa5;
        var f5=0;
        if(this.state.prizeData.ifmarketd2==1){
            for(var i=0;i<this.state.prizeData.telechargeDrawListd.length;i++){
                var iddzj5=document.getElementById("trHeader_pdsong4").getElementsByTagName("INPUT")[i * 2].value;
                // f = parseInt(iddzj);
                fa5 = parseFloat(iddzj5);
                f5=f5+fa5;
            }
        }
        var fa6;
        var f6=0;
        if(this.state.prizeData.ifmarketd1==1){
            for(var i=0;i<this.state.prizeData.telechargeDrawListd.length;i++){
                var iddzj6=document.getElementById("trHeader_pdsong5").getElementsByTagName("INPUT")[i * 2].value;
                // f = parseInt(iddzj);
                fa6 = parseFloat(iddzj6);
                f6=f6+fa6;
            }
        }
        var fa7;
        var f7=0;
        if(this.state.prizeData.ifmarketd7==1){
            for(var i=0;i<this.state.prizeData.telechargeDrawListd.length;i++){
                var iddzj7=document.getElementById("trHeader_pdsong6").getElementsByTagName("INPUT")[i * 2].value;
                // f = parseInt(iddzj);
                fa7 = parseFloat(iddzj7);
                f7=f7+fa7;
            }
        }
        // console.log('(fi*:)',f1f,f1b,f1p,'(f1-7:)',f1,f2,f3,f4,f5,f6,f7)
        if(f1>100){
            Dialog.alert({content:"签到送的中奖总概率已经超过100%当前总概率为"+parseFloat(parseFloat(f1).toFixed(3))+"%"});
            return false;
        }
        if(f2>100){
            Dialog.alert({content:"收藏送的中奖总概率已经超过100%当前总概率为"+parseFloat(parseFloat(f2).toFixed(3))+"%"});
            return false;
        }
        if(f3>100){
            Dialog.alert({content:"加入购物车送的中奖总概率已经超过100%当前总概率为"+parseFloat(parseFloat(f3).toFixed(3))+"%"});
            return false;
        }
        if(f4>100){
            Dialog.alert({content:"关注送的中奖总概率已经超过100%当前总概率为"+parseFloat(parseFloat(f4).toFixed(3))+"%"});
            return false;
        }
        if(f5>100){
            Dialog.alert({content:"分享送的中奖总概率已经超过100%当前总概率为"+parseFloat(parseFloat(f5).toFixed(3))+"%"});
            return false;
        }
        if(f6>100){
            Dialog.alert({content:"进店送的中奖总概率已经超过100%当前总概率为"+parseFloat(parseFloat(f6).toFixed(3))+"%"});
            return false;
        }
        if(f7>100){
            Dialog.alert({content:"收藏商品送的中奖总概率已经超过100%当前总概率为"+parseFloat(parseFloat(f7).toFixed(3))+"%"});
            return false;
        }
        // if(f1f>100){
        //     alert("满就送的中奖总概率已经超过100%当前总概率为"+parseFloat(parseFloat(f1f).toFixed(3))+"%");
        //     return false;
        // }
        // if(f1b>100){
        //     alert("买就送的中奖总概率已经超过100%当前总概率为"+parseFloat(parseFloat(f1b).toFixed(3))+"%");
        //     return false;
        // }
        // if(f1p>100){
        //     alert("好评送的中奖总概率已经超过100%当前总概率为"+parseFloat(parseFloat(f1p).toFixed(3))+"%");
        //     return false;
        // }
        var flow_id=$("#flow_id").val();//id
        if(document.getElementById("nosetId")!=null){
            document.getElementById("nosetId").style.display="none";
        }
        var prize_percent=$("#flow_prize_percent").val();
        var prize_type=$("#flow_prize_typetoo").val();
        if(prize_type==0){prize_type="流量"}else{prize_type="淘金币"}
        if(flow_id!=null){
            drow(flow_id);
        }
        var prize_name=$("#flow_prize_nametoo").val();
        var prize_num=$("#flow_prize_num").val();
        var getawardinfo="1,2";
        var smsContent="";
        var prize_images="liul.png";
        var params={
            "activityId":this.state.prizeData.activityId,
            "prizeType":prize_type,//类型
            "id":flow_id,
            "prizeName":itemidvalue,//名称
            "prizeNum":prize_num,
            "prizePercent":prize_percent,
            "marketId":this.state.prizeData.id,
            "smsContent":smsContent,
            "prize_images":prize_images,
            "getawardinfo":getawardinfo,
            "type":this.state.prizeData.type
        };
        $.ajax({
            type: apienv=='local'?'GET':'POST',
            url: apienv=='local'?apimap[apienv]['MarketingMeansSet2Savegenxgail']:apimap[apienv]['MarketingMeansSet2Savegenxgail'],
            data: apienv=='local'?params:params,
            dataType: 'json',
            async: false,
            success:(json)=>{
                if(json.rlt==0){
                    // location.reload(true);
                   this.setState({
                     prizeGailvVisible:false
                   })
                }
            },
            error: (xhr, status, error)=>{
                console.log('xhr=',xhr,' status=',status,' error=',error);
            }
        })
    }
    onAdd = (obj) => {
        // 注意在没有通过shouldComponentUpdate判断的时候可以使用此写法
        // 否则注意数组和对象的引用关系
        const {prizeData} = this.state;
        let dataSource=prizeData.telechargeDrawList1;
        dataSource.push(obj);
        this.setState({
            telechargeDrawList1:dataSource
        });
    }
    onDelete=(obj)=>{
        var ids=this.state.refs["id"+obj].value;
        Dialog.confirm({
            content: '确定要删除此奖项?',
            title: '提示',
            onOk: () => {
                $.post("MarketingMeansSet2Updategenx.json",{"ids":ids,"issele":false},function(json){
                    if(json.rlt==0){
                        location.reload(true);
                    }else{
                        Dialog.alert({content: json.txt});
                    }

                },"json");
            }
        });
        // if(confirm("确定要删除此奖项?")){
        //     $("#fadesll").show();
        //     $.post("MarketingMeansSet2Updategenx.json",{"ids":ids,"issele":false},function(json){
        //         if(json.rlt==0){
        //             var tableObj =document.getElementById("prizeTable");// $("prizeTable");
        //             var rows = tableObj.rows.length;
        //             $("#newRows"+obj).remove();
        //             reloadThis();
        //         }else{
        //             alert(json.txt);
        //         }

        //     },"json");
        // }
    }
    onEdit=(obj)=>{
        this.setState({
            prizeSetDisplay:'none'
        })
        var f1=0;//刺激总和
        this.setState({
            ifedit:'1'
        })
        if(this.state.ifedit=='1'){
            this.setState({
                gailvDisplay:'none'
            })
        }
        var qdd=document.getElementsByName("prizepercenttoodianage");
        console.log('qdd=',qdd);
        for(var i=0;i<qdd.length;i++){
            f1+=parseFloat(document.getElementById(""+qdd[i].value).value);
        }
        if(qdd.length != 0 && this.state.prizeData.telechargeDrawListd.length != 0) {
            f1 = f1 / (qdd.length / this.state.prizeData.telechargeDrawListd.length);
        }
        var f1f=0;//满就送总和
        var mdd=document.getElementsByName("prizepercentmfull");
        console.log('mdd:',mdd);
        for(var m=0;m<mdd.length;m++){
            f1f+=parseFloat(document.getElementById(""+mdd[m].value).value);
        }
        console.log('满就送总和:',f1f);
        var f1b=0;//买就送总和
        var bdd=document.getElementsByName("prizepercentbbuyer");
        for(var b=0;b<bdd.length;b++){
            f1b+=parseFloat(document.getElementById(""+bdd[b].value).value);
        }
        console.log('买就送总和:',f1b);
        var f1p=0;//好评送总和
        var pdd=document.getElementsByName("prizepercentppraise");
        for(var p=0;p<pdd.length;p++){
            f1p+=parseFloat(document.getElementById(""+pdd[p].value).value);
        }
        console.log('评价送总和:',f1p);


        var max=f1;
        if(f1f>max){
            max=f1f;
        }
        if(f1b>max){
            max=f1b;
        }
        if(f1p>max){
            max=f1p;
        }


        var k=100;
        if(max>100){
            k=0;
        }else{
            k=100-max;
        }
        let restGailv=parseFloat(k).toFixed(3);
        this.setState({
            restGailv:restGailv
        })
        // document.getElementById("gailqianbao").value=parseFloat(k).toFixed(3);
        // document.getElementById("gailhongbao").value=parseFloat(k).toFixed(3);
        // document.getElementById("gailhuafei").value=parseFloat(k).toFixed(3);
        // document.getElementById("gailzidingyi").value=parseFloat(k).toFixed(3);
        // document.getElementById("gailcaipiao").value=parseFloat(k).toFixed(3);
        // document.getElementById("coupon_percent_d").value=parseFloat(k).toFixed(3);
        var prizeType=this.state.refs["prizeType"+obj].value
        console.log(prizeType)
        var id=this.state.refs["id"+obj].value;
        var lever=this.state.refs["level"+obj].value;
        // let levert=parseInt(lever);
        var name=this.state.refs["name"+obj].value;
        var prizeNum=this.state.refs["prizeNum"+obj].value;

        var limit=this.state.refs["limit"+obj].value;
        var percent=this.state.refs["percent"+obj].value;
        var smsContent=this.state.refs["smsContent"+obj].value;
        var ljremarks=this.state.refs["ljremarks"+obj].value;
        var prizeRedInfo=this.state.refs["prizeRedInfo"+obj].value;
        var img=this.state.refs["images"+obj].value;
        console.log(limit,percent,prizeNum)
        // lever=parseInt(lever)-1;
        editPrizeData={
          prizeType:prizeType,
          id:id,
          lever:lever,
          name:name,
          prizeNum:prizeNum,
          limit:limit,
          percent:percent,
          smsContent:smsContent,
          ljremarks:ljremarks,
          prizeRedInfo:prizeRedInfo,
          img:img,
        }
        // this.refs.getPrize.updatePrize(editPrizeData);
      console.log("this.refs.getPrize========================"+this.refs);
        if("话费"==prizeType){
            console.log('话费==prizeType')
            this.setState({
                editPrizeVisible:true,
                prizeType:1,
            })
            var objSelect=document.getElementById("tele_prize_level");
            // $("#tele_prize_level").easyDropDown('select', lever);
            if("100元话费"==name){
                name=0;
            }
            if("50元话费"==name){
                name=1;
            }
            if("30元话费"==name){
                name=2;
            }
            if("10元话费"==name){
                name=3;
            }
            this.setState({
                sjhfPrizeNum:prizeNum,
                sjhfPrizePercent:percent,
                sjhfLimit:limit,
                sjhfSms:smsContent,
                sjhfId:id,
            })
        }else if("流量"==prizeType||"淘金币"==prizeType){
            console.log(prizeType+'==prizeType')
            this.setState({
                editPrizeVisible:true,
                prizeType:0,
                llqbPrizeNum:prizeNum,
                llqbPrizeNameToo:name,
                llqbPrizePercent:percent,
                llqbId:id,
                llqbPrizeLevel:lever
            })
            // $("#flow_prize_num").val(prizeNum);
			//  $("#flow_prize_nametoo").val(name);
			//  $("#flow_prize_percent").val(percent);
			//  $("#flow_limit").val(limit);
			//  $("#flow_id").val(id);
			//  $("#flow_prize_level").easyDropDown('select', lever);
			name=name.substr(0,name.length-3);
			// $("#flow_prize_name").val(name);
            this.setState({
                llqbPrizeName:name
            })
            // var images=$("#images"+obj).val();
            var images = this.state.refs['images'+obj].value;
            this.setState({
                llqbPictureUrl:images
            })
			//  $("#flow_prize_image").val(images);
        }
        else if("彩票"==prizeType){
            console.log('彩票==prizeType')
            var objSelect=document.getElementById("lottery_prize_level");
            this.setState({
                editPrizeVisible:true,
                prizeType:5,
                cpPrizeNum:prizeNum,
                cpPrizePercent:percent,
                cpLimit:limit,
                cpSms:smsContent,
                cpId:id,
                cpMemo:this.state.refs['remarksContent'+obj].value
            })
            // $("#lottery_prize_num").val(prizeNum);
            // $("#lottery_prize_percent").val(percent);
            // $("#lottery_limit").val(limit);
            // $("#lottery_templateSms").val(smsContent);
            // $("#lottery_id").val(id);
            // $("#lottery_memo_content").val($("#remarksContent"+obj).val());
            var flag=this.state.refs['flag'+obj].value;
            if(flag!=""&&flag!=null)
                flag=parseInt(flag);
            if(flag>0){
                this.setState({
                    flagColor:flag
                })
            }
        }else if("笑话"==prizeType){
            console.log('笑话==prizeType')
            this.setState({
                editPrizeVisible:true,
                prizeType:3,
                joke_id:id,
                joke_prize_percent:percent
            })
        }else if("自定义"==prizeType){
            console.log('自定义==prizeType')
            this.setState({
                editPrizeVisible:true,
                prizeType:4,
                zdyjpPrizeNum:prizeNum,
                zdyjpPrizePercent:percent,
                zdyjpLimit:limit,
                zdyjpSms:smsContent,
                zdyjpId:id,
                zdyjpName:name,
                lqlianjie:ljremarks
            })
            // $("#custom_prize_num").val(prizeNum);
            // $("#custom_prize_percent").val(percent);
            // $("#custom_templateSms").val(smsContent);
            // $("#custom_prize_name").val(name);
            // $("#custom_id").val(id);
            // $("#custom_prize_limit").val(limit);
            // $("#lqlianjie").val(ljremarks);
            var images=this.state.refs['images'+obj].value;
            // var images=$("#images"+obj).val();
            //if(images.contains('http'))
            this.setState({
                zdyjpPictureUrl:images
            })
            // $("#custom_prize_image").val(images);
            if(this.state.refs['flag'+obj].value>0){
                // $("#custom_issend_memo").attr("checked",'true');
                this.setState({
                    zdyjpMemoDisplay:'block'
                })
            }else{
                this.setState({
                    zdyjpMemoDisplay:'none'
                })
            }
            this.setState({
                zdyjpMemo:this.state.refs['remarksContent'+obj].value
            })
            // $("#custom_memo_content").val($("#remarksContent"+obj).val());
            var flag=this.state.refs['flag'+obj].value;
            if(flag!=""&&flag!=null)
                flag=parseInt(flag);
            if(flag>=0){
                this.setState({
                    flagColor:flag
                })
            // $("#custom_memo_flag").easyDropDown('select',flag);
            }
            var getAwardInfo=this.state.refs['getAwardInfo'+obj].value;
            var getAwardInfos=getAwardInfo.split(",");
            let awardInfos=[];
            if(getAwardInfos.length>0){
                for(var i=0;i<getAwardInfos.length;i++){
                    if(getAwardInfos[i]!=""&&getAwardInfos[i]!=null&&getAwardInfos[i]=='1'){
                        // document.getElementById("custom_award_ww").checked=true;
                        awardInfos.push("wangwang");
                    }if(getAwardInfos[i]!=""&&getAwardInfos[i]!=null&&getAwardInfos[i]=='2'){
                        awardInfos.push("phoneNum");
                        // document.getElementById("custom_award_mobile").checked=true;
                    }if(getAwardInfos[i]!=""&&getAwardInfos[i]!=null&&getAwardInfos[i]=='3'){
                        awardInfos.push("zfbNum");
                        // document.getElementById("custom_award_zfb").checked=true;
                    }if(getAwardInfos[i]!=""&&getAwardInfos[i]!=null&&getAwardInfos[i]=='4'){
                        awardInfos.push("address");
                        // document.getElementById("custom_award_address").checked=true;
                    }if(getAwardInfos[i]!=""&&getAwardInfos[i]!=null&&getAwardInfos[i]=='5'){
                        awardInfos.push("realName");
                        // document.getElementById("custom_award_real_name").checked=true;
                    }
                }
            }
        }else if("优惠券new"==prizeType){
            console.log('优惠券new==prizeType');
            this.checkPrizeType(6);
            this.setState({
                yhqPrizeLevel:lever
            })
            // $("#coupon_prize_level").easyDropDown('select', lever);
            //$("#tele_prize_name").easyDropDown('select', name+"");
            this.setState({
                yhqPrizeName:name,
                yhqPrizeType:prizeRedInfo
            })
            var yhqName = <Select disabled="disabled" name=""  className="dropdown" id="coupon_type">
                <Option selected="selected" value={prizeRedInfo}>{name}</Option>
            </Select>
            // $("#coupon_type_value").val(prizeRedInfo);
            // yhqName += "<option selected=\"selected\" value=\""+prizeRedInfo+"\">"+name+"</option></select>";
            // $("#yhqName").html(yhqName);
            this.setState({
                yhqName:yhqName
            })
            this.setState({
                yhqPrizeNum:prizeNum,
                yhqPrizeLimit:limit,
                yhqSms:smsContent,
                yhqId:id
            })
            // $("#coupon_prize_num").val(prizeNum);
            // $("#coupon_prize_limit").val(limit);
            // $("#coupon_templateSms").val(smsContent);
            // $("#coupon_id").val(id);
            console.log('状态:',this.state)
        }else if("红包"==prizeType){
            console.log('红包==prizeType')
            this.checkPrizeType(2);
            // $("#red_prize_level").easyDropDown('select', lever);
            this.setState({
                hbPrizeLevel:lever
            })
            //$("#red_prize_name").easyDropDown('select', name);
            var images=this.state.refs['images'+obj].value;
            // $("#red_prize_image").val(images);
            this.setState({
                hbPictureUrl:images
            })
            if(prizeNum>0)
            {
                this.setState({
                    hbRadioLimit:1,
                    hbPrizeNum:prizeNum
                })
                // $("#red_prize_num").val(prizeNum);
            }
            else{
                // $("#red_prize_num_0").attr("checked","checked");
                this.setState({
                    hbRadioLimit:0,
                    hbPrizeNum:prizeNum
                })
            }
            var redAmount=name.split("元红包");

            if(redAmount[1]=="手动送"){
                // $("#red_prize_name").val(redAmount[0])
                this.setState({
                    hbPrizeName:redAmount[0]
                })
            }else{
                var a= document.getElementsByName('red_amount');
                for(var i=0;i<a.length;i++){
                    if(redAmount[0]==a[i].value){
                        $("#red_prize_name"+i).attr("checked","checked");
                    }
                }

            }
            this.setState({
                prizetype_div_val:'支付宝红包',
                hbPrizePercent:percent,
                hbLimit:limit,
                hbSms:smsContent,
                hbId:id,
            })
            //abccc $("#red_prize_name").val(redAmount[0]);
            // $("#hbPrizePercent").val(percent);
            // $("#hbLimit").val(limit);
            // $("#hbSms").val(smsContent);
            // $("#hbId").val(id);
            // $("#hbLimit").val(limit);
        } else if("支付宝红包"==prizeType){
            console.log('支付宝红包==prizeType')
            this.checkPrizeType(2);
            this.setState({
                editPrizeVisible:true,
                prizeType:2,
            })

            // $("#red_prize_level").easyDropDown('select', lever);
            var images=this.state.refs['images'+obj].value;
            this.setState({
                hbPictureUrl:images
            })
            if(prizeNum>0)
            {
                this.setState({
                    hbRadioLimit:1,
                    hbPrizeNum:prizeNum
                },()=>{console.log('hbRadioLimit:',this.state.hbRadioLimit)})
            }else{
                this.setState({
                    hbRadioLimit:0,
                    hbPrizeNum:prizeNum
                },()=>{console.log('hbRadioLimit:',this.state.hbRadioLimit)})
            }
            var redAmount=name.split("元红包");
            if(prizeRedInfo!=null&&prizeRedInfo!=""){
                var redinfos=prizeRedInfo.split(",");
                this.setState({
                    n_red_new_rname:redinfos[0],
                    n_red_new_rm:redinfos[1],
                    n_red_new_rtime:redinfos[2],
                    prizetype_div_val:'支付宝红包',
                    hbPrizePercent:percent,
                    hbLimit:limit,
                    hbSms:smsContent,
                    hbId:id,
                    hbMemo:this.state.refs['remarksContent'+obj].value
                })
            }
            console.log('out',this.state)
            // $("#prizetype_div_val").val("支付宝红包");
            // $("#red_prize_percent").val(percent);
            // $("#red_limit").val(limit);
            // $("#red_templateSms").val(smsContent);
            // $("#red_id").val(id);

            // $("#red_memo_content").val($("#remarksContent"+obj).val());
            var flag=this.state.refs['flag'+obj].value;
            if(flag!=""&&flag!=null)
                flag=parseInt(flag);
            if(flag>0){
                this.setState({
                    hbFlagColor:flag
                })
            }
        } else if("店铺宝贝"==prizeType){
            // easyDialog.open({
            //     container : 'divEbookList8',
            //     drag : false,
            //     fixed : true,
            //     overlay : true
            // });
            //
            // $("#product_prize_level").easyDropDown('select', lever);
            $("#product_prize_num").val(prizeNum);
            $("#product_prize_percent").val(percent);
            $("#product_templateSms").val(smsContent);
            $("#product_prize_name").val(name);
            $("#product_id").val(id);
            $("#product_prize_limit").val(limit);
            var images=$("#images"+obj).val();
            $("#productImg").attr("src",images);
            if($("#flag"+obj).val()>0){
                $("#product_issend_memo").attr("checked",'true');
                document.getElementById("product_memo_div").style.display="block";
            }else{
                document.getElementById("product_memo_div").style.display="none";
            }
            $("#product_memo_content").val($("#remarksContent"+obj).val());
            var flag=$("#flag"+obj).val();
            if(flag!=""&&flag!=null)
                flag=parseInt(flag)-1;
            if(flag>=0)
            $("#product_memo_flag").easyDropDown('select',flag);
            var getAwardInfo=$("#getAwardInfo"+obj).val();
            var getAwardInfos=getAwardInfo.split(",");
            if(getAwardInfos.length>0){
                for(var i=0;i<getAwardInfos.length;i++){
                    if(getAwardInfos[i]!=""&&getAwardInfos[i]!=null&&getAwardInfos[i]=='1'){
                        document.getElementById("product_award_ww").checked=true;
                    }if(getAwardInfos[i]!=""&&getAwardInfos[i]!=null&&getAwardInfos[i]=='2'){
                        document.getElementById("product_award_mobile").checked=true;
                    }if(getAwardInfos[i]!=""&&getAwardInfos[i]!=null&&getAwardInfos[i]=='3'){
                        document.getElementById("product_award_zfb").checked=true;
                    }if(getAwardInfos[i]!=""&&getAwardInfos[i]!=null&&getAwardInfos[i]=='4'){
                        document.getElementById("product_award_address").checked=true;
                    }if(getAwardInfos[i]!=""&&getAwardInfos[i]!=null&&getAwardInfos[i]=='5'){
                        document.getElementById("product_award_real_name").checked=true;
                    }
                }
            }

        }
        console.log('状态!!!-->',this.state)
    }

    // onEdit = (id) => {
    //     this.setState({
    //         createPrizeVisible:true
    //     })
    //     console.log('edit',id)
    //     const {prizeData} = this.state;
    //     let dataSource=prizeData.telechargeDrawList1;
    //     this.setState({
    //         telechargeDrawList1:dataSource
    //     });
    // }
    // onRemove = (id) => {
    //     const {prizeData} = this.state;
    //     let dataSource=prizeData.telechargeDrawList1;
    //     let index = -1;
    //     dataSource.forEach((item, i) => {
    //         if (item.id === id) {
    //             index = i;
    //         }
    //     });
    //     if (index !== -1) {
    //         this.state.telechargeDrawList1=dataSource.splice(index, 1);
    //         this.setState({
    //             prizeData:{
    //                 telechargeDrawList1:dataSource
    //             }
    //         });
    //     }
    // }

  // 查看概率关闭
    onPrizeGailvClose = () =>{
        this.setState({
            prizeGailvVisible:false
        })
      this.reloadThis();
    }
    onSeeGailvClick = () => {
        this.setState({
            xiugaiDisplay:'none',
            xiugainoDisplay:'',
            quedingBtnDisplay:'none',
            xiugaiBtnDisplay:'',
            prizeGailvVisible: true
        })
    }
    nextStep=()=> {
        console.log('nextStep');
        self.location.href = `${LinkTool['redux-pcMod']}`;
    }
    getJPMC = (index, value, item) => {
        return (<span>{item.prizeName}</span>)
    }
    getJPSL = (index, value, item) => {
        if (item.prizeAmount < 1) {
            return (<span>无限制</span>)
        }
        if (item.prizeAmount > 0) {
            return (<span>{item.prizeAmount}</span>)
        }
    }
    getJPLX = (index, value, item) => {
        return (<a href='javascript:void(0)' className='cj_btn_eidt'>{item.prizeType}</a>)
    }
    getXZTJ = (index, value, item) => {
        if (item.drawLimit > 0) {
            return (<a href='javascript:void(0)' className='cj_btn_eidt'>中{item.drawLimit}次</a>)
        } if (item.drawLimit < 1) {
            return (<a href='javascript:void(0)' className='cj_btn_eidt'>不限制</a>)
        }
    }
    getCZ = (index, value, item) => {
        return (
            <div className='operate' style={{ display: 'block' }}>
                <Button type="primary" className="marginR-8" shape="text" onClick={this.onEdit.bind(this,item.id)} title='编辑'>编辑</Button>
                <Button type="primary" shape="text" onClick={this.onDelete.bind(this,item.id)} title='删除'>删除</Button>
            </div>
        )
    }
    getJX = (index, value, item) => {
        let jXValue = '';
        if (item.prizeLevel == 1) {
            jXValue = '一等奖';
        }
        if (item.prizeLevel == 2) {
            jXValue = '二等奖';
        }
        if (item.prizeLevel == 3) {
            jXValue = '三等奖';
        }
        if (item.prizeLevel == 4) {
            jXValue = '四等奖';
        }
        if (item.prizeLevel == 5) {
            jXValue = '五等奖';
        }
        if (item.prizeLevel == 6) {
            jXValue = '六等奖';
        }
        if (item.prizeLevel == 9) {
            jXValue = '红包';
        }
        if (item.prizeLevel == '7') {
            jXValue = '笑话段子';
        }
        return (
            <div>
                {jXValue}
                <CustomTextInput item={item} returnRef={this.getRefs}/>
            </div>
        )
    }
    getRefs=(refs)=>{
        let newArr = this.state.refsArr;
        for(let index in refs)
        {
            if(typeof(newArr[index])=='undefined'){
                newArr[index]=refs[index];
            }
        }
        this.setState({
            refs:newArr
        },()=>{
            // console.log('this.state.refs=',this.state.refs)
        })

    }
    res=()=>{
        console.log('res');
    }
    onSeeGailvBtnDisplayChange=(value)=>{
        this.setState({
            seeGailvBtnDisplay:value
        })
    }
    onCreatePrizeBtnDisplayChange=(value)=>{
        this.setState({
            createPrizeBtnDisplay:value
        })
    }
    render(){
        const renderTitle=(title)=>{
            return (<div style={{textAlign:'center'}}>{title}</div>)
        }
        const init = this.field.init;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 20
            }
        };
        const createPrizeFooter = <a></a>;
        const prizeGailvFooter = <a></a>;
        const getZjData = () => {
            let result=[];
            if(this.state.prizeData.telechargeDrawListf.length>0){
                result.push({
                    title:'满就送',
                })
            }
            console.log('result:',result)
            return result;
        }
        return (
            <div>
                <Breadcrumb style={{ padding: 20 }}>
                    <Breadcrumb.Item link={LinkTool['index']}>抽奖活动</Breadcrumb.Item>
                    <Breadcrumb.Item link={LinkTool['redux-setConfig']}>活动设置</Breadcrumb.Item>
                    <Breadcrumb.Item link={LinkTool['redux-setPrize']}>设置奖品</Breadcrumb.Item>
                </Breadcrumb>
                <Step style={{ padding: 20 }} current={1} type='arrow'>
                    <StepItem title={contOne} />
                    <StepItem title={contTwo} />
                    <StepItem title={contThree} />
                    <StepItem title={contFour} />
                </Step>
                <div style={{ width: '100%' }} ref="getPrizes">
                    <div style={{position:'relative',float:'right'}}>
                        <Button style={{display:this.state.seeGailvBtnDisplay,marginRight:'10px'}} type='primary' onClick={this.onSeeGailvClick}>查看概率</Button>
                        <Button style={{display:this.state.createPrizeBtnDisplay,marginRight:'30px'}} type='primary' onClick={this.onCreatePrizeClick}>创建奖品</Button>
                    </div>
                    <div style={{height:'38px'}}></div>
                        <Dialog title='创建奖品'
                            footer={createPrizeFooter} visible={this.state.createPrizeVisible}
                            onClose={this.onCreatePrizeClose} style={{float:'left',width:'60%',height:'auto'}} minMargin={40} shouldUpdatePosition={true}>
                            <Form field={this.field} size='medium'>
                                <FormItem label='奖品类型设置：' {...formItemLayout} style={{display:this.state.prizeSetDisplay}}>
                                    <Select placeholder='请选择奖品类型' onChange={this.onPrizeTypeChange} value={this.state.prizeType} style={{ width: '180px' }}>
                                        <Option value={5}>彩票</Option>
                                        <Option value={0}>流量钱包</Option>
                                        <Option value={1}>手机话费</Option>
                                        <Option value={2}>红包</Option>
                                        <Option value={6}>优惠券</Option>
                                        {/*<Option value={3}>笑话段子</Option>*/}
                                        <Option value={4}>自定义奖品</Option>
                                    </Select>
                                </FormItem>
                                <CreatePrize ref="getPrize" restGailv={this.state.restGailv} ifEdit={this.state.ifedit} gailvDisplay={this.state.gailvDisplay} type={this.state.prizeType} AwardList={this.state.AwardList}
                                             prizeData={this.state.prizeData} hbDataSource={this.state.hbData} prizetype_div_val={this.state.prizetype_div_val} onCreatePrizeClose={this.onCreatePrizeClose}
                                             />
                            </Form>
                        </Dialog>

                  <Dialog title='编辑奖品'
                          footer={createPrizeFooter} visible={this.state.editPrizeVisible}
                          onClose={this.onCreatePrizeClose} style={{float:'left',width:'60%',height:'auto'}} minMargin={40} shouldUpdatePosition={true}>
                    <Form field={this.field} size='medium'>
                      <FormItem label='奖品类型设置：' {...formItemLayout} style={{display:this.state.prizeSetDisplay}}>
                        <Select placeholder='请选择奖品类型' onChange={this.onPrizeTypeChange} value={this.state.prizeType} style={{ width: '180px' }}>
                          <Option value={5}>彩票</Option>
                          <Option value={0}>流量钱包</Option>
                          <Option value={1}>手机话费</Option>
                          <Option value={2}>红包</Option>
                          <Option value={6}>优惠券</Option>
                          {/*<Option value={3}>笑话段子</Option>*/}
                          <Option value={4}>自定义奖品</Option>
                        </Select>
                      </FormItem>
                      <EditPrize ref="getPrize" restGailv={this.state.restGailv} ifEdit={this.state.ifedit} gailvDisplay={this.state.gailvDisplay} type={this.state.prizeType} AwardList={this.state.AwardList}
                                 editPrizeData={editPrizeData} prizeData={this.state.prizeData} hbDataSource={this.state.hbData} prizetype_div_val={this.state.prizetype_div_val} onCreatePrizeClose={this.onCreatePrizeClose}
                      />
                    </Form>
                  </Dialog>

                    <div style={{textAlign:'center', paddingLeft: '20px', paddingRight: '20px',margin:'0 auto'  }}>
                        <Table isZebra={true} hasBorder={true} dataSource={this.state.prizeData.telechargeDrawL>0?this.state.prizeData.telechargeDrawL:this.state.prizeData.telechargeDrawList1} >
                            <Table.Column title={renderTitle('奖项')} width={80} cell={this.getJX} />
                            <Table.Column title={renderTitle('奖品名称')} width={150} cell={this.getJPMC} />
                            <Table.Column title={renderTitle('奖品数量')} width={120} cell={this.getJPSL} />
                            <Table.Column title={renderTitle('奖品类型')} width={120} cell={this.getJPLX} />
                            <Table.Column title={renderTitle('限制条件')} width={120} cell={this.getXZTJ} />
                            <Table.Column title={renderTitle('操作')} width={120} cell={this.getCZ} />
                        </Table>
                    </div>
                    <Dialog title='中奖概率'
                        footer={prizeGailvFooter} visible={this.state.prizeGailvVisible}
                        onClose={this.onPrizeGailvClose} style={{width:'auto',height:'auto'}} minMargin={40} shouldUpdatePosition={true}>
                        <Form field={this.field}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colSpan='2'>
                                            <table id="prizeTabletoo" cellSpacing="0"
                                                cellPadding="0" className="title-table lh200 mb10 tc">
                                                <tbody id="xiugaino" style={{width:'auto',border:'0',display: this.state.xiugainoDisplay}} className="gl-table">
                                                    <tr className="fb" id="trHeader">
                                                        <td className='border' width="85" style={{backgroundColor:'#EBEBEB'}}><img
                                                            src={apienv=='local'?'/src/images/20150806jxmc.png':'/cp/images/20150806jxmc.png'} />

                                                        </td>
                                                        {
                                                             this.state.prizeData.telechargeDrawList.length<=0?null:
                                                                this.state.prizeData.telechargeDrawList.map((item,index)=>{
                                                                    return <td className='border f14' width="85" key={index} style={{backgroundColor:'#EBEBEB'}}
                                                                    id={'rowjp'+item.prizeLevel}>
                                                                        {
                                                                        item.prizeLevel==1?'一等奖':
                                                                        item.prizeLevel==2?'二等奖':
                                                                        item.prizeLevel==3?'三等奖':
                                                                        item.prizeLevel==4?'四等奖':
                                                                        item.prizeLevel==5?'五等奖':
                                                                        item.prizeLevel==6?'六等奖':
                                                                        item.prizeLevel==9?'红包':null
                                                                        }
                                                                    </td>
                                                                })
                                                        }
                                                        <td className='border' width="100" style={{backgroundColor:'#EBEBEB', align:'center'}}>总计</td>

                                                    </tr>
                                                    {/*满就送 */}
                                                    <RenderSend dataSourceName='telechargeDrawListf' dataSource={this.state.prizeData} trId='trHeader_pf1' trName='prizepercentf' tdName='zongf' tdId='zongjf1' name='满就送'/>
                                                    {/*买就送 */}
                                                    <RenderSend dataSourceName='telechargeDrawListb' dataSource={this.state.prizeData} trId='trHeader_pb1' trName='prizepercentb' tdName='zongb' tdId='zongjb1' name='买就送'/>
                                                    {/*评价送 */}
                                                    <RenderSend dataSourceName='telechargeDrawListp' dataSource={this.state.prizeData} trId='trHeader_pp1' trName='prizepercentp' tdName='zongp' tdId='zongjp1' name='评价送'/>
                                                    {/*签到概率 */}
                                                    <RenderSend dataSourceName='telechargeDrawListdq' dataSource={this.state.prizeData} trId='trHeader_pdq1' trName='prizepercentdq' tdName='zongjq' tdId='zongjdq1' name='签到概率'/>
                                                    {/*收藏概率 */}
                                                    <RenderSend dataSourceName='telechargeDrawListds' dataSource={this.state.prizeData} trId='trHeader_pds1' trName='prizepercentds' tdName='zongjs' tdId='zongjds1' name='收藏概率'/>
                                                    {/*加购物车概率 */}
                                                    <RenderSend dataSourceName='telechargeDrawListdjia' dataSource={this.state.prizeData} trId='trHeader_pdjia1' trName='prizepercentdjia' tdName='zongjjia' tdId='zongjdjia1' name='加购物车概率'/>
                                                    {/*关注概率*/}
                                                    <RenderSend dataSourceName='telechargeDrawListdg' dataSource={this.state.prizeData} trId='trHeader_pdg1' trName='prizepercentdg' tdName='zongjg' tdId='zongjdg1' name='关注概率'/>
                                                    {/*分享概率 */}
                                                    <RenderSend dataSourceName='telechargeDrawListdf' dataSource={this.state.prizeData} trId='trHeader_pdf1' trName='prizepercentdf' tdName='zongjf' tdId='zongjdf1' name='分享概率'/>
                                                    {/*进店概率 */}
                                                    <RenderSend dataSourceName='telechargeDrawListdjin' dataSource={this.state.prizeData} trId='trHeader_pdjin1' trName='prizepercentdjin' tdName='zongjjin' tdId='zongjdjin1' name='进店概率'/>
                                                    {/*收藏商品概率 */}
                                                    <RenderSend dataSourceName='telechargeDrawListdsg' dataSource={this.state.prizeData} trId='trHeader_pdsg1' trName='prizepercentdsg' tdName='zongjsg' tdId='zongjdsg1' name='收藏商品概率'/>
                                                    {/*签到送 */}
                                                    <RenderSend propData={this.state.prizePercent} isExist={this.state.prizeData.ifmarketd4==1} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong_d' trName='prizepercentdsong' tdName='zongjsong' tdId='zongjdsong' name='签到送'/>
                                                    {/*收藏送 */}
                                                    <RenderSend propData={this.state.prizePercent} isExist={this.state.prizeData.ifmarketd3==1} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong1_d' trName='prizepercentdsong1' tdName='zongjsong1' tdId='zongjddsong1' name='收藏送'/>
                                                    {/*加入购物车送 */}
                                                    <RenderSend propData={this.state.prizePercent} isExist={this.state.prizeData.ifmarketd6==1} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong2_d' trName='prizepercentdsong2' tdName='zongjsong2' tdId='zongjddsong2' name='加入购物车送'/>
                                                    {/*关注送 */}
                                                    <RenderSend propData={this.state.prizePercent} isExist={this.state.prizeData.ifmarketd5==1} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong3_d' trName='prizepercentdsong3' tdName='zongjsong3' tdId='zongjddsong3' name='收藏送'/>
                                                    {/*分享送 */}
                                                    <RenderSend propData={this.state.prizePercent} isExist={this.state.prizeData.ifmarketd2==1} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong4_d' trName='prizepercentdsong4' tdName='zongjsong4' tdId='zongjddsong4' name='分享送'/>
                                                    {/*进店送 */}
                                                    <RenderSend propData={this.state.prizePercent} isExist={this.state.prizeData.ifmarketd1==1} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong5_d' trName='prizepercentdsong5' tdName='zongjsong5' tdId='zongjddsong5' name='进店送'/>
                                                    {/*收藏商品送 */}
                                                    <RenderSend propData={this.state.prizePercent} isExist={this.state.prizeData.ifmarketd7==1} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong6_d' trName='prizepercentdsong6' tdName='zongjsong6' tdId='zongjddsong6' name='收藏商品送'/>

                                                </tbody>
                                                <tbody id="xiugai" style={{width:'auto',border:'0',display: this.state.xiugaiDisplay}} className="gl-table">
                                                    <tr className="fb" id="trHeader">
                                                        <td width="85" style={{backgroundColor:'#f7f7f7'}}><img
											                src={apienv=='local'?'/src/images/20150806jxmc.png':'/cp/images/20150806jxmc.png'} />
                                                        </td>
                                                        {
                                                             this.state.prizeData.telechargeDrawList.length<=0?null:
                                                                this.state.prizeData.telechargeDrawList.map((item,index)=>{
                                                                    return <td width="85" key={index} style={{backgroundColor:'#f7f7f7'}}
                                                                    id={'rowjp'+item.prizeLevel} className="f14">
                                                                        {
                                                                        item.prizeLevel==1?'一等奖':
                                                                        item.prizeLevel==2?'二等奖':
                                                                        item.prizeLevel==3?'三等奖':
                                                                        item.prizeLevel==4?'四等奖':
                                                                        item.prizeLevel==5?'五等奖':
                                                                        item.prizeLevel==6?'六等奖':
                                                                        item.prizeLevel==9?'红包':null
                                                                        }
                                                                    </td>
                                                                })
                                                        }
                                                        <td width="100" style={{backgroundColor:'#f7f7f7', align:'center'}}>总计</td>

                                                    </tr>
                                                    {/*满就送 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} callBack={this.callBack} xiugai={true} inputName={'prizepercentm'} dataSourceName='telechargeDrawListf' dataSource={this.state.prizeData} trId='trHeader_pf' trName='prizepercentf' tdName='zongj' tdId='zongjf' name='满就送'/>
                                                    {/*买就送 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} callBack={this.callBack} xiugai={true} inputName={'prizepercentb'} dataSourceName='telechargeDrawListb' dataSource={this.state.prizeData} trId='trHeader_pb' trName='prizepercentb' tdName='zongb' tdId='zongjb' name='买就送'/>
                                                    {/*评价送 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} callBack={this.callBack} xiugai={true} inputName={'prizepercentp'} dataSourceName='telechargeDrawListp' dataSource={this.state.prizeData} trId='trHeader_pp' trName='prizepercentp' tdName='zongp' tdId='zongjp' name='评价送'/>
                                                    {/*签到概率 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} callBack={this.callBack} xiugai={true} dataSourceName='telechargeDrawListdq' dataSource={this.state.prizeData} trId='trHeader_pdq1' trName='prizepercentdq' tdName='zongjq' tdId='zongjdq' name='签到概率'/>
                                                    {/*收藏概率 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} callBack={this.callBack} xiugai={true} dataSourceName='telechargeDrawListds' dataSource={this.state.prizeData} trId='trHeader_pds1' trName='prizepercentds' tdName='zongjs' tdId='zongjds' name='收藏概率'/>
                                                    {/*加购物车概率 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} callBack={this.callBack} xiugai={true} dataSourceName='telechargeDrawListdjia' dataSource={this.state.prizeData} trId='trHeader_pdjia' trName='prizepercentdjia' tdName='zongjjia' tdId='zongjdjia' name='加购物车概率'/>
                                                    {/*关注概率*/}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} callBack={this.callBack} xiugai={true} dataSourceName='telechargeDrawListdg' dataSource={this.state.prizeData} trId='trHeader_pdg' trName='prizepercentdg' tdName='zongjg' tdId='zongjdg' name='关注概率'/>
                                                    {/*分享概率 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} callBack={this.callBack} xiugai={true} dataSourceName='telechargeDrawListdf' dataSource={this.state.prizeData} trId='trHeader_pdf' trName='prizepercentdf' tdName='zongjf' tdId='zongjdf' name='分享概率'/>
                                                    {/*进店概率 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} callBack={this.callBack} xiugai={true} dataSourceName='telechargeDrawListdjin' dataSource={this.state.prizeData} trId='trHeader_pdjin' trName='prizepercentdjin' tdName='zongjjin' tdId='zongjdjin' name='进店概率'/>
                                                    {/*收藏商品概率 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} callBack={this.callBack} xiugai={true} dataSourceName='telechargeDrawListdsg' dataSource={this.state.prizeData} trId='trHeader_pdsg' trName='prizepercentdsg' tdName='zongjsg' tdId='zongjdsg' name='收藏商品概率'/>
                                                    {/*签到送 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} propData={this.state.prizePercent} callBack={this.callBack} xiugai={true} isExist={this.state.prizeData.ifmarketd4==1} showType={true} inputName0={'prizepercenttoo'} inputName={'prizepercenttoo'} display={this.state.qdsShow} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong' trName='prizepercentdsong_d' tdName='zongjsong_d' tdId='zongjdsong_d' name='签到送'/>
                                                    {/*收藏送 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} propData={this.state.prizePercent} callBack={this.callBack} xiugai={true} isExist={this.state.prizeData.ifmarketd3==1} showType={true} inputName0={'prizepercenttoo'} inputName={'prizepercenttoo'} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong1' trName='prizepercentdsong1_d' tdName='zongjsong1_d' tdId='zongjddsong1_d' name='收藏送'/>
                                                    {/*加入购物车送 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} propData={this.state.prizePercent} callBack={this.callBack} xiugai={true} isExist={this.state.prizeData.ifmarketd6==1} showType={true} inputName0={'prizepercenttoo'} inputName={'prizepercenttoo'} dataSourceName='telechargeDrawListd' display={this.state.gwcsShow} dataSource={this.state.prizeData} trId='trHeader_pdsong2' trName='prizepercentdsong2_d' tdName='zongjsong2_d' tdId='zongjddsong2_d' name='加入购物车送'/>
                                                    {/*关注送 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} propData={this.state.prizePercent} callBack={this.callBack} xiugai={true} isExist={this.state.prizeData.ifmarketd5==1} showType={true} inputName0={'prizepercenttoo'} inputName={'prizepercenttoo'} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong3' trName='prizepercentdsong3_d' tdName='zongjsong3_d' tdId='zongjddsong3_d' name='关注送'/>
                                                    {/*分享送 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} propData={this.state.prizePercent} callBack={this.callBack} xiugai={true} isExist={this.state.prizeData.ifmarketd2==1} showType={true} inputName0={'prizepercenttoo'} inputName={'prizepercenttoo'} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong4' trName='prizepercentdsong4_d' tdName='zongjsong4_d' tdId='zongjddsong4_d' name='分享送'/>
                                                    {/*进店送 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} propData={this.state.prizePercent} callBack={this.callBack} xiugai={true} isExist={this.state.prizeData.ifmarketd1==1} showType={true} inputName0={'prizepercenttoo'} inputName={'prizepercenttoo'} dataSourceName='telechargeDrawListd' dataSource={this.state.prizeData} trId='trHeader_pdsong5' trName='prizepercentdsong5_d' tdName='zongjsong5_d' tdId='zongjddsong5_d' name='进店送'/>
                                                    {/*收藏商品送 */}
                                                    <RenderSend returnTotalValue={this.returnTotalValue} propData={this.state.prizePercent} callBack={this.callBack} xiugai={true} isExist={this.state.prizeData.ifmarketd7==1} showType={true} inputName0={'prizepercenttoo'} inputName={'prizepercenttoo'} dataSourceName='telechargeDrawListd' display={this.state.scspsShow} dataSource={this.state.prizeData} trId='trHeader_pdsong6' trName='prizepercentdsong6_d' tdName='zongjsong6_d' tdId='zongjddsong6_d' name='收藏商品送'/>
                                                </tbody>

                                            </table>
                                            <div className="tc mt15 f18">
                                                <Button type='secondary' className="" onClick={this.onXiugaiBtnClick} style={{display:this.state.xiugaiBtnDisplay}}>
                                                    修改
                                                </Button>
                                                <Button type='primary' className="" onClick={this.onQuedingBtnClick} style={{display:this.state.quedingBtnDisplay}}>
                                                    确定
                                                </Button>
                                            </div>
                                            <div className="f-red f14 ml20 mt20">
                                                进店送、分享送、收藏送、收藏商品送、签到送、加入购物车送<br />(这几个条件,共用一个抽奖概率，改动其中一个其他跟着变动)
                                            </div>
                                            <div className="f-cs f14 ml20 mt5">
                                                概率说明<br /> 1.不同类型下面奖品对应的概率不一样。<br /> 2.中奖概率最大为100%。<br />
                                                3.0则表示不中奖，除0以为最小为0.001。

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Form>
                    </Dialog>
                    <div style={{textAlign:'center',marginTop:20}}>
                        <Button type='primary' size='large' onClick={this.nextStep}>下一步</Button>
                    </div>
                </div>

            </div>
        )
    }
}
export default connect((state) => {
    return {
        setPrize: state.setPrize
    };
})(SetPrize);

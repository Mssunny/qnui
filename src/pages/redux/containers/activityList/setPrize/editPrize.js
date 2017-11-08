import React from 'react';
import Select from 'qnui/lib/select';
import Icon from 'qnui/lib/icon';
import Dialog from 'qnui/lib/dialog';
import apimap from 'utils/apimap';
import Checkbox from 'qnui/lib/checkbox';
import Input from 'qnui/lib/input';
import Form from 'qnui/lib/form';
import Field from 'qnui/lib/field';
import Button from 'qnui/lib/button';
import Radio from 'qnui/lib/radio';
import $ from 'jquery';
import * as actions from '../../../actions/createPrize';
import './createPrize.scss';
const apienv = window.apienv || 'local';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Group: CheckboxGroup } = Checkbox;
class EditPrize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restGailv:this.props.restGailv,
      radioLimit:0,
      ifedit:'2',
      hbData:this.props.hbDataSource,
      type:this.props.type,
      prizeData:this.props.prizeData,
      allPrizeGailv:this.props.gailvDisplay,
      AwardList:this.props.AwardList,
      cpLevel:this.props.editPrizeData.lever,
      llqbLevel:this.props.editPrizeData.lever,
      sjhfLevel:this.props.editPrizeData.lever,
      hbLevel:this.props.editPrizeData.lever,
      yhqLevel:this.props.editPrizeData.lever,
      zdyjpLevel:this.props.editPrizeData.lever,
      cpType:"双色球",
      sjhfType:100,
      yhqType:'',
      cpPrizeNum:this.props.editPrizeData.prizeNum,
      llqbPrizeNum:this.props.editPrizeData.prizeNum,
      sjhfPrizeNum:this.props.editPrizeData.prizeNum,
      hbPrizeNum:this.props.editPrizeData.prizeNum,
      yhqPrizeNum:this.props.editPrizeData.prizeNum,
      zdyjpPrizeNum:this.props.editPrizeData.prizeNum,
      cpPrizeGailv:'',
      llqbPrizeGailv:'',
      sjhfPrizeGailv:'',
      hbPrizeGailv:'',
      yhqPrizeGailv:'',
      zdyjpPrizeGailv:'',
      cpPrizeLimit:this.props.editPrizeData.limit,
      llqbPrizeLimit:this.props.editPrizeData.limit,
      sjhfPrizeLimit:this.props.editPrizeData.limit,
      hbPrizeLimit:this.props.editPrizeData.limit,
      yhqPrizeLimit:this.props.editPrizeData.limit,
      zdyjpPrizeLimit:this.props.editPrizeData.limit,
      llqbPictureUrl:this.props.editPrizeData.img,
      sjhfPictureUrl:this.props.editPrizeData.img,
      hbPictureUrl:this.props.editPrizeData.img,
      zdyjpPictureUrl:this.props.editPrizeData.img,
      zdyjpPrizeName:this.props.editPrizeData.name,
      liuLimit:parseInt(this.props.editPrizeData.name),
      hbPrice:0,
      yhqPrice:'',
      awardUrl:'',
      awardInfo:[],
      flagColor:0,
      flagContent:'',
      levert:null,
      yhqLabel:"3元",
    }
    this.field = new Field(this);
  }
  componentWillMount() {
    console.log(this.props.editPrizeData)
  }
  componentWillReceiveProps(nextprops){
    // console.log('this.state.type',this.state.type)
    this.setState({
      restGailv:nextprops.restGailv,
      type:nextprops.type,
      hbData:nextprops.hbDataSource,
      prizeData:nextprops.prizeData,
      allPrizeGailv:nextprops.gailvDisplay
    })
  }
  getLevelName=(level)=>{
    if(1==level){
      return "一等奖";
    }if(2==level){
      return "二等奖";
    }if(3==level){
      return "三等奖";
    }if(4==level){
      return "四等奖";
    }if(5==level){
      return "五等奖";
    }if(6==level){
      return "六等奖";
    }if(7==level){
      return "七等奖";
    }if(8==level){
      return "八等奖";
    }if(9==level){
      return "红包";
    }
    else{
      return level;
    }
  }
  updatePrize(data){
    console.log(data);
  }
  drow=(rid)=>{
    // var tableObj =document.getElementById("prizeTable");// $("prizeTable");
    // var rows = tableObj.rows.length;
    // $("#newRows"+rid).remove();
    // console.log('drow:'+rid)
  }
  checkLevel=(levelName,percentName)=>{
    var temp=this.state.prizeData.telechargeDrawL>0?this.state.prizeData.telechargeDrawL:this.state.prizeData.telechargeDrawList1;
    for(var i=0;i<temp.length;i++){
      console.log('传入参数(奖项等级名称:'+levelName+',百分比名称:'+percentName+')','  item:',temp[i])
      if(temp[i].prizeLevel==levelName){
        Dialog.alert({
          content: "已经有此奖项："+this.getLevelName(levelName)
        });
        return false;
      }
    }
    console.log('I goon')

    var f1=0;//刺激总和
    // var qdd=this.state.prizepercenttoodrainage;
    var qdd=document.getElementsByName("prizepercenttoodrainage");
    // qdd.map((item)=>{
    //     f1+=parseFloat(item.value)
    // })
    for(var i=0;i<qdd.length;i++){
      f1+=parseFloat(document.getElementById(""+qdd[i].value).value);
    }
    if(qdd.length != 0 && this.state.prizeData.telechargeDrawListd.length != 0) {
      f1 = f1 / (qdd.length / this.state.prizeData.telechargeDrawListd.length);
    }
    var f1f=0;//满就送总和
    // var mdd=this.state.prizepercentmfull;
    var mdd=document.getElementsByName("prizepercentmfull");
    // mdd.map((item,index)=>{
    //     f1f+=parseFloat(item.value);
    // })
    for(var i=0;i<mdd.length;i++){
      f1f+=parseFloat(document.getElementById(""+mdd[i].value).value);
    }
    var f1b=0;//买就送总和
    // var bdd=this.state.prizepercentbbuyer;
    var bdd=document.getElementsByName("prizepercentbbuyer");
    // bdd.map((item,index)=>{
    //     f1f+=parseFloat(item.value);
    // })
    for(var b=0;b<bdd.length;b++){
      f1b+=parseFloat(document.getElementById(""+bdd[b].value).value);
    }

    var f1p=0;//好评送总和
    // var pdd=this.state.prizepercentppraise;
    var pdd=document.getElementsByName("prizepercentppraise");
    // pdd.map((item,index)=>{
    //     f1f+=parseFloat(item.value);
    // })
    // var pdd=this.state.prizepercentppraise;
    for(var p=0;p<pdd.length;p++){
      f1p+=parseFloat(document.getElementById(""+pdd[p].value).value);
    }
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
    var p=percentName;
    if((parseFloat(max)+parseFloat(p))>100){
      Dialog.alert({
        content:"中奖概率已经超过100% 现为"+(parseFloat(max)+parseFloat(p))
      })
      return false;
    }

    return true;
  }
  reloadThis=()=>{
    location.reload(true);
  }
  handleSubmit(value) {
    switch(value){
      case 'cp':
        let lottery_id="";//id
        // if(document.getElementById("nosetId")!=null)
        //   document.getElementById("nosetId").style.display="none";
        let prize_level=this.state.cpLevel;
        let prize_level_name=this.getLevelName(prize_level);
        if(lottery_id!=null){
          this.drow(lottery_id);
        }
        if(this.state.ifedit=="2"){
          let prize_percent=this.state.cpPrizeGailv;
        }
        console.log(prize_level_name);
        if(!this.checkLevel(prize_level,prize_percent)){
          return false;
        }
        var isSign=false;
        $.ajax({
          type: apienv=='local'?'GET':'POST',
          url: apienv=='local'?apimap[apienv]['CaipiaoSignCheck']:apimap[apienv]['CaipiaoSignCheck'],
          async : false,
          dataType : "json",
          data:{"ppt":""},
          success : function(json) {
            console.log(json.signTxt);
            if(json.signRlt==true){
              isSign = true;
            }else{
              isSign = false;
            }
          }
        });
        if(!isSign){
          Dialog.alert({content:"请先开通支付宝代扣协议",title:"提示"});
          return false;
        }
        var prize_name=this.state.cpType;
        var prize_num=this.state.cpPrizeNum;
        if(prize_num==""||prize_num==null){
          Dialog.alert("彩票数量不能为空！");
          return false;
        }
        var limit=this.state.cpPrizeLimit;
        var getawardinfo="1,2";
        var smsContent="";
        // if(document.getElementById("lottery_issendsms").checked==true)
        //   smsContent=$("#lottery_templateSms").val();

        var flag=0;
        // flag=$("#lottery_memo_flag").val();
        var params={
          "activityId":this.state.prizeData.activityId,
          "prizeType":"彩票",
          "id":lottery_id,
          "prizeLevel":prize_level,
          "prizeName":prize_name,
          "prizeNum":prize_num,
          "limit":limit,
          "prizePercent":prize_percent,
          "marketId":this.state.prizeData.id,
          "smsContent":smsContent,
          "prize_images":"lottery.jpg",
          "getawardinfo":getawardinfo,
          "flag":flag,
          // "remarksContent":$("#lottery_memo_content").val(),
          "remarksContent":"",
          "type":this.state.prizeData.type
        };

        if(limit!=""){
          limit="中"+limit+"次";
        }
        $.ajax({
          type: apienv=='local'?'GET':'POST',
          url: apienv=='local'?apimap[apienv]['MarketingMeansSet2Savegenx']:apimap[apienv]['MarketingMeansSet2Savegenx'],
          data: apienv=='local'?'':params,
          dataType: 'json',
          async: false,
          success: (json)=>{
            if(json.rlt==0){
              //addRow("流量",json.id,prize_level,prize_name,prize_num,prize_percent,limit,smsContent);
              this.reloadThis();
            }else{
              Dialog.alert({
                content:json.txt
              })
              this.reloadThis();
            }
          },
          error: (xhr, status, error)=>{
            console.log('xhr=',xhr,' status=',status,' error=',error);
          }
        });
        break;
      case 'llqb':
        var flow_id='';
        if(this.state.nosetId!=null){
          this.setState({
            nosetIdDisplay:'none'
          })
        }
        // var flow_id=this.state.cpId;//id
        // if(document.getElementById("nosetId")!=null)
        //     document.getElementById("nosetId").style.display="none";
        var prize_level=this.state.llqbLevel;
        var prize_level_name=this.getLevelName(prize_level);
        if('2'==this.state.ifedit){
          var prize_percent=this.state.llqbPrizeGailv;
        }
        if(flow_id!=null){
          this.drow(flow_id);
        }

        if(!this.checkLevel(/*prize_level_name*/prize_level,prize_percent)){
          return false;
        }
        if(this.state.liuLimit==''||this.state.liuLimit==null||!(/(^[1-9]\d*$)/.test(this.state.liuLimit))){
          Dialog.alert({
            content:"流量面额不能为空，且必须为整数"
          })
          return;
        }
        var prize_name=this.state.liuLimit+"M流量";
        var prize_num=this.state.llqbPrizeNum;
        if(prize_num==''||prize_num==null||!(/(^[1-9]\d*$)/.test(prize_num))){
          Dialog.alert({
            content:"奖品数量不能为空，且必须为整数"
          })
          return;
        }
        var limit=this.state.llqbPrizeLimit;
        var getawardinfo="1,2";
        var smsContent="";
        var prize_images="liul.png";

        var flow_prize_image=this.state.llqbPictureUrl;

        if(flow_prize_image!=null&&flow_prize_image!=""){
          prize_images=flow_prize_image;
        }
        var params={
          "activityId":this.state.prizeData.activityId,
          "prizeType":"流量",//类型
          "id":flow_id,
          "prizeLevel":prize_level,
          "prizeLeveold":this.state.levert,
          "prizeName":prize_name,//名称
          "prizeNum":prize_num,
          "limit":limit,
          "prizePercent":prize_percent,
          "marketId":this.state.prizeData.id,
          "smsContent":smsContent,
          "prize_images":prize_images,
          "getawardinfo":getawardinfo,
          "type":this.state.prizeData.type
        };

        if(limit!=""&&limit!="undefined"){
          limit="中"+limit+"次";
        }
        $.ajax({
          type: apienv=='local'?'GET':'POST',
          url: apienv=='local'?apimap[apienv]['MarketingMeansSet2Savegenx']:apimap[apienv]['MarketingMeansSet2Savegenx'],
          data: apienv=='local'?'':params,
          dataType: 'json',
          async: false,
          success: (json)=>{
            if(json.rlt==0){
              //addRow("流量",json.id,prize_level,prize_name,prize_num,prize_percent,limit,smsContent);
              this.reloadThis();
            }else{
              Dialog.alert({
                content:json.txt
              })
              this.reloadThis();
            }
          },
          error: (xhr, status, error)=>{
            console.log('xhr=',xhr,' status=',status,' error=',error);
          }
        });
        break;
      case 'sjhf':
        var tele_id="";//id
        // if(document.getElementById("nosetId")!=null)
        //   document.getElementById("nosetId").style.display="none";
        var prize_level=this.state.sjhfLevel;
        var prize_level_name=this.getLevelName(prize_level);
        if(this.state.ifedit=="2"){
          var prize_percent=this.state.sjhfPrizeGailv;
        }

        if(tele_id!=null){
          this.drow(tele_id);
        }
        if(!this.checkLevel(prize_level,prize_percent)){
          return false;
        }
        var prize_name=this.state.sjhfType;
        var prize_num=this.state.sjhfPrizeNum;
        if(prize_num==''||prize_num==null||!(/(^[1-9]\d*$)/.test(prize_num))){
          Dialog.alert({content:"奖品数量不能为空，且必须为整数",title:"提示"});
          return;
        }
        var limit=this.state.sjhfPrizeLimit;
        // if(${rlt.teleCount<10}){
        //   Dialog.alert({content:"话费余额不足不能创建话费奖项！",title:"提示"});
        //   return;
        // }
        var getawardinfo="1,2";
        var smsContent="";
        // if(document.getElementById("tele_issendsms").checked==true)
        //   smsContent=$("#tele_templateSms").val();
        // $("#fadesll").show();
        var params={
          "activityId":this.state.prizeData.activityId,
          "prizeType":"话费",
          "id":tele_id,
          "prizeLevel":prize_level,
          "prizeLeveold":this.state.levert,
          "prizeName":prize_name+"元话费",
          "prizeNum":prize_num,
          "limit":limit,
          "prizePercent":prize_percent,
          // "marketId":$("#marketId").val(),
          "marketId":this.state.prizeData.id,
          "smsContent":smsContent,
          "prize_images":"tele"+prize_name+".jpg",
          "getawardinfo":getawardinfo,
          "type":this.state.prizeData.type
        };
        if(limit!=""){
          limit="中"+limit+"次";
        }
        $.ajax({
          type: apienv=='local'?'GET':'POST',
          url: apienv=='local'?apimap[apienv]['MarketingMeansSet2Savegenx']:apimap[apienv]['MarketingMeansSet2Savegenx'],
          data: apienv=='local'?'':params,
          dataType: 'json',
          async: false,
          success: (json)=>{
            if(json.rlt==0){
              this.addRow("流量",json.id,prize_level,prize_name,prize_num,prize_percent,limit,smsContent);
              this.reloadThis();
            }else{
              Dialog.alert({
                content:json.txt
              })
              this.reloadThis();
            }
          },
          error: (xhr, status, error)=>{
            console.log('xhr=',xhr,' status=',status,' error=',error);
          }
        });
        break;
      case 'hb':
        var red_id="";//id
        // if(document.getElementById("nosetId")!=null){
        //     document.getElementById("nosetId").style.display="none";
        // }
        var prize_level=this.state.hbLevel;
        var prize_level_name=this.getLevelName(prize_level);
        if("2"==this.state.ifedit){
          var prize_percent=this.state.hbPrizeGailv;
        }

        if(red_id!=null){
          this.drow(red_id);
        }
        if(!this.checkLevel(prize_level_name,prize_percent)){
          return false;
        }
        var prize_type="支付宝红包";
        var prize_red_info="";
        var prize_name="";
        let index=this.state.hbPrice;
        console.log(this.state.hbPrice);
        if(this.state.hbPrice!=""&&this.state.hbPrice!=null){
          console.log(this.state.hbData.AwardList[this.state.hbPrice]);
          prize_type=this.state.hbData.AwardList[index].awardType_name;
          var red_new_rname=this.state.hbData.AwardList[index].name;
          var red_new_rm=this.state.hbData.AwardList[index].awardType+this.state.hbData.AwardList[index].currency;
          var red_new_rtime=this.state.hbData.AwardList[index].useEndDate;
          prize_name=red_new_rm+"支付宝红包";
          prize_red_info=red_new_rname+","+red_new_rm+","+red_new_rtime;
        }else{
          var amountLen=document.getElementsByName("red_amount") ;
          // if(amountLen.length>0){
          //     for(var i=0;i<amountLen.length-1;i++){
          //         if(document.getElementById("red_prize_name"+i).checked){
          //             prize_name=$("#red_prize_name"+i).val();
          //             break;
          //         }
          //     }
          // }
          if(this.state.hbPrice==""||this.state.hbPrice==null){
            Dialog.alert({
              content:'请选择红包模版'
            })
            return false;
          }
          prize_name=this.state.hbData.AwardList[index].awardType;
          if(isNaN(prize_name)){
            Dialog.alert({
              content:'红包面额 必须为数字!'
            })
            return false;
          }
          if(prize_name>0){
            prize_name=prize_name+"元红包";
          }
          else{
            Dialog.alert({
              content:'请选中红包金额'
            })
            return;
          }
          /* 	if(document.getElementById("red_prize_name8").checked){
           prize_name=prize_name+"手动送";
           } */
        }

        var prize_num=0;
        if(this.state.radioLimit==1){
          prize_num=this.state.hbPrizeNum;
          if(prize_num<1){
            Dialog.alert({
              content:'奖品数量将不限制'
            })
          }
        }
        if(prize_num==null){
          Dialog.alert({
            content:'奖品数量不能为空，且必须位数字'
          })
          return;
        }
        var r1=/^[0-9]+.?[0-9]*$/;
        if(!r1.test(prize_num)){
          Dialog.alert({
            content:'奖品数量必须为整数'
          })
          return;
        }

        var image="zfbhb.jpg";
        var red_prize_image=this.state.hbPictureUrl;
        if(red_prize_image!=null&&red_prize_image!=""){
          image=red_prize_image;
        }

        var limit=this.state.hbPrizeLimit;
        var getawardinfo="1,2";
        var smsContent="";
        // $("#fadesll").show();

        var flag=0;
        //     flag=this.state.flagColor;

        var params={
          "activityId":this.state.prizeData.activityId,
          "prizeType":prize_type,
          "id":red_id,
          "prizeLevel":prize_level,
          "prizeLeveold":this.state.levert,
          "prizeName":prize_name,
          "prizeNum":prize_num,
          "limit":limit,
          "prizePercent":prize_percent,
          "marketId":this.state.prizeData.id,
          "smsContent":smsContent,
          "prize_images":image,
          "getawardinfo":getawardinfo,
          "prize_red_info":prize_red_info,
          "flag":flag,
          // "remarksContent":$("#red_memo_content").val(),
          "remarksContent":"",
          "type":this.state.prizeData.type,
          "benefitId":$("#awardInstId").val()
        };

        if(limit!=""){
          limit="中"+limit+"次";
        }
        $.ajax({
          type: apienv=='local'?'GET':'POST',
          url: apienv=='local'?apimap[apienv]['MarketingMeansSet2Savegenx']:apimap[apienv]['MarketingMeansSet2Savegenx'],
          data: apienv=='local'?'':params,
          dataType: 'json',
          async: false,
          success: (json)=>{
            if(json.rlt==0){
              //addRow("流量",json.id,prize_level,prize_name,prize_num,prize_percent,limit,smsContent);
              this.reloadThis();
            }else{
              Dialog.alert({
                content:json.txt
              })
              this.reloadThis();
            }
          },
          error: (xhr, status, error)=>{
            console.log('xhr=',xhr,' status=',status,' error=',error);
          }
        })
        break;
      case 'yhq':
        console.log('yhq');
        var coupon_id='';//id
        // if(document.getElementById("nosetId")!=null)
        //   document.getElementById("nosetId").style.display="none";

        if(coupon_id!=null){
          this.drow(coupon_id);
        }
        var prize_level=this.state.yhqLevel;
        var prize_level_name=this.getLevelName(prize_level);
        var prize_percent=this.state.yhqPrizeGailv;
        if(!this.checkLevel(prize_level,prize_percent)){
          return false;
        }
        var coupon_value=this.state.yhqPrice;
        var coupon_type = this.state.yhqLabel;
        console.log(coupon_type)
        if(coupon_type){
          var prize_name=coupon_type;
        }
        if(coupon_value==""||coupon_value==null){
          Dialog.alert({content:"请选择优惠券"});
          return false;
        }
        var prize_num=this.state.yhqPrizeNum;
        if(prize_num==""||prize_num==null){
          Dialog.alert({content:"优惠券数量不能为空！"});
          return false;
        }
        var limit=this.state.yhqPrizeLimit;
        // var coupon_addres=$("#coupon_addres").val();
        var coupon_addres="";
        var smsContent="";
        // if(document.getElementById("coupon_issendsms").checked==true)
        //   smsContent=$("#coupon_templateSms").val();

        var params={
          "activityId":this.state.prizeData.activityId,
          "prizeType":"优惠券new",
          "id":coupon_id,
          "prizeLevel":prize_level,
          "prizeName":this.state.yhqLabel+"优惠券",
          "prizeNum":prize_num,
          "limit":limit,
          "prizePercent":prize_percent,
          "marketId":this.state.prizeData.id,
          "type":this.state.prizeData.type,
          "smsContent":smsContent,
          "prize_images":"coupon"+coupon_value+".jpg",
          "remarks":coupon_addres,
          // "benefitId":$("#coupon_type_value").val()
          "benefitId":""
        };

        if(limit!=""||limit!=0){
          limit="中"+limit+"次";
        }else{
          limit="不限制";
        }
        $.ajax({
          type: apienv=='local'?'GET':'POST',
          url: apienv=='local'?apimap[apienv]['MarketingMeansSet2Savegenx']:apimap[apienv]['MarketingMeansSet2Savegenx'],
          data: apienv=='local'?params:params,
          dataType: 'json',
          async: false,
          success: (json)=>{
            if(json.rlt==0){
              this.addRow("流量",json.id,prize_level,prize_name,prize_num,prize_percent,limit,smsContent);
              this.reloadThis();
            }else{
              Dialog.alert({
                content:json.txt
              })
            }
          },
          error: (xhr, status, error)=>{
            console.log('xhr=',xhr,' status=',status,' error=',error);
          }
        });
        break;
      case 'xhdz':
        console.log('xhdz');
        var joke_id=this.state.joke_id;//id
        if(joke_id!=null){
          this.drow(joke_id);
        }
        // if(this.state.nosetId!=null)
        //     this.state.nosetIdDisplay="none";
        var prize_level="笑话段子";
        var prize_name="笑话段子";
        var prize_percent='';
        if(!this.checkLevel(prize_name,prize_percent)){
          return false;
        }
        var prize_num=0;
        var limit="";
        var smsContent="";
        var params={
          "activityId":this.state.prizeData.activityId,
          "prizeType":"笑话",
          "id":joke_id,
          "prizeLevel":7,
          "prizeName":prize_name,
          "prizeNum":prize_num,
          "prizePercent":prize_percent,
          "marketId":this.state.prizeData.id,
          "smsContent":smsContent,
          "prize_images":"custom.jpg",
          "type":this.state.prizeData.type
        };

        if(limit!=""){
          limit="中"+limit+"次";
        }else{
          limit="不限制";
        }
        $.ajax({
          type: apienv=='local'?'GET':'POST',
          url: apienv=='local'?apimap[apienv]['MarketingMeansSet2Savegenx']:apimap[apienv]['MarketingMeansSet2Savegenx'],
          data: apienv=='local'?params:params,
          dataType: 'json',
          async: false,
          success: (json)=>{
            if(json.rlt==0){
              //addRow("流量",json.id,prize_level,prize_name,prize_num,prize_percent,limit,smsContent);
              this.reloadThis();
            }else{
              Dialog.alert({
                content:json.txt
              })
              this.reloadThis();
            }
          },
          error: (xhr, status, error)=>{
            console.log('xhr=',xhr,' status=',status,' error=',error);
          }
        });
        break;
      case 'zdyjp':
        console.log('zdyjp');

        var custom_id="";//id
        if(custom_id!=null&&custom_id!=""){
          this.drow(custom_id);
        }
        // if(document.getElementById("nosetId")!=null)
        //   document.getElementById("nosetId").style.display="none";
        var prize_level=this.state.zdyjpLevel;
        var prize_name=this.state.zdyjpPrizeName;
        if(prize_name==""){
          Dialog.alert({content:"活动名称不能为空！"});
          return;
        }
        var prize_level_name=this.getLevelName(prize_level);
        if(this.state.ifedit=="2"){
          var prize_percent=this.state.zdyjpPrizeGailv;
        }
        if(!this.checkLevel(prize_level,prize_percent)){
          return false;
        }
        var image="custom.jpg";
        var custom_prize_image=this.state.zdyjpPictureUrl;
        if(custom_prize_image!=null&&custom_prize_image!=""){
          image=custom_prize_image;
        }
        var prize_num=this.state.zdyjpPrizeNum;
        if(prize_num==''||prize_num==null||!(/(^[1-9]\d*$)/.test(prize_num))){
          Dialog.alert({content:"奖品数量不能为空，且必须为整数"});
          return;
        }
        var limit=this.state.yhqPrizeLimit;
        var smsContent="";
        // if(document.getElementById("custom_issendsms").checked==true)
        //   smsContent=$("#custom_templateSms").val();
        var flag=0;
        //if(document.getElementById("custom_issend_memo").checked==true){
        flag=this.state.flagColor;
        //}
        var getawardinfo="";
        for(let i=0;i<this.state.awardInfo.length;i++){
          if(this.state.awardInfo[i]=="wangwang"){
            getawardinfo=getawardinfo+"1,"
          }else if(this.state.awardInfo[i]=="phoneNum"){
            getawardinfo=getawardinfo+"2,"
          }else if(this.state.awardInfo[i]=="zfbNum"){
            getawardinfo=getawardinfo+"3,"
          }else if(this.state.awardInfo[i]=="address"){
            getawardinfo=getawardinfo+"4,"
          }else if(this.state.awardInfo[i]=="realName"){
            getawardinfo=getawardinfo+"5,"
          }
        }
        var lqlianjie=this.state.awardUrl;
        // $("#fadesll").show();
        var params={
          "activityId":this.state.prizeData.activityId,
          "prizeType":"自定义",
          "id":custom_id,
          "prizeLevel":prize_level,
          "prizeLeveold":this.state.levert,
          "prizeName":prize_name,
          "prizeNum":prize_num,
          "limit":limit,
          "prizePercent":prize_percent,
          "marketId":this.state.prizeData.id,
          "smsContent":smsContent,
          "prize_images":image,
          "flag":flag,
          "remarks":lqlianjie,
          "remarksContent":this.state.flagContent,
          "getawardinfo":getawardinfo,
          "type":this.state.prizeData.type
        };
        if(limit!=""){
          limit="中"+limit+"次";
        }else{
          limit="不限制";
        }
        $.ajax({
          type: apienv=='local'?'GET':'POST',
          url: apienv=='local'?apimap[apienv]['MarketingMeansSet2Savegenx']:apimap[apienv]['MarketingMeansSet2Savegenx'],
          data: apienv=='local'?params:params,
          dataType: 'json',
          async: false,
          success: (json)=>{
            if(json.rlt==0){
              this.reloadThis();
            }else{
              Dialog.alert({
                content:json.txt
              })
              this.reloadThis();
            }
          },
          error: (xhr, status, error)=>{
            console.log('xhr=',xhr,' status=',status,' error=',error);
          }
        });
        break;
      default:
        console.log('其他奖项,return');
        return
    }
    // e.preventDefault();
    // this.field.validate((errors, value) => {
    //     if (errors) {
    //         return;
    //     }
    // });
  }
  addRow=(prizeType,id,prize_level,prize_name,prize_num,prize_percent,limit,smsContent)=>{

    var rows = this.state.prizeData.telechargeDrawList1.length;
    var ids =this.state.prizeData.telechargeDrawList1[rows];
    var ss=true;
    while(ss){
      if(ids==undefined){
        ss=false;
      }else{
        rows++;
        // ids =$("#prizepercent_"+rows).val();
      }
    }
    if(rows<8){
      // var rowObj = tableObj.insertRow(-1);
      // rowObj.setAttribute("id","newRows"+id);
      // rowObj.setAttribute("align","center");
      // var cellObj1 = rowObj.insertCell(-1);
      // var cellObj2 = rowObj.insertCell(-1);
      // var cellObj3 = rowObj.insertCell(-1);
      // //var cellObj4 = rowObj.insertCell(-1);
      // var cellObj5 = rowObj.insertCell(-1);
      // var cellObj6 = rowObj.insertCell(-1);
      // var cellObj7 = rowObj.insertCell(-1);
      // cellObj3.id='djbl_'+rows;
      // var prize_level_name=this.getLevelName(prize_level);
      // cellObj1.innerHTML = "<tr align='center'><td align='center'>"+prize_level_name+"<input type='hidden' id='prizeType"+rows+"' value='"+prizeType+"'/><input type='hidden' name='lever_draw' value='"+prize_level_name+"'/><input type='hidden' id='id"+rows+"' value='"+id+"'/><input type='hidden' id='level"+rows+"' value='"+prize_level+"' /><input type='hidden' id='name"+rows+"' value='"+prize_name+"' /><input type='hidden' id='percent"+rows+"' name='percent_draw' value='"+prize_percent+"'/><input type='hidden' id='prizeNum"+rows+"' value='"+prize_num+"'/><input type='hidden' id='limit"+rows+"' value='"+limit+"'/><input type='hidden' id='smsContent"+rows+"' value='"+smsContent+"'/></td>";
      // cellObj2.innerHTML="<td align='center'>"+prize_name+"</td>";
      // cellObj3.innerHTML="<td align='center'><a href='#' class='cj_btn_eidt'>"+prize_num+"</a></td>";
      // cellObj5.innerHTML="<td align='center'><a href='#' class='cj_btn_eidt'>"+prizeType+"</a></td>";
      // cellObj6.innerHTML="<td align='center'><a href='#' class='cj_btn_eidt'>"+limit+"</a></td>";
      // cellObj7.innerHTML="<td align='center'><div class='operate' style='display:block;'> <a href='javascript:void(0)' title='编辑' onclick='editRow("+rows+")' class='col_096f'>编辑</a><a href='javascript:void(0)' onclick='delet("+rows+")' title='删除' class='col_096f'> 删除</a></div></td> </tr>";
    }else{
      Dialog.alert({content:"最多可新增7个奖品",title:"提示"});
    }
    // var row=tableObj.rows;
  }
  //wyh
  onCpLevelChange=(value)=>{
    this.setState({
      cpLevel:value
    })
  }
  onLlqbLevelChange=(value)=>{
    this.setState({
      llqbLevel:value
    })
  }
  onSjhfLevelChange=(value)=>{
    this.setState({
      sjhfLevel:value
    })
  }
  onHbLevelChange=(value)=>{
    this.setState({
      hbLevel:value
    })
  }
  onYhqLevelChange=(value)=>{
    this.setState({
      yhqLevel:value
    })
  }
  onZdyjpLevelChange=(value)=>{
    this.setState({
      zdyjpLevel:value
    })
  }
  onCpTypeChange=(value)=>{
    this.setState({
      cpType:value
    })
  }
  onSjhfTypeChange=(value)=>{
    this.setState({
      sjhfType:value
    })
  }
  onYhqTypeChange=(value)=>{
    this.setState({
      yhqType:value
    })
  }
  onCpPrizeNumChange=(value)=>{
    this.setState({
      cpPrizeNum:value
    })
  }
  onLlqbPrizeNumChange=(value)=>{
    this.setState({
      llqbPrizeNum:value
    })
  }
  onSjhfPrizeNumChange=(value)=>{
    this.setState({
      sjhfPrizeNum:value
    })
  }
  onHbConfine=(value)=>{
    this.setState({
      radioLimit:value
    })
  }
  onHbPrizeNumChange=(value)=>{
    this.setState({
      hbPrizeNum:value
    })
  }
  onYhqPrizeNumChange=(value)=>{
    this.setState({
      yhqPrizeNum:value
    })
  }
  onZdyjpPrizeNumChange=(value)=>{
    this.setState({
      zdyjpPrizeNum:value
    })
  }
  onZdyjpNameChange=(value)=>{
    this.setState({
      zdyjpPrizeName:value
    })
  }
  onCpPrizeGailvChange=(value)=>{
    this.setState({
      cpPrizeGailv:value
    })
  }

  onLlqbPrizeGailvChange=(value)=>{
    this.setState({
      llqbPrizeGailv:value
    })
  }
  onSjhfPrizeGailvChange=(value)=>{
    this.setState({
      sjhfPrizeGailv:value
    })
  }
  onHbPrizeGailvChange=(value)=>{
    this.setState({
      hbPrizeGailv:value
    })
  }
  onYhqPrizeGailvChange=(value)=>{
    this.setState({
      yhqPrizeGailv:value
    })
  }
  onZdyjpPrizeGailvChange=(value)=>{
    this.setState({
      zdyjpPrizeGailv:value
    })
  }
  onCpPrizeLimitChange=(value)=>{
    this.setState({
      cpPrizeLimit:value
    })
  }
  onLlqbPrizeLimitChange=(value)=>{
    this.setState({
      llqbPrizeLimit:value
    })
  }
  onSjhfPrizeLimitChange=(value)=>{
    this.setState({
      sjhfPrizeLimit:value
    })
  }
  onHbPrizeLimitChange=(value)=>{
    this.setState({
      hbPrizeLimit:value
    })
  }
  onYhqPrizeLimitChange=(value)=>{
    this.setState({
      yhqPrizeLimit:value
    })
  }
  onZdyjpPrizeLimitChange=(value)=>{
    this.setState({
      zdyjpPrizeLimit:value
    })
  }

  onLlqbPictureUrlChange=(value)=>{
    this.setState({
      llqbPictureUrl:value
    })
  }
  onSjhfPictureUrlChange=(value)=>{
    this.setState({
      sjhfPictureUrl:value
    })
  }
  onHbPictureUrlChange=(value)=>{
    this.setState({
      hbPictureUrl:value
    })
  }
  onZdyjpPictureUrlChange=(value)=>{
    this.setState({
      zdyjpPictureUrl:value
    })
  }
  onLiuLimitChange=(value)=>{
    this.setState({
      liuLimit:value
    })
  }
  onHbPriceChange=(value)=>{
    this.setState({
      hbPrice:value
    })
  }
  onYhqPriceChange=(value,item)=>{
    this.setState({
      yhqPrice:value,
      yhqLabel:item.label
    })
  }
  onAwardUrlChange=(value)=>{
    this.setState({
      awardUrl:value
    })
  }
  onAwardInfoChange=(value)=>{
    console.log(value);
    this.setState({
      awardInfo:value
    })
  }
  onFlagColorChange=(value)=>{
    this.setState({
      flagColor:value
    })
  }
  onFlagContentChange=(value)=>{
    this.setState({
      flagContent:value
    })
  }
  yhqSelect(){
    if(this.state.AwardList.length>0){
      return ( <Select placeholder='请选择优惠券' onChange={this.onYhqTypeChange} value={this.state.yhqType} style={{ width: '180px' }}>
          <Option value={0}>店铺优惠券</Option>
        </Select>
      )
    }else{
      return ( <div>
        <Select placeholder='请选择优惠券' onChange={this.onYhqTypeChange} value={this.state.yhqType} style={{ width: '180px' }}>
          <Option value={0}>店铺优惠券</Option>
        </Select>
        <a className="creatA" href="https://smf.taobao.com/index.htm?spm=a1z5d.7629074.1998343224.1.6dafbbebSJfXdp&amp;menu=yhkq&amp;module=yhkq" target="_blank">去创建优惠券</a>
      </div>)
    }
  }

  render() {
    const init = this.field.init;
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    if (this.state.type == 5) {
      console.log("this.state.marketId"+this.state.marketId);
      console.log('彩票')
      return (
        <div>
          <FormItem label='奖项：' {...formItemLayout}>
            <Select placeholder='请选择奖项' onChange={this.onCpLevelChange} value={this.state.cpLevel} style={{ width: '180px' }}>
              <Option value={1}>一等奖</Option>
              <Option value={2}>二等奖</Option>
              <Option value={3}>三等奖</Option>
              <Option value={4}>四等奖</Option>
              <Option value={5}>五等奖</Option>
              <Option value={6}>六等奖</Option>
            </Select>
          </FormItem>
          <FormItem label='选择彩票种类：' {...formItemLayout}>
            <div style={{height:'28px',lineHeight:'28px'}}>
              <Select placeholder='请选择彩票种类' onChange={this.onCpTypeChange} value={this.state.cpType} style={{float:'left',width: '180px' }}>
                <Option value="双色球">双色球</Option>
                {/*<Option value='daletou'>大乐透</Option>*/}
                {/*<Option value='guaguale'>刮刮乐</Option>*/}
              </Select>
              <div className='ml5' style={{float:'left',height:'28px',lineHeight:'28px'}}>
                <Button style={{fontSize:'14px'}} component='a' href='http://caipiao.taobao.com/lottery/present/setting.htm?spm=0.0.0.0.7VWy1a' target='_blank' type='primary' shape='text'>去开通支付宝代扣协议</Button>
              </div>
            </div>
            <div className='mt5' style={{fontSize:'12px'}}>注:必须先开通支付宝代扣协议，抽中即时从支付宝扣款出票。账户金额不足时，会在补足金额后自动扣款出票。</div>
          </FormItem>
          <FormItem {...formItemLayout} label='奖品数量：'>
            <Input style={{ width: '60px' }} onChange={this.onCpPrizeNumChange} value={this.state.cpPrizeNum}/><span style={{ color: 'red' }} className='ml5'>*</span><span className='ml5'>(必填)</span>
          </FormItem>
          <FormItem {...formItemLayout} label='中奖概率：' style={{display:this.state.allPrizeGailv}}>
            <div >
              <Input style={{float:'left',height:'28px',lineHeight:'28px', width: '60px' }} onChange={this.onCpPrizeGailvChange} value={this.state.cpPrizeGailv}/>
              <span style={{float:'left',height:'28px',lineHeight:'28px'}} className='ml5'>%</span>
              <div className='ml5' style={{float:'left',height:'28px',lineHeight:'28px'}}>
                <span className='zhongjianggailvtext' style={{marginTop:'0px'}}>您最大还可以填写{this.state.restGailv}%&nbsp;(&nbsp;0表示不能被抽中，除0外最小的是0.001%&nbsp;)</span>
              </div>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label='奖品限制：'>
            <div>
                        <span style={{float:'left',height:'28px',lineHeight:'28px'}}>
                            每人最多中此奖<Input className='ml5 mr5' style={{ width: '60px' }} onChange={this.onCpPrizeLimitChange} value={this.state.cpPrizeLimit}/>次。
                        </span>
              <span style={{float:'left',height:'28px',lineHeight:'28px'}} className='ml5'>(每个ID最多中此奖品几次，不填写，则为不限制)</span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} size='large' label=''>
            <Button type='primary' onClick={this.handleSubmit.bind(this,'cp')}>保存奖品</Button>
            <Button className='ml10' onClick={this.props.onCreatePrizeClose}>取消</Button>
          </FormItem>
        </div>
      )
    }
    if (this.state.type == 0) {
      console.log('流量钱包');
      return (<div>
        <FormItem label='奖项：' {...formItemLayout}>
          <Select placeholder='请选择奖项' onChange={this.onLlqbLevelChange} value={this.state.llqbLevel} style={{ width: '180px' }}>
            <Option value={1}>一等奖</Option>
            <Option value={2}>二等奖</Option>
            <Option value={3}>三等奖</Option>
            <Option value={4}>四等奖</Option>
            <Option value={5}>五等奖</Option>
            <Option value={6}>六等奖</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label='奖品数量：'>
          <Input style={{ width: '180px' }} onChange={this.onLlqbPrizeNumChange} value={this.state.llqbPrizeNum}/><span className='ml5 color-red'>*</span>
          <a className='ml5' href="https://partner.aliqin.tmall.com/center.htm?spm=a210m.7789807.0.0.OyYBuo" target="_blank">
            <Button className='ml5' type='primary' shape='text'>
              去充值
            </Button>
          </a>
        </FormItem>
        <FormItem {...formItemLayout} label='中奖概率：' style={{display:this.state.allPrizeGailv}}>
          <div >
            <Input style={{float:'left',height:'28px',lineHeight:'28px', width: '60px' }} onChange={this.onLlqbPrizeGailvChange} value={this.state.llqbPrizeGailv}/>
            <span style={{float:'left',height:'28px',lineHeight:'28px'}} className='ml5'>%</span><span style={{float:'left'}} className='ml5 color-red'>*</span>
            <div className='ml5' style={{float:'left',height:'28px',lineHeight:'28px'}}>
              <span className='zhongjianggailvtext' style={{marginTop:'0px'}}>您最大还可以填写{this.state.restGailv}%&nbsp;(&nbsp;0表示不能被抽中，除0外最小的是0.001%&nbsp;)</span>
            </div>
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label='奖品限制：'>
                    <span>每人最多中此奖
                        <Input className='ml5 mr5' style={{ width: '60px' }} onChange={this.onLlqbPrizeLimitChange} value={this.state.llqbPrizeLimit}/>
                        次。
                    </span>
          <span className='ml5'>(每个ID最多中此奖品几次，不填写，则为不限制)</span>
        </FormItem>

        <FormItem {...formItemLayout} label='流量面额：'>
          <span><Input style={{ width: '120px' }} onChange={this.onLiuLimitChange} value={this.state.liuLimit}/><span className='ml5'>M</span><span className='ml5'>(0.12元/M)</span></span>
        </FormItem>

        <FormItem {...formItemLayout} label='奖品展示图片链接：' >
                    <span>
                        <Input style={{ width: '180px' }} onChange={this.onLlqbPictureUrlChange} value={this.state.llqbPictureUrl}/><span className='ml10'>(非必填)</span>
                        <div>
                            <span className='tupianzhanshitext'>仅支持淘宝空间图片链接,尺寸165*141px</span>
                             <a className='tupianzhanshibtn' href="http://tadget.taobao.com/redaction/manager.htm" target="_blank">
                                    <Button type='primary' shape='text'>
                                        去复制
                                    </Button>
                                </a>
                        </div>
                    </span>
        </FormItem>
        <FormItem {...formItemLayout} size='large' label=''>
          <Button type='primary' onClick={this.handleSubmit.bind(this,'llqb')}>保存奖品</Button>
          <Button className='ml10' onClick={this.props.onCreatePrizeClose}>取消</Button>
        </FormItem>
      </div>)
    }
    if (this.state.type == 1) {
      console.log('手机话费');
      return (
        <div>
          <FormItem label='奖项：' {...formItemLayout}>
            <Select placeholder='请选择奖项' onChange={this.onSjhfLevelChange} value={this.state.sjhfLevel} style={{ width: '180px' }}>
              <Option value={1}>一等奖</Option>
              <Option value={2}>二等奖</Option>
              <Option value={3}>三等奖</Option>
              <Option value={4}>四等奖</Option>
              <Option value={5}>五等奖</Option>
              <Option value={6}>六等奖</Option>
            </Select>
          </FormItem>
          <FormItem label='选择话费：' {...formItemLayout}>
            <Select placeholder='请选择话费类型' onChange={this.onSjhfTypeChange} value={this.state.sjhfType} style={{ float:'left',height:'28px',lineHeight:'28px',width: '180px' }}>
              <Option value={100}>100元</Option>
              <Option value={50}>50元</Option>
              <Option value={30}>30元</Option>
              <Option value={10}>10元</Option>
            </Select>
            <div style={{float:'left',height:'28px',lineHeight:'28px'}}>
              <span className='ml5 color-red'>*</span>
              <span className='ml5'>
                                <Button className='ml5' type='primary' shape='text'>
                                    去充值
                                </Button>
                            </span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label='奖品数量：'>
            <Input style={{ width: '60px' }} onChange={this.onSjhfPrizeNumChange} value={this.state.sjhfPrizeNum}/><span className='ml5' style={{ color: 'red' }}>*</span><span className='ml5'>(必填)</span>
          </FormItem>
          <FormItem {...formItemLayout} label='中奖概率：' style={{display:this.state.allPrizeGailv}}>
            <div>
              <Input style={{float:'left',height:'28px',lineHeight:'28px', width: '60px' }} onChange={this.onSjhfPrizeGailvChange} value={this.state.sjhfPrizeGailv}/>
              <span style={{float:'left',height:'28px',lineHeight:'28px', color:'red'}} className='ml5'>*</span>
              <span style={{float:'left',height:'28px',lineHeight:'28px'}} className='ml5'>%</span>
              <div className='ml5' style={{float:'left',height:'28px',lineHeight:'28px'}}>
                <span className='zhongjianggailvtext' style={{marginTop:'0px'}}>您最大还可以填写{this.state.restGailv}%&nbsp;(&nbsp;0表示不能被抽中，除0外最小的是0.001%&nbsp;)</span>
              </div>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label='奖品限制：'>
            <span>每人最多中此奖<Input style={{ width: '60px' }} onChange={this.onSjhfPrizeLimitChange} value={this.state.sjhfPrizeLimit}/>次</span>
          </FormItem>
          <FormItem {...formItemLayout} label='奖品展示图片链接：' >
                        <span>
                            <Input style={{ width: '180px' }} onChange={this.onSjhfpictureChange} value={this.state.sjhfPicture}/><span className='ml10'>(非必填)</span>
                            <div>
                                <span className='tupianzhanshitext'>仅支持淘宝空间图片链接,尺寸165*141px</span>
                                <a className='tupianzhanshibtn' href="http://tadget.taobao.com/redaction/manager.htm" target="_blank">
                                    <Button type='primary' shape='text'>
                                        去复制
                                    </Button>
                                </a>
                            </div>
                        </span>
          </FormItem>
          <FormItem {...formItemLayout} size='large' label=''>
            <Button type='primary' onClick={this.handleSubmit.bind(this,'sjhf')}>保存奖品</Button>
            <Button className='ml10' onClick={this.props.onCreatePrizeClose}>取消</Button>
          </FormItem>
        </div>
      )
    }
    if (this.state.type == 2) {
      console.log('红包');
      console.log(this.state.hbData);
      return (<div>
        <FormItem label='奖项：' {...formItemLayout}>
          <Select placeholder='请选择奖项' onChange={this.onHbLevelChange} value={this.state.hbLevel} style={{ width: '180px' }}>
            <Option value={1}>一等奖</Option>
            <Option value={2}>二等奖</Option>
            <Option value={3}>三等奖</Option>
            <Option value={4}>四等奖</Option>
            <Option value={5}>五等奖</Option>
            <Option value={6}>六等奖</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label='奖品展示图片链接：' >
                            <span>
                                <Input style={{ width: '180px' }} onChange={this.onHbPictureUrlChange} value={this.state.hbPictureUrl}/><span className='ml10'>(非必填)</span>
                                <div>
                                    <span className='tupianzhanshitext'>仅支持淘宝空间图片链接,尺寸165*141px</span>
                                    <a className='tupianzhanshibtn' href="http://tadget.taobao.com/redaction/manager.htm" target="_blank">
                                        <Button type='primary' shape='text'>
                                            去复制
                                        </Button>
                                    </a>
                                </div>
                            </span>
        </FormItem>
        <FormItem {...formItemLayout} label='奖品数量：'>
          <RadioGroup onChange={this.onHbConfine} value={this.state.radioLimit}>
            <Radio id='hbRadioLimitNo' value={0}>不限量</Radio>
            <Radio id='hbRadioLimit' value={1}>限量</Radio>
          </RadioGroup>
          <Input className='ml10' style={{ width: '60px' }} onChange={this.onHbPrizeNumChange} value={this.state.hbPrizeNum}/>
        </FormItem>
        <FormItem {...formItemLayout} label='中奖概率：' style={{display:this.state.allPrizeGailv}}>
          <div >
            <Input style={{float:'left',height:'28px',lineHeight:'28px', width: '60px' }} onChange={this.onHbPrizeGailvChange} value={this.state.hbPrizeGailv}/>
            <span style={{float:'left',height:'28px',lineHeight:'28px', color:'red'}} className='ml5'>*</span>
            <span style={{float:'left',height:'28px',lineHeight:'28px'}} className='ml5'>%</span>
            <div className='ml5' style={{float:'left',height:'28px',lineHeight:'28px'}}>
              <span className='zhongjianggailvtext' style={{marginTop:'0px'}}>您最大还可以填写{this.state.restGailv}%&nbsp;(&nbsp;0表示不能被抽中，除0外最小的是0.001%&nbsp;)</span>
            </div>
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label='奖品限制：'>
          <span>每人最多中此奖<Input className='ml5 mr5' style={{ width: '60px' }} onChange={this.onHbPrizeLimitChange} value={this.state.hbPrizeLimit}/>次。</span>
          <span className='ml5'>(每个ID最多中此奖品几次，不填写，则为不限制)</span>
        </FormItem>
        <FormItem {...formItemLayout} label='红包金额：'>
          {/*<Input value={this.state.prizetype_div_val} htmlType="hidden" />*/}
          {(this.state.hbData==null)?null:
            (this.state.hbData.code==-1)?
              <span style={{lineHeight:'28px',color: 'red'}}>{this.state.hbData.txt}</span>
              :
              (this.state.hbData.code==-2)?
                <a href="https://ecrm.taobao.com/benefit/benefit_summary_list.htm?spm=a1z5o.7701556.0.0.jWjJii" target="_blank" style={{lineHeight:'28px'}}>去签约红包</a>
                :
                (this.state.hbData.code==0)?
                  <div>
                    <div style={{align:'right',float:'left',lineHeight:'28px',height:'28px'}}>选择红包模板：</div>
                    <Select className="dropdown" id="red_prize_award" style={{width:'180px'}} onChange={this.onHbPriceChange} value={this.state.hbPrice}>
                      {
                        this.state.hbData.AwardList.map((item,index)=>{
                          return (<Option key={index} value={index }>{item.name}</Option>)
                        })
                      }
                    </Select>
                  </div>
                  :
                  null
          }
          <div className='mt5' style={{color:'#FFAF1C'}}>注意：红包是在支付宝收银台付款时使用的，无使用条件，并且是可以叠加使用的哦！</div>
        </FormItem>
        <FormItem {...formItemLayout} size='large' label=''>
          <Button type='primary' onClick={this.handleSubmit.bind(this,'hb')}>保存奖品</Button>
          <Button className='ml10' onClick={this.props.onCreatePrizeClose}>取消</Button>
        </FormItem>
      </div>)
    }
    if (this.state.type == 6) {
      console.log('优惠券');
      return (
        <div>
          <FormItem label='奖项：' {...formItemLayout}>
            <Select placeholder='请选择奖项' onChange={this.onYhqLevelChange} value={this.state.yhqLevel} style={{ width: '180px' }}>
              <Option value={1}>一等奖</Option>
              <Option value={2}>二等奖</Option>
              <Option value={3}>三等奖</Option>
              <Option value={4}>四等奖</Option>
              <Option value={5}>五等奖</Option>
              <Option value={6}>六等奖</Option>
            </Select>
          </FormItem>
          <FormItem label='优惠券：' {...formItemLayout}>
            <Select placeholder='请选择优惠券' onChange={this.onYhqTypeChange} value={this.state.yhqType} style={{ width: '180px' }}>
              {
                this.state.AwardList.map(function (item,index) {
                  return (<Option value={item.awardInstId} key={index}>{item.name}</Option>)
                })
              }
            </Select>
            {
              (this.state.AwardList.length==0)?
                <a style={{paddingLeft:6}} href="https://smf.taobao.com/index.htm?spm=a1z5d.7629074.1998343224.1.6dafbbebSJfXdp&amp;menu=yhkq&amp;module=yhkq" target="_blank">去创建优惠券</a>
                :null
            }
          </FormItem>
          <FormItem label='优惠券面额：' {...formItemLayout}>
            <Select placeholder='请选择优惠券面额' onChange={this.onYhqPriceChange} value={this.state.yhqPrice} style={{width: '180px'}} >
              {
                this.state.AwardList.map(function (item,index) {
                  return (<Option value={item.awardInstId} key={index}>{item.awardPrice/100+item.currency}</Option>)
                })
              }
              {/*<Option value={3}>3元</Option>*/}
              {/*<Option value={5}>5元</Option>*/}
              {/*<Option value={10}>10元</Option>*/}
              {/*<Option value={20}>20元</Option>*/}
              {/*<Option value={30}>30元</Option>*/}
              {/*<Option value={50}>50元</Option>*/}
              {/*<Option value={100}>100元</Option>*/}
              {/*<Option value={200}>200元</Option>*/}
            </Select>
          </FormItem>
          <FormItem {...formItemLayout} label='奖品数量：'>
            <Input style={{ width: '60px' }} onChange={this.onYhqPrizeNumChange} value={this.state.yhqPrizeNum}/><span className='ml5' style={{ color: 'red' }}>*</span><span className='ml5'>(必填)</span>
          </FormItem>
          <FormItem {...formItemLayout} label='中奖概率：' style={{display:this.state.allPrizeGailv}}>
            <div>
              <Input style={{float:'left',height:'28px',lineHeight:'28px', width: '60px' }} onChange={this.onYhqPrizeGailvChange} value={this.state.yhqPrizeGailv}/>
              <span style={{float:'left',height:'28px',lineHeight:'28px', color:'red'}} className='ml5'>*</span>
              <span style={{float:'left',height:'28px',lineHeight:'28px'}} className='ml5'>%</span>
              <div className='ml5' style={{float:'left',height:'28px',lineHeight:'28px'}}>
                <span className='zhongjianggailvtext' style={{marginTop:'0px'}}>您最大还可以填写{this.state.restGailv}%&nbsp;(&nbsp;0表示不能被抽中，除0外最小的是0.001%&nbsp;)</span>
              </div>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label='奖品限制：'>
            <span>每人最多中此奖<Input className='ml5 mr5' style={{ width: '60px' }} onChange={this.onYhqPrizeLimitChange} value={this.state.yhqPrizeLimit}/>次。</span>
            <span className='ml5'>(每个ID最多中此奖品几次，不填写，则为不限制)</span>
          </FormItem>
          <FormItem {...formItemLayout} size='large' label=''>
            <Button type='primary' onClick={this.handleSubmit.bind(this,'yhq')}>保存奖品</Button>
            <Button className='ml10' onClick={this.props.onCreatePrizeClose}>取消</Button>
          </FormItem>
        </div>
      )
    }
    if (this.state.type == 3) {
      console.log('笑话段子');
      return (<div>
        <FormItem {...formItemLayout} label=''>
          <div>
            <div style={{color:'#757575'}}>未中奖用户都发此奖品</div>
            <div className='mt5' style={{color:'#757575'}}>系统提供了上千条笑话段子模板，随机发送。无需掌柜设置模板</div>
          </div>
        </FormItem>
        <FormItem {...formItemLayout} size='large' label=''>
          <Button type='primary' onClick={this.handleSubmit.bind(this,'xhdz')}>保存奖品</Button>
          <Button className='ml10' onClick={this.props.onCreatePrizeClose}>取消</Button>
        </FormItem>
      </div>)
    }
    if (this.state.type == 4) {
      console.log('自定义奖品');
      return (<div>
        <FormItem label='奖项等级：' {...formItemLayout}>
          <Select placeholder='请选择奖项' onChange={this.onZdyjpLevelChange} value={this.state.zdyjpLevel} style={{ width: '180px' }}>
            <Option value={1}>一等奖</Option>
            <Option value={2}>二等奖</Option>
            <Option value={3}>三等奖</Option>
            <Option value={4}>四等奖</Option>
            <Option value={5}>五等奖</Option>
            <Option value={6}>六等奖</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label='奖品名称：'>
          <Input style={{ width: '180px' }} onChange={this.onZdyjpNameChange} value={this.state.zdyjpPrizeName}/>
          <span style={{height:'28px',lineHeight:'28px', color:'red'}} className='ml5'>*</span>
        </FormItem>
        <FormItem {...formItemLayout} label='奖品数量：'>
          <Input style={{ width: '60px' }} onChange={this.onZdyjpPrizeNumChange} value={this.state.zdyjpPrizeNum}/>
        </FormItem>
        <FormItem {...formItemLayout} label='中奖概率：' style={{display:this.state.allPrizeGailv}}>
          <div >
            <Input style={{float:'left',height:'28px',lineHeight:'28px', width: '60px' }} onChange={this.onZdyjpPrizeGailvChange} value={this.state.zdyjpPrizeGailv}/>
            <span style={{float:'left',height:'28px',lineHeight:'28px', color:'red'}} className='ml5'>*</span>
            <span style={{float:'left',height:'28px',lineHeight:'28px'}} className='ml5'>%</span>
            <div className='ml5' style={{float:'left',height:'28px',lineHeight:'28px'}}>
              <span className='zhongjianggailvtext' style={{marginTop:'0px'}}>您最大还可以填写{this.state.restGailv}%&nbsp;(&nbsp;0表示不能被抽中，除0外最小的是0.001%&nbsp;)</span>
            </div>
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label='奖品限制：'>
          <span>每人最多中此奖<Input className='ml5 mr5' style={{ width: '60px' }} onChange={this.onZdyjpPrizeLimitChange} value={this.state.zdyjpPrizeLimit}/>次。</span>
          <span className='ml5'>(每个ID最多中此奖品几次，不填写，则为不限制)</span>
        </FormItem>
        <FormItem {...formItemLayout} label='奖品展示图片链接：' >
                    <span>
                        <Input style={{ width: '180px' }} onChange={this.onZdyjpPictureUrlChange} value={this.state.zdyjpPictureUrl}/><span className='ml10'>(非必填)</span>
                        <div>
                            <span className='tupianzhanshitext'>仅支持淘宝空间图片链接,尺寸165*141px</span>
                            <a className='tupianzhanshibtn' href="http://tadget.taobao.com/redaction/manager.htm" target="_blank">
                                <Button type='primary' shape='text'>
                                    去复制
                                </Button>
                            </a>
                        </div>
                    </span>
        </FormItem>
        <FormItem {...formItemLayout} label='领取链接：'>
          <Input className='mr5' style={{ width: '300px' }} onChange={this.onAwardUrlChange} value={this.state.awardUrl}/>
          <span className='ml5'>(非必填，长度为&lt;255)</span>
        </FormItem>
        <div style={{width:'96%',height:'auto',padding:'0',margin:'30px auto 0px auto',border:'1px solid #E1E1E1'}}>
          <Button style={{position:'relative',left:'30px',top:'-15px'}}>实物奖品信息设置</Button>
          <FormItem {...formItemLayout} label='领奖信息：'>
            <div style={{height:'28px',lineHeight:'28px'}}>
              <CheckboxGroup onChange={this.onAwardInfoChange} value={this.state.awardInfo}>
                <Checkbox value='wangwang'>旺旺号</Checkbox>
                <Checkbox value='phoneNum' className='ml20'>手机号码</Checkbox>
                <Checkbox value='zfbNum' className='ml20'>支付宝账号</Checkbox>
                <Checkbox value='address' className='ml20'>收货地址</Checkbox>
                <Checkbox value='realName' className='ml20'>真实姓名</Checkbox>
              </CheckboxGroup>
            </div>
            <span className='tupianzhanshitext'>如奖品为实物，需顾客填写对应信息，才可成功领奖</span>
          </FormItem>
          <FormItem {...formItemLayout} label='备注插旗颜色：'>
            <Select placeholder='请选择奖项' onChange={this.onFlagColorChange} value={this.state.flagColor} style={{ float:'left',width: '120px' }}>
              <Option value={0}>无备注</Option>
              <Option value={1}>红色</Option>
              <Option value={2}>黄色</Option>
              <Option value={3}>绿色</Option>
              <Option value={4}>蓝色</Option>
              <Option value={5}>粉红色</Option>
            </Select>
            <span className='tupianzhanshitext ml10' style={{marginTop:'0px'}}>只针对开始满就送，买就送</span>
          </FormItem>
          <FormItem {...formItemLayout} label='备注内容：'>
            <Input style={{ width: '300px' }} onChange={this.onFlagContentChange} value={this.state.flagContent}/>
          </FormItem>
        </div>
        <FormItem {...formItemLayout} size='large' label='' style={{marginTop:'10px'}}>
          <Button type='primary' onClick={this.handleSubmit.bind(this,'zdyjp')}>保存奖品</Button>
          <Button className='ml10' onClick={this.props.onCreatePrizeClose}>取消</Button>
        </FormItem>
      </div>)
    }
  }
}
export default EditPrize;

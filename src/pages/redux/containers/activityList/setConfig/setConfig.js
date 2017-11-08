import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';
import Dialog from 'qnui/lib/dialog';
import Select from 'qnui/lib/select';
import Search from 'qnui/lib/search';
import Range from 'qnui/lib/range';
import Balloon from 'qnui/lib/balloon';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import TimePicker from 'qnui/lib/time-picker';
import NumberPicker from 'qnui/lib/number-picker';
import Field from 'qnui/lib/field';
import Table from 'qnui/lib/table';
import Switch from 'qnui/lib/switch';
import Upload from 'qnui/lib/upload';
import { Row, Col } from 'qnui/lib/grid';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/setConfig';
import Menu from 'qnui/lib/menu';
import Tab from 'qnui/lib/tab';
import Breadcrumb from 'qnui/lib/breadcrumb';
import Icon from 'qnui/lib/icon';
import Step, { Item as StepItem } from 'qnui/lib/step';
import Pagination from 'qnui/lib/pagination';
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';
import LinkTool from 'utils/linkTools';
import Tools from 'utils/index';
import $ from 'jquery';
import apimap from 'utils/apimap';
import './setConfig.scss';
const apienv = window.apienv || 'local';
const SplitButton = Button.Split;
const TabPane = Tab.TabPane;
const { Group: CheckboxGroup } = Checkbox;
const contOne = (<span>设置条件</span>);
const contTwo = (<span>设置奖品</span>);
const contThree = (<span>设置模板</span>);
const contFour = (<span>完成</span>);
const FormItem = Form.Item;
var marnum = 0;
class SetConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ifover:this.props.location.query.ifover,
            reset:this.props.location.query.reset,
            marketingTypeChanged:false,
            result: [],
            data: [],
            showList: [],
            manSendDialogVisible: false,
            maiSendDialogVisible: false,
            pingSendDialogVisible: false,
            fenSendDialogVisible: false,
            value: ['orange'],
            smsPrice: 999,
            a_status: '',
            sms_content_bianji: 'none',
            fullType: 0,
            marnum: 0,
            divEbookList188: 'none',
            easyDialog: 'none',
            marketingTypeChangedClose: 'none',
            type_changed: '',
            div_intoStore_send_user: 'none',
            checkedA: false,
            checkedB: false,
            checkedC: false,
            checkedD: false,
            checkedE: false,
            checkedH: false,
            checkedI: false,
            checkedJ: false,
            checkedF: false,
            checkedG: false,
            activityValue: [],
            d_num_set: false,
            share_all: false,
            share_goods: false,
            sign_send_data: 'block',
            praise: '0',
            optLimit: '0',
            optLimit1: '0',
            optLimit9: '0',
            optLimit11: '0',
            optLimit13: '0',
            optLimit14: '0',
            startTimeDisabled: true,
            endTimeDisabled: true,
            daiziPraiseValue: '',
            manSendType: 'all',
            maiSendType: 'all',
            pingSendType: 'all',
            ifquan: '0',
            ifquanb: '0',
            ifquanp: '0',
            manGoodsData: '',
            maiGoodsData: '',
            pingGoodsData: '',
            fenGoodsData: '',
            manSomeCurrentPage: 1,
            maiSomeCurrentPage: 1,
            pingSomeCurrentPage: 1,
            fenCurrentPage: 1,
            manGoodsids: '',
            manGoodsidsp: '',
            maiGoodsids: '',
            maiGoodsidsp: '',
            pingGoodsids: '',
            pingGoodsidsp: '',
            manCount:'',
            manCountp:'',
            manSearchValue: '',
            maiSearchValue: '',
            pingSearchValue: '',
            addgoodstype: '0',
            manSomeButtonShape: 'text',
            manSomeButtonType: 'normal',
            manSomeButtonContent: '点击排除',
            qusInfoDisplay: 'none',
            itemsData: [],
            list: [],
            usedList: [],
            textCount:0,
            signCount:0,
            totalCount:0,
            smsCount:0,
            lessCount:0,
            shortlinkcheck:'',
            shareGoodsDisplay:false,
            addgoodstypep:'1',
            addgoodstypeb:'1',
            searchValue:'',
            defaultManSendCallback:'1',
            defaultMaiSendCallback:'1',
            defaultPingSendCallback:'1',
            manGoodsInfop:[],
            manGoodsInfox:[],
            maiGoodsInfop:[],
            maiGoodsInfox:[],
            pingGoodsInfop:[],
            pingGoodsInfox:[],
        };
        this.field = new Field(this);
        // this.onActivityChange = this.onActivityChange.bind(this);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    componentDidMount() {
        if(apienv != 'local'){
            $.post(apimap[apienv]['MarketingMeansSetgenx'],this.props.location.query, function (result) {
                this.smscat=0;
                let resultData = result;
                this.setState({
                    result: resultData,
                    marketName: resultData.market.mName
                })
                if (resultData.marketInfo != null){
                    if (resultData.marketInfo.open == true){
                        this.getShortlinkcheck();
                        this.switchBtn(true);
                    }
                }
                if(resultData.marketf!=null){
                    if (resultData.marketf.goodsType == '0'){
                        this.field.setValue('addgoodstype','0');
                        let gids = resultData.marketf.goodsid;
                        // console.log('满就送被选择的商品id:',gids);
                        if (gids != '') {
                            let goodsids = String(gids).split(",");
                            this.setState({
                                manSendType:'some',
                                manGoodsids:'您已选择'+goodsids.length+'个参与宝贝',
                            });
                            this.field.setValue('market_send_goods_ids',gids);
                            this.field.setValue('market_send_goods_idstp',gids);
                        }
                    }else{
                        this.field.setValue('addgoodstype','1')
                        let gids = "";
                        if (resultData.marketf.goodsid != null){
                            gids = resultData.marketf.goodsid;
                        }
                        // console.log('满就送被排除的商品id:',gids);
                        if (gids != '') {
                            let goodsids = String(gids).split(",");
                            this.setState({
                                manSendType:'some',
                                manGoodsidsp:'您已排除'+goodsids.length+'个宝贝'
                            })
                            this.field.setValue('market_send_goods_ids',gids);
                            this.field.setValue('market_send_goods_idstp',gids);
                        }
                    }
                }
                if(resultData.marketm!=null){
                    if (resultData.marketm.goodsType == '0'){
                        this.field.setValue('addgoodstypeb','0')
                        let gids = resultData.marketm.goodsid;
                        // console.log('买就送被选择的商品id:',gids);
                        if (gids != '') {
                            let goodsids = String(gids).split(",");
                            this.setState({
                                maiSendType:'some',
                                maiGoodsids:'您已选择' + goodsids.length + '个参与宝贝'
                            });
                            this.field.setValue('market_send_goods_idsb',gids);
                            this.field.setValue('market_send_goods_idsbtp',gids);
                        }
                    }else{
                        this.field.setValue('addgoodstypeb','1')
                        let gids = "";
                        if (resultData.marketm.goodsid != null){
                            gids = resultData.marketm.goodsid;
                        }
                        // console.log('买就送被排除的商品id:',gids);
                        if (gids != '') {
                            let goodsids = String(gids).split(",");
                            this.setState({
                                maiSendType:'some',
                                maiGoodsidsp:'您已排除'+goodsids.length+'个宝贝'
                            })
                            this.field.setValue('market_send_goods_idsb',gids);
                            this.field.setValue('market_send_goods_idsbtp',gids);
                        }
                    }
                }
                if(resultData.marketp!=null){
                    if (resultData.marketp.goodsType == '0'){
                        this.field.setValue('addgoodstypep','0');
                        var gids = resultData.marketp.goodsid;
                        // console.log('评价送被选择的商品id:',gids);
                        if (gids != '') {
                            var goodsids = String(gids).split(",");
                            this.setState({
                                pingSendType:'some',
                                pingGoodsidsp:'您已排除'+goodsids.length+'个宝贝'
                            })
                            this.field.setValue('market_send_goods_idsp',resultData.marketp.goodsid);
                            this.field.setValue('market_send_goods_idsptp',resultData.marketp.goodsid);
                        }
                    }else{
                        this.field.setValue('addgoodstypep','1');
                        var gids = "";
                        if (resultData.marketp.goodsid != null ){
                            gids = resultData.marketp.goodsid;
                        }
                        // console.log('评价送被排除的商品id:',gids);
                        if (gids != '') {
                            var goodsids = String(gids).split(",");
                            this.setState({
                                pingSendType:'some',
                                pingGoodsids:'您已选择'+goodsids.length+'个宝贝'
                            })
                            this.field.setValue('market_send_goods_idsp',gids);
                            this.field.setValue('market_send_goods_idsptp',gids);
                        }
                    }
                    if ((resultData.marketp.praiseWLimit == '8') && (resultData.marketp.shaituLimit == '') ){
                        this.setState({
                            praise:0
                        })
                    }
                    if (resultData.marketp.praiseWLimit != ''){
                        this.setState({
                            praise:1
                        })
                    }
                }
                if (resultData.marketInfo != null){
                    if (resultData.marketInfo.open == true){
                        this.smscat = 1;
                    }else{
                    }
                }else{
                }
                // $("#sms_template").onKeyUp(this.showTip);
                // $("#sms_template").onKeyDown(this.showTip);
                // $("#sms_template").live('input paste', this.showTip);
                // $("#sms_template").bind('propertychange', this.showTip);
                // $("#sms_sign").onKeyUp(this.showTip);
                // $("#sms_sign").onKeyDown(this.showTip);
                // $("#sms_sign").live('input paste', this.showTip);
                // $("#sms_sign").bind('propertychange', this.showTip);
                this.showTip();
                let newDate = new Date();
                this.field.setValue('marketName', resultData.market.mName);
                this.field.setValue('startDate', Tools.formatDate(resultData.startTime == '' ? newDate : resultData.startTime, 'yyyy-MM-dd'));
                let sD = this.refs.startDate.props.value;
                if (sD != '' && typeof (sD) != 'undefined') {
                    this.setState({
                        startTimeDisabled: false
                    })
                }
                this.field.setValue('startTime', Tools.formatDate(resultData.startTime == '' ? newDate : resultData.startTime, 'hh:mm:ss'));
                this.field.setValue('endDate', Tools.formatDate(resultData.endTime == '' ? newDate : resultData.endTime, 'yyyy-MM-dd'));
                let eD = this.refs.endDate.props.value;
                if (eD != '' && typeof (eD) != 'undefined') {
                    this.setState({
                        endTimeDisabled: false
                    })
                }
                this.field.setValue('endTime', Tools.formatDate(resultData.endTime == '' ? newDate : resultData.endTime, 'hh:mm:ss'));
                this.field.setValue('praiseWLimit', resultData.marketp ? resultData.marketp.praiseWLimit : '');
                this.field.setValue('shaituLimit', resultData.marketp ? resultData.marketp.shaituLimit : '');
                this.field.setValue('sms_template', resultData.smsContent ? resultData.smsContent : '');
                this.field.setValue('sms_sign', resultData.nick_sign ? resultData.nick_sign : '');
                this.field.setValue('intoStore_draw_num', '1');
                this.field.setValue('intoStore_user_type', '1');
                this.field.setValue('brandId', resultData.sellerInfo ? resultData.sellerInfo.brandId : '')
                if(resultData.cjorxg!="xg"){
                    $("#I").attr("checked",'true');
                    document.getElementById("divjin").style.display="block";
                }
                if (resultData.marketf != null) {
                    this.setState({
                        checkedA: true
                    })
                    if (resultData.marketf.optLimit != '0') {
                        this.setState({
                            optLimit: '1'
                        })
                        this.field.setValue('optLimitA', resultData.marketf.optLimit);
                    } else if (resultData.marketf.optLimit == '0') {
                        this.setState({
                            optLimit: '0'
                        })
                        this.field.setValue('optLimitA', '0');
                    }
                    if (resultData.marketf.fullNum != null) {
                        this.field.setValue('manjiu', resultData.marketf.fullNum);
                    }
                    if (resultData.marketf.fullType != null) {
                        this.field.setValue('fullType', resultData.marketf.fullType);
                    }
                    if (resultData.marketf.drawNum != null) {
                        this.field.setValue('manjiu1', resultData.marketf.drawNum);
                    }

                }
                if (resultData.marketm != null) {
                    this.setState({
                        checkedB: true
                    })
                    if (resultData.marketm.optLimit != '0') {
                        this.setState({
                            optLimit1: '1'
                        })
                        this.field.setValue('optLimit2', resultData.marketm.optLimit);
                    } else if (resultData.marketm.optLimit == '0') {
                        this.setState({
                            optLimit1: '0'
                        })
                        this.field.setValue('optLimit2', '0');
                    }
                    if (resultData.marketm.drawNum != null) {
                        this.field.setValue('maijiu1', resultData.marketm.drawNum);
                    }
                }
                if (resultData.marketp != null) {
                    this.setState({
                        checkedC: true
                    })
                    if (resultData.marketp.optLimit != '0') {
                        this.setState({
                            optLimit9: '1'
                        })
                        this.field.setValue('optLimit3', resultData.marketp.optLimit);
                    } else if (resultData.marketp.optLimit == '0') {
                        this.setState({
                            optLimit9: '0'
                        })
                        this.field.setValue('optLimit3', '0');
                    }
                    if (resultData.marketp.drawNum != '0') {
                        this.field.setValue('haoping', resultData.marketp.drawNum);
                    }
                    if (resultData.marketp.praiseWLimit != '0') {
                        this.setState({
                            praise: '1'
                        })
                        this.setState({
                            daiziPraiseValue: resultData.marketp.praiseWLimit
                            // this.field.setValue('praiseWLimit', resultData.marketp.praiseWLimit);
                        })
                    } else {
                        this.setState({
                            praise: '0'
                        })
                        this.setState({
                            daiziPraiseValue: '0'
                            // this.field.setValue('praiseWLimit', '0');
                        })
                    }
                    if (resultData.marketp.filterKeyword != null) {
                        this.field.setValue('filterKeyword', resultData.marketp.filterKeyword ? resultData.marketp.filterKeyword : '系统默认评价,很差,骗人,垃圾,失望,无奈,上当,拙劣,烂,坑爹,质量太差,难看,很破,伤心,再也不来,不值这个价,质量差,质量不行,慎重,太次,粗糙,郁闷,可恶,以防受骗,气人,不敢恭维,太假,不是一般差,差评,中评,便宜没好货,褪色,瑕疵');
                    }
                    if (resultData.marketp.filterKeyword2 != null) {
                        this.field.setValue('filterKeyword2', resultData.marketp.filterKeyword2 ? resultData.marketp.filterKeyword2 : '');
                    }
                    if (resultData.marketp.praiseTnum != null) {
                        this.field.setValue('praiseTnum', resultData.marketp.praiseTnum);
                    }
                }
                if (resultData.drainageIntoStore != null) {
                    this.setState({
                        // checkedI: true,
                        checkedI: true
                    })
                    this.field.setValue('intoStore_draw_num', resultData.drainageIntoStore.drawNum);
                    this.field.setValue('intoStore_user_type', resultData.drainageIntoStore.drainageSet);
                    /* 	if(${resultData.drainageIntoStore.limitNum!=null}){
                            document.getElementById("optLimit2_span6").style.display="block";
                            this.refs.optLimit6").val("1");
                            this.refs.optLimit17").val("${resultData.drainageIntoStore.limitNum}");
                        } */
                    if (resultData.drainageIntoStore.drainageSet == 3) {
                        this.setState({
                            div_intoStore_send_user: 'block'
                        })
                        this.field.setValue('intoStore_send_user', resultData.drainageIntoStore.drainageSet1);
                    }
                }

                /* 		if(${resultData.drainageIntoStore!=null}){
                            //alert(${resultData.drainageIntoStore.drainageSet});
                            this.refs.intoStore_send").attr("checked",'true');//.attr("checked",'true');
                            document.getElementById("into_store_data").style.display="block";
                            this.refs.intoStore_draw_num").val("${resultData.drainageIntoStore.drawNum}");
                            //
                            //this.refs.intoStore_user_type").easyDropDown('select', ${resultData.drainageIntoStore.drainageSet});
                            this.refs.intoStore_user_type").val("${resultData.drainageIntoStore.drainageSet}");
                            if(${resultData.drainageIntoStore.drainageSet==3}){
                                document.getElementById("div_intoStore_send_user").style.display="block";
                            }

                        } */
                if (resultData.market.drawNum != null && resultData.market.drawNum > 0) {
                    this.setState({
                        d_num_set: true
                    })
                    this.field.setValue('d_num_set_num', resultData.market.drawNum);
                }
                if (resultData.drainageShare != null) {
                    this.setState({
                        checkedH: true
                    })
                    this.field.setValue('share_draw_num', resultData.drainageShare.drawNum);
                    if (resultData.drainageShare.drainageSet == 'checked') {
                        this.setState({
                            share_all: true
                        })
                    }
                    if (resultData.drainageShare.drainageSet1 != '' && resultData.drainageShare.drainageSet1 != null) {
                        this.setState({
                            share_goods: true
                        })
                        this.field.setValue('market_send_goods_idsd', resultData.drainageShare.drainageSet1);
                    }
                    if (resultData.drainageIntoStore) {
                        if (resultData.drainageIntoStore.drainageSet == 'checked') {
                            this.setState({
                                share_all: true
                            })
                        }
                    }
                    this.field.setValue('share_num', resultData.drainageShare.limitNum1);
                    this.field.setValue('share_limit_num', resultData.drainageShare.limitNum);
                    /* 	if(${resultData.drainageShare.limitNum!=null}){
                            document.getElementById("optLimit2_span5").style.display="block";
                            this.refs.optLimit12").val("1");
                            this.refs.optLimit16").val("${resultData.drainageShare.limitNum}");
                        } */

                }
                if (resultData.drainageCollection != null) {
                    // console.log('resultData.drainageCollection存在');
                    this.setState({
                        checkedE: true
                    })
                    this.field.setValue('collection_draw_num', resultData.drainageCollection.drawNum);
                }
                if (resultData.drainageSign != null) {
                    // console.log('resultData.drainageSign存在');
                    this.setState({
                        checkedD: true
                    })
                    this.field.setValue('sign_draw_day', resultData.drainageSign.limitNum1);
                    this.field.setValue('sign_draw_num', resultData.drainageSign.drawNum);
                    this.setState({
                        sign_send_data: 'block'
                    })
                    /* 	if(${resultData.drainageSign.limitNum!=null}){
                            document.getElementById("optLimit2_span3").style.display="block";
                            this.refs.optLimit10").val("1");
                            this.refs.optLimit4").val("${resultData.drainageSign.limitNum}");
                        } */
                }
                if (resultData.drainageAttention != null) {
                    // if (!$(this.refs.E).is(':checked')) {
                    //     this.setState({
                    //         checkedE: true,
                    //         divshou: 'block'
                    //     })
                    //     //$(this.refs.collection_draw_num).val(resultData.drainageAttention.drawNum);
                    // }
                    /* this.refs.G").attr("checked",'true');
                    this.refs.attention_draw_num").val("${resultData.drainageAttention.drawNum}");
                    document.getElementById("divguan").style.display="block"; */
                }








                // this.field.setValue('praiseTnum', resultData.marketp ? resultData.marketp.praiseTnum : '');
                // if (resultData.drainageIntoStore!=null) {
                //     resultData.drainageIntoStore.drainageSet == '3' ? () => {
                //         this.field.setValue('drainageSet', '3');
                //     } : () => {
                //         this.field.setValue('drainageSet', '1');
                //     }

                // }
            }.bind(this), 'json');
        }else{
            $.get(apimap[apienv]['MarketingMeansSetgenx'],'', function (result) {
                this.smscat=0;
                let resultData = result;
                this.setState({
                    result: resultData,
                    marketName: resultData.market.mName
                })
                if (resultData.marketInfo != null){
                    if (resultData.marketInfo.open == true){
                        this.setState({
                            sms_content_bianji: 'block'
                        })
                    }
                }
                if(resultData.marketf!=null){
                    if (resultData.marketf.goodsType == '0'){
                        this.field.setValue('addgoodstype','0');
                        let gids = resultData.marketf.goodsid;
                        if (gids != '') {
                            let goodsids = String(gids).split(",");
                            this.setState({
                                manSendType:'some',
                                manGoodsids:'您已选择'+goodsids.length+'个参与宝贝',
                            });
                            this.field.setValue('market_send_goods_ids',gids);
                            this.field.setValue('market_send_goods_idstp',gids);
                        }
                    }else{
                        this.field.setValue('addgoodstype','1')
                        let gids = "";
                        if (resultData.marketf.goodsid != null){
                            gids = resultData.marketf.goodsid;
                        }
                        if (gids != '') {
                            let goodsids = String(gids).split(",");
                            this.setState({
                                manSendType:'some',
                                manGoodsidsp:'您已排除'+goodsids.length+'个宝贝'
                            })
                            this.field.setValue('market_send_goods_ids',gids);
                            this.field.setValue('market_send_goods_idstp',gids);
                        }
                    }
                }
                if(resultData.marketm!=null){
                    if (resultData.marketm.goodsType == '0'){
                        this.field.setValue('addgoodstypeb','0')
                        let gids = resultData.marketm.goodsid;
                        // console.log('买就送被选择的商品id:',gids);
                        if (gids != '') {
                            let goodsids = String(gids).split(",");
                            this.setState({
                                maiSendType:'some',
                                maiGoodsids:'您已选择' + goodsids.length + '个参与宝贝'
                            });
                            this.field.setValue('market_send_goods_idsb',gids);
                            this.field.setValue('market_send_goods_idsbtp',gids);
                        }
                    }else{
                        this.field.setValue('addgoodstypeb','1')
                        let gids = "";
                        if (resultData.marketm.goodsid != null){
                            gids = resultData.marketm.goodsid;
                        }
                        // console.log('买就送被排除的商品id:',gids);
                        if (gids != '') {
                            let goodsids = String(gids).split(",");
                            this.setState({
                                maiSendType:'some',
                                maiGoodsidsp:'您已排除'+goodsids.length+'个宝贝'
                            })
                            this.field.setValue('market_send_goods_idsb',gids);
                            this.field.setValue('market_send_goods_idsbtp',gids);
                        }
                    }
                }
                if(resultData.marketp!=null){
                    if (resultData.marketp.goodsType == '0'){
                        var gids = resultData.marketp.goodsid;
                        this.field.setValue('addgoodstypep','0');
                        if (gids != '') {
                            var goodsids = String(gids).split(",");
                            this.setState({
                                pingSendType:'some',
                                pingGoodsidsp:'您已排除'+goodsids.length+'个宝贝'
                            })
                            this.field.setValue('market_send_goods_idsp',resultData.marketp.goodsid);
                            this.field.setValue('market_send_goods_idsptp',resultData.marketp.goodsid);
                        }
                    }else{
                        this.field.setValue('addgoodstypep','1');
                        var gids = "";
                        if (resultData.marketp.goodsid != null ){
                            gids = resultData.marketp.goodsid;
                        }
                        if (gids != '') {
                            var goodsids = String(gids).split(",");
                            this.setState({
                                pingSendType:'some',
                                pingGoodsids:'您已选择'+goodsids.length+'个宝贝'
                            })
                            this.field.setValue('market_send_goods_idsp',gids);
                            this.field.setValue('market_send_goods_idsptp',gids);
                        }
                    }
                    if ((resultData.marketp.praiseWLimit == '8') && (resultData.marketp.shaituLimit == '') ){
                        this.setState({
                            praise:0
                        })
                    }
                    if (resultData.marketp.praiseWLimit != ''){
                        this.setState({
                            praise:1
                        })
                    }
                }
                if (resultData.marketInfo != null){
                    if (resultData.marketInfo.open == true){
                        this.smscat = 1;
                    }else{
                    }
                }
                // $("#sms_template").onKeyUp(this.showTip);
                // $("#sms_template").onKeyDown(this.showTip);
                // $("#sms_template").live('input paste', this.showTip);
                // $("#sms_template").bind('propertychange', this.showTip);
                // $("#sms_sign").onKeyUp(this.showTip);
                // $("#sms_sign").onKeyDown(this.showTip);
                // $("#sms_sign").live('input paste', this.showTip);
                // $("#sms_sign").bind('propertychange', this.showTip);
                this.showTip();
                let newDate = new Date();
                this.field.setValue('marketName', resultData.market.mName);
                this.field.setValue('startDate', Tools.formatDate(resultData.startTime == '' ? newDate : resultData.startTime, 'yyyy-MM-dd'));
                let sD = this.refs.startDate.props.value;
                if (sD != '' && typeof (sD) != 'undefined') {
                    this.setState({
                        startTimeDisabled: false
                    })
                }
                this.field.setValue('startTime', Tools.formatDate(resultData.startTime == '' ? newDate : resultData.startTime, 'hh:mm:ss'));
                this.field.setValue('endDate', Tools.formatDate(resultData.endTime == '' ? newDate : resultData.endTime, 'yyyy-MM-dd'));
                let eD = this.refs.endDate.props.value;
                if (eD != '' && typeof (eD) != 'undefined') {
                    this.setState({
                        endTimeDisabled: false
                    })
                }
                this.field.setValue('endTime', Tools.formatDate(resultData.endTime == '' ? newDate : resultData.endTime, 'hh:mm:ss'));
                this.field.setValue('praiseWLimit', resultData.marketp ? resultData.marketp.praiseWLimit : '');
                this.field.setValue('shaituLimit', resultData.marketp ? resultData.marketp.shaituLimit : '');
                this.field.setValue('sms_template', resultData.smsContent ? resultData.smsContent : '');
                this.field.setValue('sms_sign', resultData.nick_sign ? resultData.nick_sign : '');
                this.field.setValue('intoStore_draw_num', '1');
                this.field.setValue('intoStore_user_type', '1');
                this.field.setValue('brandId', resultData.sellerInfo ? resultData.sellerInfo.brandId : '')
                if (resultData.marketf != null) {
                    this.setState({
                        checkedA: true
                    })
                    if (resultData.marketf.optLimit != '0') {
                        this.setState({
                            optLimit: '1'
                        })
                        this.field.setValue('optLimitA', resultData.marketf.optLimit);
                    } else if (resultData.marketf.optLimit == '0') {
                        this.setState({
                            optLimit: '0'
                        })
                        this.field.setValue('optLimitA', '0');
                    }
                    if (resultData.marketf.fullNum != null) {
                        this.field.setValue('manjiu', resultData.marketf.fullNum);
                    }
                    if (resultData.marketf.fullType != null) {
                        this.field.setValue('fullType', resultData.marketf.fullType);
                    }
                    if (resultData.marketf.drawNum != null) {
                        this.field.setValue('manjiu1', resultData.marketf.drawNum);
                    }

                }
                if (resultData.marketm != null) {
                    this.setState({
                        checkedB: true
                    })
                    if (resultData.marketm.optLimit != '0') {
                        this.setState({
                            optLimit1: '1'
                        })
                        this.field.setValue('optLimit2', resultData.marketm.optLimit);
                    } else if (resultData.marketm.optLimit == '0') {
                        this.setState({
                            optLimit1: '0'
                        })
                        this.field.setValue('optLimit2', '0');
                    }
                    if (resultData.marketm.drawNum != null) {
                        this.field.setValue('maijiu1', resultData.marketm.drawNum);
                    }
                }
                if (resultData.marketp != null) {
                    this.setState({
                        checkedC: true
                    })
                    if (resultData.marketp.optLimit != '0') {
                        this.setState({
                            optLimit9: '1'
                        })
                        this.field.setValue('optLimit3', resultData.marketp.optLimit);
                    } else if (resultData.marketp.optLimit == '0') {
                        this.setState({
                            optLimit9: '0'
                        })
                        this.field.setValue('optLimit3', '0');
                    }
                    if (resultData.marketp.drawNum != '0') {
                        this.field.setValue('haoping', resultData.marketp.drawNum);
                    }
                    if (resultData.marketp.praiseWLimit != '0') {
                        this.setState({
                            praise: '1'
                        })
                        this.setState({
                            daiziPraiseValue: resultData.marketp.praiseWLimit
                            // this.field.setValue('praiseWLimit', resultData.marketp.praiseWLimit);
                        })
                    } else {
                        this.setState({
                            praise: '0'
                        })
                        this.setState({
                            daiziPraiseValue: '0'
                            // this.field.setValue('praiseWLimit', '0');
                        })
                    }
                    if (resultData.marketp.filterKeyword != null) {
                        this.field.setValue('filterKeyword', resultData.marketp.filterKeyword ? resultData.marketp.filterKeyword : '系统默认评价,很差,骗人,垃圾,失望,无奈,上当,拙劣,烂,坑爹,质量太差,难看,很破,伤心,再也不来,不值这个价,质量差,质量不行,慎重,太次,粗糙,郁闷,可恶,以防受骗,气人,不敢恭维,太假,不是一般差,差评,中评,便宜没好货,褪色,瑕疵');
                    }
                    if (resultData.marketp.filterKeyword2 != null) {
                        this.field.setValue('filterKeyword2', resultData.marketp.filterKeyword2 ? resultData.marketp.filterKeyword2 : '');
                    }
                    if (resultData.marketp.praiseTnum != null) {
                        this.field.setValue('praiseTnum', resultData.marketp.praiseTnum);
                    }
                }
                if (resultData.drainageIntoStore != null) {
                    this.setState({
                        // checkedI: true,
                        checkedI: true
                    })
                    this.field.setValue('intoStore_draw_num', resultData.drainageIntoStore.drawNum);
                    this.field.setValue('intoStore_user_type', resultData.drainageIntoStore.drainageSet);
                    /* 	if(${resultData.drainageIntoStore.limitNum!=null}){
                            document.getElementById("optLimit2_span6").style.display="block";
                            this.refs.optLimit6").val("1");
                            this.refs.optLimit17").val("${resultData.drainageIntoStore.limitNum}");
                        } */
                    if (resultData.drainageIntoStore.drainageSet == 3) {
                        this.setState({
                            div_intoStore_send_user: 'block'
                        })
                        this.field.setValue('intoStore_send_user', resultData.drainageIntoStore.drainageSet1);
                    }
                }

                /* 		if(${resultData.drainageIntoStore!=null}){
                            //alert(${resultData.drainageIntoStore.drainageSet});
                            this.refs.intoStore_send").attr("checked",'true');//.attr("checked",'true');
                            document.getElementById("into_store_data").style.display="block";
                            this.refs.intoStore_draw_num").val("${resultData.drainageIntoStore.drawNum}");
                            //
                            //this.refs.intoStore_user_type").easyDropDown('select', ${resultData.drainageIntoStore.drainageSet});
                            this.refs.intoStore_user_type").val("${resultData.drainageIntoStore.drainageSet}");
                            if(${resultData.drainageIntoStore.drainageSet==3}){
                                document.getElementById("div_intoStore_send_user").style.display="block";
                            }

                        } */
                if (resultData.market.drawNum != null && resultData.market.drawNum > 0) {
                    this.setState({
                        d_num_set: true
                    })
                    this.field.setValue('d_num_set_num', resultData.market.drawNum);
                }
                if (resultData.drainageShare != null) {
                    this.setState({
                        checkedH: true
                    })
                    this.field.setValue('share_draw_num', resultData.drainageShare.drawNum);
                    if (resultData.drainageShare.drainageSet == 'checked') {
                        this.setState({
                            share_all: true
                        })
                    }
                    if (resultData.drainageShare.drainageSet1 != '' && resultData.drainageShare.drainageSet1 != null) {
                        this.setState({
                            share_goods: true
                        })
                        this.field.setValue('market_send_goods_idsd', resultData.drainageShare.drainageSet1);
                    }
                    if (resultData.drainageIntoStore) {
                        if (resultData.drainageIntoStore.drainageSet == 'checked') {
                            this.setState({
                                share_all: true
                            })
                        }
                    }
                    this.field.setValue('share_num', resultData.drainageShare.limitNum1);
                    this.field.setValue('share_limit_num', resultData.drainageShare.limitNum);
                    /* 	if(${resultData.drainageShare.limitNum!=null}){
                            document.getElementById("optLimit2_span5").style.display="block";
                            this.refs.optLimit12").val("1");
                            this.refs.optLimit16").val("${resultData.drainageShare.limitNum}");
                        } */

                }
                if (resultData.drainageCollection != null) {
                    // console.log('resultData.drainageCollection存在');
                    this.setState({
                        checkedE: true
                    })
                    this.field.setValue('collection_draw_num', resultData.drainageCollection.drawNum);
                }
                if (resultData.drainageSign != null) {
                    // console.log('resultData.drainageSign存在');
                    this.setState({
                        checkedD: true
                    })
                    this.field.setValue('sign_draw_day', resultData.drainageSign.limitNum1);
                    this.field.setValue('sign_draw_num', resultData.drainageSign.drawNum);
                    this.setState({
                        sign_send_data: 'block'
                    })
                    /* 	if(${resultData.drainageSign.limitNum!=null}){
                            document.getElementById("optLimit2_span3").style.display="block";
                            this.refs.optLimit10").val("1");
                            this.refs.optLimit4").val("${resultData.drainageSign.limitNum}");
                        } */
                }
                if (resultData.drainageAttention != null) {
                    // if (!$(this.refs.E).is(':checked')) {
                    //     this.setState({
                    //         checkedE: true,
                    //         divshou: 'block'
                    //     })
                    //     //$(this.refs.collection_draw_num).val(resultData.drainageAttention.drawNum);
                    // }
                    /* this.refs.G").attr("checked",'true');
                    this.refs.attention_draw_num").val("${resultData.drainageAttention.drawNum}");
                    document.getElementById("divguan").style.display="block"; */
                }








                // this.field.setValue('praiseTnum', resultData.marketp ? resultData.marketp.praiseTnum : '');
                // if (resultData.drainageIntoStore!=null) {
                //     resultData.drainageIntoStore.drainageSet == '3' ? () => {
                //         this.field.setValue('drainageSet', '3');
                //     } : () => {
                //         this.field.setValue('drainageSet', '1');
                //     }

                // }
            }.bind(this));
        }
        $('.mtypechange').click(() => {
            // console.log('mtypechange');
            if (this.state.result.cjorxg == 'xg') {
                this.setState({
                    type_changed: 1
                })
            }
        });
    }
    clickedA = () => {
        this.setState({
            checkedA: !this.state.checkedA
        })
    }
    clickedB = () => {
        this.setState({
            checkedB: !this.state.checkedB
        })
    }
    clickedC = () => {
        this.setState({
            checkedC: !this.state.checkedC
        })
    }
    clickedD = () => {
        this.setState({
            checkedD: !this.state.checkedD
        })
    }
    clickedE = () => {
        this.setState({
            checkedE: !this.state.checkedE
        })
    }
    clickedH = () => {
        this.setState({
            checkedH: !this.state.checkedH
        })
    }
    clickedI = () => {
        this.setState({
            checkedI: !this.state.checkedI
        })
    }
    clickedJ = () => {
        this.setState({
            clickedJ: !this.state.checkedJ
        })
    }
    clickedF = () => {
        this.setState({
            checkedF: !this.state.checkedF
        })
    }
    clickedG = () => {
        this.setState({
            checkedG: !this.state.checkedG
        })
    }
    d_num_set = () => {
        console.log('d_num_set');
    }
    manPaginationChange = (value) => {
        this.setState({
            manSomeCurrentPage:value
        })
        this.addGoodsf('1',value,this.state.manSearchValue)
    };
    maiPaginationChange = (value) => {
        this.setState({
            maiSomeCurrentPage:value
        })
        this.addGoodsb('1',value,this.state.maiSearchValue)
    };
    pingPaginationChange = (value) => {
        this.setState({
            pingSomeCurrentPage:value
        })
        this.addGoodsp('1',value,this.state.pingSearchValue)
    };
    fenPaginationChange = (value) => {
        this.setState({
            fenCurrentPage:value
        })
        this.addGoodsd(value,this.state.fenSearchValue)
    };
    onOptLimitChange(value) {
        if (value == '0') {
            this.field.setValue('optLimitA', '0');
        }
        this.setState({
            optLimit: value
        })
    }
    onOptLimit1Change(value) {
        if (value == '0') {
            this.field.setValue('optLimit2', '0');
        }
        this.setState({
            optLimit1: value
        })
    }
    onOptLimit9Change(value) {
        if (value == '0') {
            this.field.setValue('optLimit3', '0');
        }
        this.setState({
            optLimit9: value
        })
    }
    onOptLimit11Change(value) {
        if (value == '0') {
            this.field.setValue('optLimit5', '0');
        }
        this.setState({
            optLimit11: value
        })
    }
    optLimit2show4() {
        console.log('optLimit2show4');
    }
    optLimit2show7() {
        console.log('optLimit2show7');
    }
    addGoods_shou() {
        console.log('addGoods_shou()');
    }
    addGoods_cart() {
        console.log('addGoods_cart');
    }
    /*设置满就送选择全部商品*/
    clickedShareAll = () => {
        this.setState({
            share_all: !this.state.share_all
        })
    }
    /*设置满就送选择部分商品*/
    clickedShareGoods = () => {
        this.setState({
            share_goods: !this.state.share_goods
        })
    }
    /*点击下一步按钮保存时检查*/
    saveCheck=()=> {
        // console.log('saveCheckClicked');
        if (this.state.type_changed == '1') {
            this.setState({
                marketingTypeChanged: true
            })
        } else {
            this.saveNext();
        }
    }
    saveNext=(e)=> {
        // console.log('saveNextClicked')
        var ifquan = '0';
        var ifquanb = '0';
        var ifquanp = '0';
        var fullType = '0';
        // e.preventDefault()
        let data = this.field.getValues();
        this.setState({
            xiayibu: 'none'
        })
        if (!this.refs.A.state.checked && !this.refs.B.state.checked && !this.refs.C.state.checked && !this.refs.D.state.checked && !this.refs.E.state.checked && !this.refs.H.state.checked && !this.refs.I.state.checked) {
            Dialog.alert({content:'请选择活动类型!'});
            this.setState({
                xiayibu: 'block'
            })
            return false;
        }
        // console.log('handle-result:', this.state.result);
        let type = this.state.result.type ? this.state.result.type : '';
        let id = this.state.result.market ? this.state.result.market.mId : '';
        let idf = this.state.result.marketf ? this.state.result.marketf.mId : '';
        let idm = this.state.result.marketm ? this.state.result.marketm.mId : '';
        let idp = this.state.result.marketp ? this.state.result.marketp.mId : '';
        let idd = this.state.result.marketd ? this.state.result.marketd.mId : '';
        let iddq = this.state.result.marketdq ? this.state.result.marketdq.mId : '';
        let idds = this.state.result.marketds ? this.state.result.marketds.mId : '';
        let iddjia = this.state.result.marketdjia ? this.state.result.marketdjia.mId : '';
        let iddg = this.state.result.marketdg ? this.state.result.marketdg.mId : '';
        let iddf = this.state.result.marketdf ? this.state.result.marketdf.mId : '';
        let iddjin = this.state.result.marketdjin ? this.state.result.marketdjin.mId : '';
        let iddsg = this.state.result.marketdsg ? this.state.result.marketdsg.mId : '';
        let activityId_cq = this.state.result.activityidcq ? this.state.result.activityidcq : '';
        let marketname = this.state.marketName;
        // console.log('type:', type, 'id:', id, 'idf:', idf, 'idm:', idm, 'idp:', idp, 'idd:', idd, 'iddq:', iddq, 'idds:', idds, 'iddjia:', iddjia, 'iddg:', iddg, 'iddf:', iddf, 'iddjin:', iddjin, 'iddsg:', iddsg, 'activityId_cq:', activityId_cq, 'marketname:', marketname)
        if (marketname == '') {
            Dialog.alert({content:'活动名称不能为空！'});
            this.setState({
                xiayibu: 'block'
            })
            return false;
        }
        let startTime = Tools.formatDate(Tools.formatDate(data.startDate, 'yyyy-MM-dd') + ' ' + data.startTime, 'yyyy-MM-dd hh:mm:ss');
        let endTime = Tools.formatDate(Tools.formatDate(data.endDate, 'yyyy-MM-dd') + ' ' + data.endTime, 'yyyy-MM-dd hh:mm:ss');
        let str = '';
        let compareData = new Date();
        if (startTime == '' || endTime == '') {
            //str='不限制';
            Dialog.alert({content:'活动开始时间和结束时间不能为空！'});
            this.setState({
                xiayibu: 'block'
            })
            return false;
        } else if (startTime == '不限制' || endTime == '不限制') {
            Dialog.alert({content:'活动开始时间和结束时间不能为空！'});
            this.setState({
                xiayibu: 'block'
            })
            return false;
        } else if (startTime < compareData || endTime < compareData) {
            Dialog.alert({content:'活动开始时间和结束时间已过期！'});
            this.setState({
                xiayibu: 'block'
            })
            return false;
        } else {
            if (startTime == '' || endTime == '') {
                if (startTime == '') {
                    str = endTime + ' 之前';
                } else {
                    str = startTime + ' 之后';
                }
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            } else {
                if (startTime >= endTime) {
                    Dialog.alert({content:'活动起始时间需在结束时间之前'});
                    this.setState({
                        xiayibu: 'block'
                    })
                    return false;
                }
                str = startTime + ' - ' + endTime;
                // console.log('str:', str);
            }
        }

        var chkParams = {
            'sTime': startTime,
            'eTime': endTime,
            'activityId': this.props.location.query.activityId
        };
        var chk = false;
        // console.log('ActDupChk.json,params:', chkParams);
        $.ajax({
            type: apienv=='local'?'GET':'POST',
            url: apimap[apienv]['ActDupChk'],
            data: apienv=='local'?'':chkParams,
            dataType: 'json',
            async: false,
            success: (json) => {
                if (json.rlt == 0) {
                    //console.log(json.txt);
                    chk = true;
                } else {
                    Dialog.alert({content:json.txt});
                }
            }
        });
        if (!chk) {
            this.setState({
                xiayibu: 'block'
            })
            return false;
        }
        if (this.refs.A.state.checked) {
            var manjiu1 = data.manjiu1;
            // console.log('manjiu1:', manjiu1);
            if (manjiu1 == '' || manjiu1 == null) {
                Dialog.alert({content:'满就送抽奖次数不能为空'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
            if (isNaN(manjiu1)) {
                Dialog.alert({content:'抽奖次数 必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
            if (manjiu1 < 0) {
                Dialog.alert({content:'抽奖次数 必须为大于0的数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
        }
        if (this.refs.B.state.checked) {
            var maijiu1 = data.maijiu1;
            // console.log('maijiu1:', maijiu1);
            if (maijiu1 == '' || maijiu1 == null) {
                Dialog.alert({content:'买就送抽奖次数不能为空'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
            if (isNaN(maijiu1)) {
                Dialog.alert({content:'抽奖次数 必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
            if (maijiu1 < 0) {
                Dialog.alert({content:'抽奖次数 必须为大于0的数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
        }
        var praiseTnum = typeof (this.refs.praiseTnum.props.value) == 'undefined' ? '' : this.refs.praiseTnum.props.value;
        if (this.refs.C.state.checked) {
            var haoping = typeof (this.refs.haoping.props.value) == 'undefined' ? '' : this.refs.haoping.props.value;
            if (haoping == '' || haoping == null) {
                Dialog.alert({content:'评价送抽奖次数不能为空'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
            if (isNaN(haoping)) {
                Dialog.alert({content:'抽奖次数 必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
            if (haoping < 0) {
                Dialog.alert({content:'抽奖次数 必须为大于0的数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }

            if (praiseTnum == '' || praiseTnum == null || isNaN(praiseTnum) || praiseTnum < 1) {
                Dialog.alert({content:'多少天内评价 不能为空 且必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
        }
        /*if(praiseTnum!=''&&praiseTnum!=null){
            if(isNaN(praiseTnum)){
                alert('多少天内评价必须为数字'+praiseTnum);
                return false;
            }
        } */

        var praiseWLimit = typeof (this.refs.praiseWLimit.props.value) == 'undefined' ? '' : this.refs.praiseWLimit.props.value;
        if (this.refs.C.state.checked) {
            if (this.refs.daiziPraise && this.refs.daiziPraise.state.checked) {
                if (praiseWLimit != '' && praiseWLimit != null) {
                    if (isNaN(praiseWLimit)) {
                        Dialog.alert({content:'多少字以上评价必须为数字'});
                        this.setState({
                            xiayibu: 'block'
                        })
                        return false;
                    }
                    if (!this.refs.daiziPraise.state.checked) {
                        Dialog.alert({content:'请选中带字评价'});
                        this.setState({
                            xiayibu: 'block'
                        })
                        return false;
                    }
                }
                else {
                    praiseWLimit = '';
                }
            }
        }
        // var shaituLimit = this.refs.shaituLimit ? this.refs.shaituLimit.props.value : '';
        // if (this.refs.shaituPraise != null && this.refs.shaituPraise.state.checked) {
        //     if (shaituLimit != '' && shaituLimit != null) {
        //         if (isNaN(shaituLimit)) {
        //             alert('晒图评价必须为数字');
        //             this.setState({
        //                 xiayibu: 'block'
        //             })
        //             return false;
        //         }
        //         if (!this.refs.shaituPraise.state.checked) {
        //             alert('请选中晒图评价');
        //             this.setState({
        //                 xiayibu: 'block'
        //             })
        //             return;
        //         }
        //     }
        //     else {
        //         shaituLimit = '';
        //     }
        // }
        /*     if(type=='full'){
                var full_num=$('#full_num').val();
                if(isNaN(full_num)){
                    alert('订单满 多少必须为数字');
                    return false;
                } if(full_num<0){
                    alert('订单满 多少必须为大于0的数字');
                    return false;
                }
            }*/
        if (this.refs.A.state.checked) {
            // console.log('this.refs.A.state.checked==true');
            var manjiu = typeof (this.refs.manjiu.props.value) == 'undefined' ? '' : this.refs.manjiu.props.value;
            var optLimit = typeof (this.refs.fullType.props.value) == 'undefined' ? '0' : this.refs.fullType.props.value;
            if (optLimit == '1') {
                if (isNaN(manjiu)) {
                    Dialog.alert({content:'订单满 多少必须为数字'});
                    this.setState({
                        xiayibu: 'block'
                    })
                    return false;
                }
            }
            if (manjiu < 0) {
                Dialog.alert({content:'订单满 多少必须为大于0的数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
        }
        var optLimit = this.refs.fullType.props.value;
        if (optLimit == 1) {
            optLimit = this.refs.optLimit2.props.value;
        }
        var optLimita = this.refs.optLimit.props.value;
        if (optLimita == 1) {
            optLimita = this.refs.optLimitA.props.value;
        }
        var optLimitb = this.refs.optLimit1.props.value;
        if (optLimitb == 1) {
            optLimitb = this.refs.optLimit2.props.value;
        }
        var optLimitc = this.refs.optLimit9.props.value;
        if (optLimitc == 1) {
            optLimitc = this.refs.optLimit3.props.value;
        }
        var optLimitd = this.refs.optLimit11.props.value;
        if (optLimitd == 1) {
            optLimitd = this.refs.optLimit5.props.value;
        }
        var optLimitsg = this.refs.optLimit13.props.value;
        if (optLimitsg == 1) {
            optLimitsg = this.refs.optLimit14.props.value;
        }
        console.log('wyhsmscat,smsCount',this.smscat,this.state.result.smsCount == null ? 0 : this.state.result.smsCount)
        if (this.smscat == 1 && (this.state.result.smsCount == null ? 0 : this.state.result.smsCount) <= 0) {
            Dialog.alert({content:'手机短信抽奖消耗您的短信量，请充值后设置'});
            this.setState({
                xiayibu: 'block'
            })
            return false;
        }
        // if (this.refs.switchBtn.props.value == 8) {
        //     this.smscat = 1;
        // } else {
        //     this.smscat = 0;
        // }
        let shaituLimit;
        if (this.refs.shaituLimit && this.refs.shaituLimit.props.value != '') {
            shaituLimit = this.refs.shaituLimit.props.value;
        } else {
            shaituLimit = '';
        }
        var sms_template = this.field.getValue('sms_template');
        var sms_sign = this.field.getValue('sms_sign');
        if (this.refs.A.state.checked == true) {
            type = 'full';
        }
        //进店送
        var intoStore_send = this.refs.I.state.checked ? 'checked' : undefined;
        var intoStore_user_type = typeof (this.refs.intoStore_user_type.props.value) == 'undefined' ? '' : this.refs.intoStore_user_type.props.value;
        var intoStore_draw_num = typeof (this.refs.intoStore_draw_num.props.value) == 'undefined' ? '' : this.refs.intoStore_draw_num.props.value;
        var intoStore_send_user = typeof (this.refs.intoStore_send_user.props.value) == 'undefined' ? '' : this.refs.intoStore_send_user.props.value;

        if (intoStore_send == 'checked') {
            if (intoStore_draw_num == '' || intoStore_draw_num == null || isNaN(intoStore_draw_num)) {
                Dialog.alert({content:'进店送抽奖次数不能为空 且必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
            if (intoStore_user_type == 3) {
                if (intoStore_send_user == '' || intoStore_send_user == "买家昵称,多个用', '隔开") {
                    Dialog.alert({content:'进店送抽奖参与的买家Nick不能为空'});
                    this.setState({
                        xiayibu: 'block'
                    })
                    return false;
                }
            }
        }

        //分享送
        var share_send = this.refs.H.state.checked ? 'checked' : undefined;
        var share_all = this.state.share_all ? 'checked' : undefined;
        var share_goods = this.refs.share_goods.state.checked ? 'checked' : undefined;

        var share_num = typeof (this.refs.share_num.props.value) == 'undefined' ? '' : this.refs.share_num.props.value;
        var share_draw_num = typeof (this.refs.share_draw_num.props.value) == 'undefined' ? '' : this.refs.share_draw_num.props.value;
        var share_limit_num = typeof (this.refs.share_limit_num.props.value) == 'undefined' ? '' : this.refs.share_limit_num.props.value;
        var market_send_goods_idsd = typeof (this.field.getValue('market_send_goods_idsd')) == 'undefined' ? '' : this.field.getValue('market_send_goods_idsd');
        if (share_send == 'checked') {
            if (share_goods == 'checked') {

                if (market_send_goods_idsd == '') {
                    Dialog.alert({content:' 请选择设置分享商品！'});
                    this.setState({
                        xiayibu: 'block'
                    })
                    return false;
                }
            }
            if (!share_all && !share_goods) {
                Dialog.alert({content:' 请选择设置分享商品还是分享店铺！'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
            if (share_num == '' || share_num == null || isNaN(share_num)) {
                Dialog.alert({content:'成功邀请几个好友不能为空 且必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            } if (share_draw_num == '' || share_draw_num == null || isNaN(share_draw_num)) {
                Dialog.alert({content:'抽奖次数 必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            } if (share_limit_num == '' || share_limit_num == null || isNaN(share_limit_num)) {
                Dialog.alert({content:'限制不能为空 且必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
        }
        //收藏送
        var collection_send = this.refs.E.state.checked ? 'checked' : undefined;
        var collection_draw_num = typeof (this.refs.collection_draw_num.props.value) == 'undefined' ? '' : this.refs.collection_draw_num.props.value + '';
        if (collection_send == 'checked') {
            if (collection_draw_num == '' || collection_draw_num == null || isNaN(collection_draw_num)) {
                Dialog.alert({content:'收藏抽奖次数 不能为空 且必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
        }
        //签到送
        var sign_send = this.refs.D.state.checked ? 'checked' : undefined;
        var sign_draw_day = typeof (this.refs.sign_draw_day.props.value) == 'undefined' ? '' : this.refs.sign_draw_day.props.value;
        var sign_draw_num = typeof (this.refs.sign_draw_num.props.value) == 'undefined' ? '' : this.refs.sign_draw_num.props.value;
        if (sign_send == 'checked') {
            if (sign_draw_num == '' || sign_draw_num == null || isNaN(sign_draw_num)) {
                Dialog.alert({content:'签到抽奖次数 不能为空 且必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
        }


        //关注送
        var attention_send = this.refs.G.state.checked ? 'checked' : undefined;
        var attention_draw_num = typeof (this.refs.attention_draw_num.props.value) == 'undefined' ? '' : this.refs.attention_draw_num.props.value;
        var brandId = typeof (this.refs.brandId.props.value) == 'undefined' ? '' : this.refs.brandId.props.value;
        if (attention_send == 'checked') {
            if (attention_draw_num == '' || attention_draw_num == null || isNaN(attention_draw_num)) {
                Dialog.alert({content:'关注抽奖次数 不能为空 且必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
            if (brandId == '' || brandId == null || isNaN(brandId)) {
                Dialog.alert({content:'品牌号 不能为空 且必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
        }
        //购物车
        var cart_send = this.refs.F.state.checked ? 'checked' : undefined;
        var cart_draw_num = typeof (this.refs.cart_draw_num.props.value) == 'undefined' ? '' : this.refs.cart_draw_num.props.value;
        var cart_goods_num = typeof (this.refs.cart_goods_num.props.value) == 'undefined' ? '' : this.refs.cart_goods_num.props.value;
        var optLimit = typeof (this.refs.optLimit11.props.value) == 'undefined' ? '' : this.refs.optLimit11.props.value;
        var optLimit2 = typeof (this.refs.optLimit5.props.value) == 'undefined' ? '' : this.refs.optLimit5.props.value;
        var cart_send_goods = typeof (this.refs.market_cart_send_goods_ids.props.value) == 'undefined' ? '' : this.refs.market_cart_send_goods_ids.props.value;
        var market_cart_send_goods_info = typeof (this.refs.market_cart_send_goods_info.props.value) == 'undefined' ? '' : this.refs.market_cart_send_goods_info.props.value;

        if (optLimit == 1) {
            if (optLimit2 == '' || optLimit2 == null || isNaN(optLimit2) || optLimit2 < 1) {
                Dialog.alert({content:"加入购物车限制封顶次数不能为空"});
                this.setState({
                    xiayibu: 'none'
                })
                return false;
            }
            optLimit = optLimit2;
        }
        if (cart_send == 'checked') {
            /* 	 if(${resultData.isvip==true}){

                }else{
                    alert("使用购物车功能请升级为高级版本！");
                    return false;
                }
                if(cart_draw_num==""||cart_draw_num==null||isNaN(cart_draw_num)){
                    alert("加入购物车抽奖次数 不能为空 且必须为数字");
                    return false;
                } */
        }
        //收藏商品
        var shougoods_send = this.refs.J.state.checked ? 'checked' : undefined;
        var shou_draw_num = typeof (this.refs.shou_draw_num.props.value) == 'undefined' ? '' : this.refs.shou_draw_num.props.value;
        var shou_goods_num = typeof (this.refs.shou_goods_num.props.value) == 'undefined' ? '' : this.refs.shou_goods_num.props.value;
        var optLimit13 = typeof (this.refs.optLimit13.props.value) == 'undefined' ? '' : this.refs.optLimit13.props.value;
        var optLimit14 = typeof (this.refs.optLimit14.props.value) == 'undefined' ? '' : this.refs.optLimit14.props.value;
        var shou_send_goods = typeof (this.refs.market_shou_send_goods_ids.props.value) == 'undefined' ? '' : this.refs.market_shou_send_goods_ids.props.value;
        var market_shou_send_goods_info = typeof (this.refs.market_shou_send_goods_info.props.value) == 'undefined' ? '' : this.refs.market_shou_send_goods_info.props.value;

        if (optLimit13 == 1) {
            if (optLimit14 == '' || optLimit14 == null || isNaN(optLimit14) || optLimit14 < 1) {
                Dialog.alert({content:'加入购物车限制封顶次数不能为空'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
            optLimit13 = optLimit14;
        }
        var d_num = this.refs.d_num_set_num.props.value;
        var d_num_set = this.refs.d_num_set.state.checked;
        if (d_num_set) {
            if (d_num == '' || d_num == null || isNaN(d_num)) {
                Dialog.alert({content:'每人每日限制不能为空 且必须为数字'});
                this.setState({
                    xiayibu: 'block'
                })
                return false;
            }
        } else {
            d_num = 0;
        }

        if (this.refs.A.state.checked) {
            marnum = parseInt(marnum) + 1;
        }
        if (this.refs.B.state.checked) {
            marnum = parseInt(marnum) + 1;
        }
        if (this.refs.C.state.checked) {
            marnum = parseInt(marnum) + 1;
        }
        if (this.refs.D.state.checked || this.refs.E.state.checked || this.refs.H.state.checked || this.refs.I.state.checked) {
            marnum = parseInt(marnum) + 1;
        }
        var cqflag;
        if (this.state.result.cqflag == '1') {
            cqflag = '1';
        }
        var itemvaluetype;
        var itemvaluetypetoo;
        if (!this.refs.A.state.checked) {
            if (itemvaluetype != null) {
                itemvaluetype += "'full',";
            } else {
                itemvaluetype = "'full',";
            }
        }
        if (!this.refs.B.state.checked) {
            if (itemvaluetype != null) {
                itemvaluetype += "'buyer',";
            } else {
                itemvaluetype = "'buyer',";
            }
        }
        if (!this.refs.C.state.checked) {
            if (itemvaluetype != null) {
                itemvaluetype += "'praise',";
            } else {
                itemvaluetype = "praise',";
            }
        }
        if (!this.refs.D.state.checked) {
            if (itemvaluetypetoo != null) {
                itemvaluetypetoo += "'sign',";
            } else {
                itemvaluetypetoo = "'sign',";
            }
        }
        if (!this.refs.E.state.checked) {
            if (itemvaluetypetoo != null) {
                itemvaluetypetoo += "'collection',";
            } else {
                itemvaluetypetoo = "'collection',";
            }
        }
        if (!this.refs.H.state.checked) {
            if (itemvaluetypetoo != null) {
                itemvaluetypetoo += "'share',";
            } else {
                itemvaluetypetoo = "'share',";
            }
        }
        if (!this.refs.I.state.checked) {
            if (itemvaluetypetoo != null) {
                itemvaluetypetoo += "'intostore',";
            } else {
                itemvaluetypetoo = "'intostore',";
            }
        }
        var params = {
            'activityId': this.state.result.activityId ? this.state.result.activityId : '',
            'marketname': marketname,
            'startTime': startTime,
            'endTime': endTime,
            'marketsendgoodsids': this.field.getValue('addgoodstype')=='0'?this.field.getValue('market_send_goods_ids'):this.field.getValue('market_send_goods_idstp'),
            'addgoodstype':this.field.getValue('addgoodstype'),
            'fullType': this.refs.fullType.props.value,
            'drawnum': this.refs.manjiu1.props.value,
            'optLimit': optLimita,
            'fullNum': this.refs.manjiu.props.value,
            'praiseWLimit': praiseWLimit,
            'id': idf,
            'smscat': this.smscat,
            'sms_template': sms_template,
            'sms_sign': sms_sign,
            'type': 'full',
            'shaituLimit': shaituLimit,
            'filterKeyword': '',
            'filterKeyword2': '',
            'cqflag': cqflag,
            'activityId_cq': activityId_cq
        };
        var params1 = {
            'activityId': this.state.result.activityId ? this.state.result.activityId : '',
            'marketname': marketname,
            'startTime': startTime,
            'endTime': endTime,
            'marketsendgoodsids': this.field.getValue('addgoodstypeb')=='0'?this.field.getValue('market_send_goods_idsb'):this.field.getValue('market_send_goods_idsbtp'),
            'addgoodstype': this.field.getValue('addgoodstypeb'),
            'fullType': 0,
            'drawnum': this.refs.maijiu1.props.value,
            'optLimit': optLimitb,
            'fullNum': 0,
            'praiseWLimit': praiseWLimit,
            'id': idm,
            'smscat': this.smscat,
            'sms_template': sms_template,
            'sms_sign': sms_sign,
            'type': 'buyer',
            'shaituLimit': shaituLimit,
            'filterKeyword': '',
            'filterKeyword2': '',
            'cqflag': cqflag,
            'activityId_cq': activityId_cq
        };
        var params2 = {
            'activityId': this.state.result.activityId ? this.state.result.activityId : '',
            'marketname': marketname,
            'startTime': startTime,
            'endTime': endTime,
            'marketsendgoodsids': this.field.getValue('addgoodstypep')=='0'?this.field.getValue('market_send_goods_idsp'):this.field.getValue('market_send_goods_idsptp'),
            'addgoodstype': this.field.getValue('addgoodstypep'),
            'fullType': 0,
            'drawnum': this.refs.haoping.props.value,
            'optLimit': optLimitc,
            'fullNum': 0,
            'praiseTnum': this.refs.praiseTnum.props.value,
            'praiseWLimit': praiseWLimit,
            'id': idp,
            'smscat': this.smscat,
            'sms_template': sms_template,
            'sms_sign': sms_sign,
            'type': 'praise',
            'shaituLimit': shaituLimit,
            'filterKeyword': this.refs.filterKeyword.props.value,
            'filterKeyword2': this.refs.filterKeyword2.props.value,
            'cqflag': cqflag,
            'activityId_cq': activityId_cq
        };
        var params3 = {
            'activityId': this.state.result.activityId ? this.state.result.activityId : '',
            'marketname': marketname,
            'startTime': startTime,
            'endTime': endTime,
            'intoStore_send': intoStore_send,//是否进店
            'intoStore_user_type': intoStore_user_type,
            'intoStore_draw_num': intoStore_draw_num,
            'intoStore_send_user': intoStore_send_user,
            'share_send': share_send,//是否分享送
            'share_all': share_all,
            'share_goods': share_goods,
            'market_send_goods_ids': market_send_goods_idsd,
            'share_num': share_num,
            'share_draw_num': share_draw_num,
            'share_limit_num': share_limit_num,
            'collection_send': collection_send,//是否收藏送
            'collection_draw_num': collection_draw_num,
            'sign_send': sign_send,//是否签到送
            'sign_draw_day': sign_draw_day,
            'sign_draw_num': sign_draw_num,
            'attention_send': attention_send,//是否关注送
            'attention_draw_num': attention_draw_num,
            'cart_send': cart_send,//是否购物车送
            'cart_draw_num': cart_draw_num,
            'cart_goods_num': cart_goods_num,
            'cart_send_goods': cart_send_goods,
            'market_cart_send_goods_info': market_cart_send_goods_info,
            'optLimit': optLimitd,
            'cart_xzorpc_goods': this.refs.addgoodstype ? this.field.getValue('addgoodstype'): '1',
            'shougoods_send': shougoods_send,//是否收藏商品送
            'shougoods_draw_num': shou_draw_num,
            'shougoods_goods_num': shou_goods_num,
            'shougoods_xzorpc_goods': this.refs.addgoodstype ? this.field.getValue('addgoodstype') : '1',
            'shougoods_send_goods': shou_send_goods,
            'market_shou_send_goods_info': market_shou_send_goods_info,
            'shougoodsoptLimit': optLimitsg,
            'd_num': d_num,
            'brandId': brandId,
            'id': idd,
            'type': 'drainageq',
            'cqflag': cqflag,
            'activityId_cq': activityId_cq
        };
        //alert(itemvaluetype);
        var params18 = {
            'activityId': this.state.result.activityId,
            'itemvaluetype': itemvaluetype,
            'ifdar': '1'
        };
        var params188 = {
            'activityId': this.state.result.activityId,
            'itemvaluetypetoo': itemvaluetypetoo,
            'ifdar': '2'
        };
        /* 	$.post('MarketingMeansSetSavegenx.json',params,function(data){
            let json = JSON.parse(data);
            if(json.rlt==0){
                location.href='MarketingMeansSet2.h4?type='+type+'&id='+json.id+'&startTime='+startTime+'&endTime='+endTime;
            }else{
                alert(json.txt);
            } */



        if (this.refs.A.state.checked) {
            console.log('满就送参数params:',params);
            if(apienv!='local'){
                $.post(apimap[apienv]['MarketingMeansSetSavegenx'], params, function (json) {
                    if (json.rlt == 0) {
                        $.post(apimap[apienv]['MarketingMeansSet2genx'] + '?type=full&ifover=nover&id=' + json.id + '&startTime=' + startTime + '&endTime=' + endTime, '', function (json) {
                            // let json=JSON.parse(data);
                            if (json.rlt == 0) {
                                marnum = parseInt(marnum) - 1;
                            }
                        }.bind(this), 'json');
                        //location.href='MarketingMeansSet2genx.h4?type=full&ifover=nover&id='+json.id+'&startTime='+startTime+'&endTime='+endTime;
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                }, 'json');
            }else{
                $.get(apimap[apienv]['MarketingMeansSetSavegenx'],'', function (json) {
                    if (json.rlt == 0) {
                        $.get(apimap[apienv]['MarketingMeansSet2genx'],'', function (json) {
                            // let json=JSON.parse(data);
                            if (json.rlt == 0) {
                                marnum = parseInt(marnum) - 1;
                            }
                        }.bind(this));
                        //location.href='MarketingMeansSet2genx.h4?type=full&ifover=nover&id='+json.id+'&startTime='+startTime+'&endTime='+endTime;
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                });
            }
            /*
            $.ajax({
                type: 'POST',
                url: apimap[apienv]['MarketingMeansSetSavegenx'],
                data: params,
                dataType: 'json',
                async: false,
                success: function (json, statusText, xhr) {
                    console.log('seccess!');
                    console.log('json:',json);
                    if (json.rlt == 0) {
                        console.log("A.json.rlt == 0");
                        $.post(apimap[apienv]['MarketingMeansSet2genx'] + '?type=full&ifover=nover&id=' + json.id + '&startTime=' + startTime + '&endTime=' + endTime, '', function (json) {
                            if (json.rlt == 0) {
                                let marnum=parseInt(this.state.marnum) - 1;
                                this.setState({
                                    marnum: marnum
                                })
                            }
                        }.bind(this), 'json');
                        //location.href='MarketingMeansSet2genx.h4?type=full&ifover=nover&id='+json.id+'&startTime='+startTime+'&endTime='+endTime;
                    } else {
                        console.log("A.json.rlt != 0");
                        alert(json.txt);
                    }
                }
            },'json');
            */
        }
        if (this.refs.B.state.checked) {
            // console.log('买就送参数params1:',params1)
            if(apienv!='local'){
                $.post(apimap[apienv]['MarketingMeansSetSavegenx'], params1, function (json) {
                    if (json.rlt == 0) {
                        //location.href='MarketingMeansSet2genx.h4?type=buyer&ifover=nover&id='+json.id+'&startTime='+startTime+'&endTime='+endTime;
                        $.post(apimap[apienv]['MarketingMeansSet2genx'] + '?type=buyer&ifover=nover&id=' + json.id + '&startTime=' + startTime + '&endTime=' + endTime, '', function (json) {
                            if (json.rlt == 0) {
                                marnum = parseInt(marnum) - 1;
                            }
                        }.bind(this), 'json');
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                }, 'json')
            }else{
                $.get(apimap[apienv]['MarketingMeansSetSavegenx'], '', function (json) {
                    if (json.rlt == 0) {
                        //location.href='MarketingMeansSet2genx.h4?type=buyer&ifover=nover&id='+json.id+'&startTime='+startTime+'&endTime='+endTime;
                        $.get(apimap[apienv]['MarketingMeansSet2genx'], '', function (json) {
                            if (json.rlt == 0) {
                                marnum = parseInt(marnum) - 1;
                            }
                        }.bind(this));
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                })
            }

        }
        if (this.refs.C.state.checked) {
            // console.log('评价送参数params2:',params2)
            if(apienv!='local'){
                $.post(apimap[apienv]['MarketingMeansSetSavegenx'], params2, function (json) {
                    if (json.rlt == 0) {
                        $.post(apimap[apienv]['MarketingMeansSet2genx'] + '?type=praise&ifover=nover&id=' + json.id + '&startTime=' + startTime + '&endTime=' + endTime, '', function (json) {
                            if (json.rlt == 0) {
                                marnum = parseInt(marnum) - 1;
                            }
                        }.bind(this), 'json');
                        //location.href='MarketingMeansSet2genx.h4?type=praise&ifover=nover&id='+json.id+'&startTime='+startTime+'&endTime='+endTime;
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                }, 'json');
            }else{
                $.get(apimap[apienv]['MarketingMeansSetSavegenx'], '', function (json) {
                    if (json.rlt == 0) {
                        $.get(apimap[apienv]['MarketingMeansSet2genx'],'', function (json) {
                            if (json.rlt == 0) {
                                marnum = parseInt(marnum) - 1;
                            }
                        }.bind(this));
                        //location.href='MarketingMeansSet2genx.h4?type=praise&ifover=nover&id='+json.id+'&startTime='+startTime+'&endTime='+endTime;
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                });
            }

        }
        if (this.refs.D.state.checked || this.refs.E.state.checked || this.refs.H.state.checked || this.refs.I.state.checked) {
            console.log('其他送参数params3:',params3)
            if(apienv!='local'){
                $.post(apimap[apienv]['MarketingMeansSetDrainageSavegenx'], params3, function (json) {
                    if (json.rlt == 0) {
                        $.post(apimap[apienv]['MarketingMeansSet2genx'] + '?type=drainage&ifover=nover&id=' + json.id + '&startTime=' + startTime + '&endTime=' + endTime, '', function (json) {
                            if (json.rlt == 0) {
                                marnum = parseInt(marnum) - 1;
                            }
                        }.bind(this), 'json');
                        //location.href='MarketingMeansSet2genx.h4?type=drainageq&ifover=nover&id='+json.id+'&startTime='+startTime+'&endTime='+endTime;
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                }, 'json')
            }else{
                $.get(apimap[apienv]['MarketingMeansSetDrainageSavegenx'],'', function (json) {
                    if (json.rlt == 0) {
                        $.get(apimap[apienv]['MarketingMeansSet2genx'],'', function (json) {
                            if (json.rlt == 0) {
                                marnum = parseInt(marnum) - 1;
                            }
                        }.bind(this));
                        //location.href='MarketingMeansSet2genx.h4?type=drainageq&ifover=nover&id='+json.id+'&startTime='+startTime+'&endTime='+endTime;
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                })
            }
        }

        if (itemvaluetypetoo != null) {
            if(apienv!='local'){
                $.post(apimap[apienv]['MarketingMeansdelete'], params188, function (json) {
                    if (json.rlt == 0) {
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                }, 'json')
            }else{
                $.get(apimap[apienv]['MarketingMeansdelete'], '', function (json) {
                    if (json.rlt == 0) {
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                })
            }
        }
        if (itemvaluetype != null) {
            if(apienv!='local'){
                $.post(apimap[apienv]['MarketingMeansdelete'], params18, function (json) {
                    if (json.rlt == 0) {
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                }, 'json')
            }else{
                $.get(apimap[apienv]['MarketingMeansdelete'], '', function (json) {
                    if (json.rlt == 0) {
                    } else {
                        Dialog.alert({content:json.txt});
                    }
                })
            }
        }
        this.field.validate();
        this.timer = setInterval(
            () => {
                this.marketingMeans2();
            }, 10);
    }
    /*全部评价输入框*/
    allPraiseChange = () => {
        this.setState({
            praise: '0',
            daiziPraiseValue: ''
        })
    }
    /*短信内容的提示*/
    showTip=()=>{
        // console.log('showTip开始执行');
        this.maxFontCount=301;
        var text = String(this.field.getValue('sms_template'));
        var text_sign = String(this.field.getValue('sms_sign'));
        // console.log(text,text_sign)
        // this.field.setValue('sms_template', text+" 【"+text_sign+"】");
        var length = 21+text.length+text_sign.length+3;
        var patt1 = new RegExp('【店铺的名称】','g');
        var patt3 = new RegExp('【客户姓名】','g');
        var result;
        var count;
        // console.log('patt1=',patt1,'patt3=',patt3,'patt1.exec(text)=',patt1.exec(text),'patt3.exec(text)=',patt3.exec(text),'(result = patt1.exec(text))!=null----->',(result = patt1.exec(text))!=null,'(result = patt3.exec(text))!=null----->',(result = patt3.exec(text))!=null)
        while((result = patt1.exec(text))!=null){
            length -=2;
        }
        while((result = patt3.exec(text))!=null){
            length -=2;
        }
        if(length<=67){
            // $("#oneLength").html(70);
            count=1;
        }else{
            // $("#oneLength").html(67);
            var r = (length)%70;
            if(r>0){
                count = Math.floor((length)/67+1) ;
            }else{
                count = Math.floor((length)/67);
            }
        }
        this.setState({
            textCount:text.length,
            signCount:text_sign.length,
            totalCount:length,
            smsCount:count,
            lessCount:count
        })
        if(this.field.getValue('sms_template').length>this.maxFontCount){
            var num=this.field.getValue('sms_template').substr(0,this.maxFontCount);
            this.field.setValue('sms_template',num);
            this.setState({
                textCount:text.length
            })
        }
        //findWords($("#sms_template").val(),$("#sms_sign").val());
    }
    /* 带字评价输入框 */
    daiziPraiseChange = () => {
        this.setState({
            praise: '1'
        })
    }
    /*跳转到下一页面*/
    marketingMeans2() {
        if (marnum == 0) {
            marnum--;
            if (this.state.result.cqflag == "1") {
                // console.log('cqflag == 1');
                location.href = LinkTool["redux-setPrize"] + "?type=sfadfas&ifover=nover&id=a&startTime=2015&endTime=2015&activityId=" + this.state.result.activityId + "&cqflag=" + this.state.result.cqflag + "&activityidcq=" + this.state.result.activityidcq;
            } else {
                // console.log('cqflag != 1');
                location.href = LinkTool["redux-setPrize"] + "?type=sfadfas&ifover=nover&id=a&startTime=2015&endTime=2015&activityId=" + this.state.result.activityId;
            }
        }
    }
    /* 获取表单数据(没有引用) */
    getValueFromFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    /*点击满就送搜索框搜索按钮*/
    onManSearch = () => {
        console.log('满就送搜索按钮点击')
        this.addGoodsf('1','',this.state.manSearchValue);
    }
    /*点击买就送搜索框搜索按钮*/
    onMaiSearch = () => {
        console.log('买就送搜索按钮点击')
        this.addGoodsb('1','',this.state.maiSearchValue);
    }
    /*点击评价送搜索框搜索按钮*/
    onPingSearch = () => {
        console.log('评价送搜索按钮点击')
        this.addGoodsp('1','',this.state.pingSearchValue);
    }
    /*点击分享送搜索框搜索按钮*/
    onFenSearch = () => {
        console.log('分享送搜索按钮点击')
        this.addGoodsd('',this.state.fenSearchValue);
    }
    /*修改满就送搜索框的值 */
    onManSearchChange = (value) => {
        this.setState({ manSearchValue: value });
    }
    /*修改买就送搜索框的值 */
    onMaiSearchChange = (value) => {
        this.setState({ maiSearchValue: value });
    }
    /*修改评价送搜索框的值 */
    onPingSearchChange = (value) => {
        this.setState({ pingSearchValue: value });
    }
    /*修改分享送搜索框的值 */
    onFenSearchChange = (value) => {
        this.setState({ fenSearchValue: value });
    }
    /*转换html为react组件并插入到dom*/
    // createMarkup = (html) => {
    //     return { __html: html };
    // }
    //买就送点击排除商品
    doAddGoodf=(flag,goodsId)=> {
        let newUsedList=[];
        let newGoods=[];
        const newGoodsInfo=this.state.manGoodsInfox.slice();
        if(this.field.getValue('market_send_goods_ids')!=''){
            newUsedList=this.field.getValue('market_send_goods_ids').split(',');
        }
        newGoodsInfo.map((item)=>{
            if(goodsId==item.numIid){
                var newItem = Object.assign({}, item, {used: !flag});
                newGoods.push(newItem)
            }else{
                newGoods.push(item)
            }
        })
        newGoods.map((item)=>{
            if(item.used && newUsedList.indexOf(String(item.numIid))<0){
                newUsedList.push(String(item.numIid));
            }
            if(!item.used && newUsedList.indexOf(String(item.numIid))>=0){
                var index = newUsedList.indexOf(String(item.numIid));
                if (index > -1) {
                    newUsedList.splice(index, 1);
                }
            }
        })
        this.setState({
            manGoodsInfox:newGoods
        })
        this.field.setValue('market_send_goods_ids',newUsedList.join(','));
        var atype = this.field.getValue('addgoodstype');
        if (atype == '0') {
            var gids =this.field.getValue('market_send_goods_ids');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    manGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                })
            } else {
                this.setState({
                    manGoodsids: '您已选择'+0+'个参与宝贝'
                })
            }
        } else {
            var gids = this.field.getValue('market_send_goods_idstp');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    manGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                })
            } else {
                this.setState({
                    manGoodsidsp: '您已排除'+0+'个宝贝'
                })
            }
        }
    }
    //满就送点击排除商品
    doAddGoodfp=(flag,goodsId)=> {
        let newUsedList=[];
        let newGoods=[];
        const newGoodsInfo=this.state.manGoodsInfop.slice();
        if(this.field.getValue('market_send_goods_idstp')!=''){
            newUsedList=this.field.getValue('market_send_goods_idstp').split(',');
        }
        newGoodsInfo.map((item)=>{
            if(goodsId==item.numIid){
                var newItem = Object.assign({}, item, {used: !flag});
                newGoods.push(newItem)
            }else{
                newGoods.push(item)
            }
        })
        newGoods.map((item)=>{
            if(item.used && newUsedList.indexOf(String(item.numIid))<0){
                newUsedList.push(String(item.numIid));
            }
            if(!item.used && newUsedList.indexOf(String(item.numIid))>=0){
                var index = newUsedList.indexOf(String(item.numIid));
                if (index > -1) {
                    newUsedList.splice(index, 1);
                }
            }
        })
        this.setState({
            manGoodsInfop:newGoods
        })
        this.field.setValue('market_send_goods_idstp',newUsedList.join(','));
        var atype = this.field.getValue('addgoodstype');
        if (atype == '0') {
            var gids =this.field.getValue('market_send_goods_ids');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    manGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                })
            } else {
                this.setState({
                    manGoodsids: '您已选择'+0+'个参与宝贝'
                })
            }
        } else {
            var gids = this.field.getValue('market_send_goods_idstp');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    manGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                })
            } else {
                this.setState({
                    manGoodsidsp: '您已排除'+0+'个宝贝'
                })
            }
        }
    }
    //买就送点击选择商品
    doAddGoodb=(flag,goodsId)=> {
        let newUsedList=[];
        let newGoods=[];
        const newGoodsInfo=this.state.maiGoodsInfox.slice();
        if(this.field.getValue('market_send_goods_idsb')!=''){
            newUsedList=this.field.getValue('market_send_goods_idsb').split(',');
        }
        newGoodsInfo.map((item)=>{
            if(goodsId==item.numIid){
                var newItem = Object.assign({}, item, {used: !flag});
                newGoods.push(newItem)
            }else{
                newGoods.push(item)
            }
        })
        newGoods.map((item)=>{
            if(item.used && newUsedList.indexOf(String(item.numIid))<0){
                newUsedList.push(String(item.numIid));
            }
            if(!item.used && newUsedList.indexOf(String(item.numIid))>=0){
                var index = newUsedList.indexOf(String(item.numIid));
                if (index > -1) {
                    newUsedList.splice(index, 1);
                }
            }
        })

        this.setState({
            maiGoodsInfox:newGoods
        })
        this.field.setValue('market_send_goods_idsb',newUsedList.join(','));
        var atype = this.field.getValue('addgoodstypeb');
        if (atype == '0') {
            var gids =this.field.getValue('market_send_goods_idsb');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    maiGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                })
            } else {
                this.setState({
                    maiGoodsids: '您已选择'+0+'个参与宝贝'
                })
            }
        } else {
            var gids = this.field.getValue('market_send_goods_idsbtp');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    maiGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                })
            } else {
                this.setState({
                    maiGoodsidsp: '您已排除'+0+'个宝贝'
                })
            }
        }
    }
    //买就送点击排除商品
    doAddGoodbp=(flag,goodsId)=> {
        let newUsedList=[];
        let newGoods=[];
        const newGoodsInfo=this.state.maiGoodsInfop.slice();
        if(this.field.getValue('market_send_goods_idsbtp')!=''){
            newUsedList=this.field.getValue('market_send_goods_idsbtp').split(',');
        }
        newGoodsInfo.map((item)=>{
            if(goodsId==item.numIid){
                var newItem = Object.assign({}, item, {used: !flag});
                newGoods.push(newItem)
            }else{
                newGoods.push(item)
            }
        })
        newGoods.map((item)=>{
            if(item.used && newUsedList.indexOf(String(item.numIid))<0){
                newUsedList.push(String(item.numIid));
            }
            if(!item.used && newUsedList.indexOf(String(item.numIid))>=0){
                var index = newUsedList.indexOf(String(item.numIid));
                if (index > -1) {
                    newUsedList.splice(index, 1);
                }
            }
        })
        this.setState({
            maiGoodsInfop:newGoods
        })
        this.field.setValue('market_send_goods_idsbtp',newUsedList.join(','));
        var atype = this.field.getValue('addgoodstypeb');
        if (atype == '0') {
            var gids =this.field.getValue('market_send_goods_idsb');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    maiGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                })
            } else {
                this.setState({
                    maiGoodsids: '您已选择'+0+'个参与宝贝'
                })
            }
        } else {
            var gids = this.field.getValue('market_send_goods_idsbtp');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    maiGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                })
            } else {
                this.setState({
                    maiGoodsidsp: '您已排除'+0+'个宝贝'
                })
            }
        }
    }
    doAddGoodp=(flag,goodsId)=> {
        let newUsedList=[];
        let newGoods=[];
        const newGoodsInfo=this.state.pingGoodsInfox.slice();
        if(this.field.getValue('market_send_goods_idsp')!=''){
            newUsedList=this.field.getValue('market_send_goods_idsp').split(',');
        }
        newGoodsInfo.map((item)=>{
            if(goodsId==item.numIid){
                var newItem = Object.assign({}, item, {used: !flag});
                newGoods.push(newItem)
            }else{
                newGoods.push(item)
            }
        })
        newGoods.map((item)=>{
            if(item.used && newUsedList.indexOf(String(item.numIid))<0){
                newUsedList.push(String(item.numIid));
            }
            if(!item.used && newUsedList.indexOf(String(item.numIid))>=0){
                var index = newUsedList.indexOf(String(item.numIid));
                if (index > -1) {
                    newUsedList.splice(index, 1);
                }
            }
        })
        this.setState({
            pingGoodsInfox:newGoods
        })
        this.field.setValue('market_send_goods_idsp',newUsedList.join(','));
        var atype = this.field.getValue('addgoodstypep');
        if (atype == '0') {
            var gids =this.field.getValue('market_send_goods_idsp');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    pingGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                })
            } else {
                this.setState({
                    pingGoodsids: '您已选择'+0+'个参与宝贝'
                })
            }
        } else {
            var gids = this.field.getValue('market_send_goods_idsptp');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    pingGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                })
            } else {
                this.setState({
                    pingGoodsidsp: '您已排除'+0+'个宝贝'
                })
            }
        }
    }
    doAddGoodpp=(flag,goodsId)=> {
        let newUsedList=[];
        let newGoods=[];
        const newGoodsInfo=this.state.pingGoodsInfop.slice();
        if(this.field.getValue('market_send_goods_idsptp')!=''){
            newUsedList=this.field.getValue('market_send_goods_idsptp').split(',');
        }
        newGoodsInfo.map((item)=>{
            if(goodsId==item.numIid){
                var newItem = Object.assign({}, item, {used: !flag});
                newGoods.push(newItem)
            }else{
                newGoods.push(item)
            }
        })
        newGoods.map((item)=>{
            if(item.used && newUsedList.indexOf(String(item.numIid))<0){
                newUsedList.push(String(item.numIid));
            }
            if(!item.used && newUsedList.indexOf(String(item.numIid))>=0){
                var index = newUsedList.indexOf(String(item.numIid));
                if (index > -1) {
                    newUsedList.splice(index, 1);
                }
            }
        })
        this.setState({
            pingGoodsInfop:newGoods
        })
        this.field.setValue('market_send_goods_idsptp',newUsedList.join(','));
        var atype = this.field.getValue('addgoodstypep');
        if (atype == '0') {
            var gids =this.field.getValue('market_send_goods_idsp');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    pingGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                })
            } else {
                this.setState({
                    pingGoodsids: '您已选择'+0+'个参与宝贝'
                })
            }
        } else {
            var gids = this.field.getValue('market_send_goods_idsptp');
            if (gids != '') {
                var goodsids = String(gids).split(",");
                this.setState({
                    pingGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                })
            } else {
                this.setState({
                    pingGoodsidsp: '您已排除'+0+'个宝贝'
                })
            }
        }
    }
    doAddGoodd=(flag,goodsId)=> {
        // console.log('flag=',flag)
        let newUsedList=[];
        let newGoods=[];
        const newGoodsInfo=this.state.fenGoodsInfo.slice();
        if(this.field.getValue('market_send_goods_idsd')!=''){
            newUsedList=this.field.getValue('market_send_goods_idsd').split(',');
        }
        if(!flag && newUsedList.length!=0){
            Dialog.alert({content:"最大可以输入1个商品"});
            return ;
        }
        newGoodsInfo.map((item)=>{
            if(goodsId==item.numIid){
                if(flag){
                    var newItem = Object.assign({}, item, {used: false});
                    newGoods.push(newItem)
                }else{
                    var newItem = Object.assign({}, item, {used: true});
                    newGoods.push(newItem)
                }
            }else{
                var newItem = Object.assign({}, item, {used: false});
                newGoods.push(newItem)
            }
        })
        newGoods.map((item)=>{
            if(item.used && newUsedList.indexOf(String(item.numIid))<0){
                newUsedList.push(String(item.numIid));
            }
            if(!item.used && newUsedList.indexOf(String(item.numIid))>=0){
                var index = newUsedList.indexOf(String(item.numIid));
                if (index > -1) {
                    newUsedList.splice(index, 1);
                }
            }
        })
        this.setState({
            fenGoodsInfo:newGoods
        })
        this.field.setValue('market_send_goods_idsd',newUsedList.join(','));
        // console.log('market_send_goods_idsd:',this.field.getValue('market_send_goods_idsd'))
    }
    onPraiseWLimitFocus(value, e) {
        // console.log('input:',value);
        // console.log('e:',e.target);
        this.setState({
            praise: '1',
            daiziPraiseValue: value
        })
        // console.log('praise:',this.state.praise,'daiziPraise:',this.state.daiziPraiseValue);
    }
    onFenxiangChange(value) {
        console.log('onFenxiangChange', value);
        this.setState({
            fenRadio: value
        })
    }
    onPingjiaChange = (value) => {
        console.log('onPingjiaChange_value:' + value);
        this.setSate({
            praise: value
        })
    }

    onManSendUnitChange(type) {
        let fullType = 0;
        if (type != 1) {
            var optLimit = this.refs.fullType.props.value;
            if (optLimit == 0) {
                type = 0;
            } else {
                type = 1;
            }
        }
        if (type == 0) {
            fullType = 0;
        } else {
            fullType = 1;
        }
        // console.log('onManSendUnitChange:', fullType);
        this.setState({
            fullType: fullType
        })
    }
    getShortlinkcheck=()=>{
        $.ajax({
            type : apienv=='local'?'GET':'POST',
            url : apimap[apienv]['ShortLinkCreate'],
            data :  apienv=='local'?'':{'activityId':this.state.result.activityId},
            dataType : "json",
            success : function(data, textStatus, jqXHR) {
                if(data.rlt == 0) {
                    this.setState({
                        shortlinkcheck:''
                    });
                } else {
                    this.setState({
                        shortlinkcheck:'生成抽奖短链接时发生错误，请联系客服。'
                    });
                    Dialog.alert({content:'生成抽奖短链接时发生错误，请联系客服。'});
                }
            }
        });
    }
    switchBtn = (value) => {
        // console.log('switchBtn',value);
        if (value) {
            this.smscat=1;
            this.setState({
                sms_content_bianji: 'block'
            })
        } else {
            this.getShortlinkcheck();
            this.smscat=0;
            this.field.setValue('switchBtn', '8');
            this.setState({
                sms_content_bianji: 'none'
            })
        }
        // console.log('this.smscat',this.smscat)
    }
    //  var ifquan="0";
    /*点击满就送部分商品按钮 */
    addGoodsf = (type,page,searchValue) => {
        this.setState({
            defaultManSendCallback:this.field.getValue('addgoodstype'),
        })
        if (type == 0) {
            this.setState({ ifquan: '1', manSendType: 'all', manSendDialogVisible: false })
        } else if (type == 1) {
            this.setState({ ifquan: '0', manSendType: 'some', manSendDialogVisible: true })
            if (apienv != 'local') {
                $.post(apimap[apienv]['FullGetGoodsListgenxt'], { 'page': page, 'fid': '', 'search': searchValue, 'goodsIds': this.field.getValue('market_send_goods_ids'), 'goodsIdsp': this.field.getValue('market_send_goods_idstp'), 'fromType': 'market', 'addtype': this.field.getValue('addgoodstype') }, function (data) {
                    let goodsInfo=[];
                    let goodsArr=[];
                    let goodsIds = null;
                    if(this.field.getValue('addgoodstype')=='0'){
                        goodsIds=this.field.getValue('market_send_goods_ids')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goods.map((item)=>{
                            if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let manGoodsInfo = goodsInfo.slice();
                        this.setState({
                            manGoodsInfox:manGoodsInfo
                        })
                        this.field.setValue('market_send_goods_ids',goodsArr.join(','));
                    }else{
                        goodsIds=this.field.getValue('market_send_goods_idstp')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goodsp.map((item)=>{
                           if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let manGoodsInfo = goodsInfo.slice();
                        this.setState({
                            manGoodsInfop:manGoodsInfo
                        })
                        this.field.setValue('market_send_goods_idstp',goodsArr.join(','));
                    }
                    this.setState({
                        manGoodsData:data,
                    });
                    // console.log('买就送选择商品的类型为:',this.field.getValue('addgoodstype')=='0'?'选择商品':'排除商品','选择商品包含:',this.field.getValue('market_send_goods_ids'),'排除商品包含:',this.field.getValue('market_send_goods_idstp'))
                    if (this.field.getValue('addgoodstype') == '1') {
                        let gids=this.field.getValue('market_send_goods_idstp');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                manGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                            })
                        }else{
                            this.setState({
                                manGoodsidsp: '您已排除'+0+'个宝贝'
                            })
                        }
                    }
                    if (this.field.getValue('addgoodstype') == '0') {
                        let gids=this.field.getValue('market_send_goods_ids');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                manGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                            })
                        }else{
                            this.setState({
                                manGoodsids: '您已选择'+0+'个参与宝贝'
                            })
                        }
                    }
                }.bind(this), 'json');
            } else {
                $.get(apimap[apienv][searchValue==''?'FullGetGoodsListgenxt'+page:'FullGetGoodsListSearch'], function (data) {
                    let goodsInfo=[];
                    let goodsArr=[];
                    let goodsIds = null;
                    if(this.field.getValue('addgoodstype')=='0'){
                        goodsIds=this.field.getValue('market_send_goods_ids')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goods.map((item)=>{
                            if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let manGoodsInfo = goodsInfo.slice();
                        this.setState({
                            manGoodsInfox:manGoodsInfo
                        })
                        this.field.setValue('market_send_goods_ids',goodsArr.join(','));
                    }else{
                        goodsIds=this.field.getValue('market_send_goods_idstp')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goodsp.map((item)=>{
                           if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let manGoodsInfo = goodsInfo.slice();
                        this.setState({
                            manGoodsInfop:manGoodsInfo
                        })
                        this.field.setValue('market_send_goods_idstp',goodsArr.join(','));
                    }
                    this.setState({
                        manGoodsData:data,
                    });
                    // console.log('买就送选择商品的类型为:',this.field.getValue('addgoodstype')=='0'?'选择商品':'排除商品','选择商品包含:',this.field.getValue('market_send_goods_ids'),'排除商品包含:',this.field.getValue('market_send_goods_idstp'))
                    if (this.field.getValue('addgoodstype') == '1') {
                        let gids=this.field.getValue('market_send_goods_idstp');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                manGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                            })
                        }else{
                            this.setState({
                                manGoodsidsp: '您已排除'+0+'个宝贝'
                            })
                        }
                    }
                    if (this.field.getValue('addgoodstype') == '0') {
                        let gids=this.field.getValue('market_send_goods_ids');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                manGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                            })
                        }else{
                            this.setState({
                                manGoodsids: '您已选择'+0+'个参与宝贝'
                            })
                        }
                    }
                }.bind(this));
            }
        }
    }
    /*点击买就送部分商品按钮 */
    addGoodsb = (type,page,searchValue) => {
        this.setState({
            defaultMaiSendCallback:this.field.getValue('addgoodstypeb'),
        })
        if (type == 0) {
            this.setState({ ifquanb: '1', maiSendType: 'all', maiSendDialogVisible: false })
        } else if (type == 1) {
            this.setState({ ifquanb: '0', maiSendType: 'some', maiSendDialogVisible: true })
            if (apienv != 'local') {
                $.post(apimap[apienv]['FullGetGoodsListgenxtt'], { 'page': page, 'fid': '', 'search': searchValue, 'goodsIds': this.field.getValue('market_send_goods_idsb'), 'goodsIdsp': this.field.getValue('market_send_goods_idsbtp'), 'fromType': 'market', 'addtype': this.field.getValue('addgoodstypeb') }, function (data) {
                    let goodsInfo=[];
                    let goodsArr=[];
                    let goodsIds = null;
                    if(this.field.getValue('addgoodstypeb')=='0'){
                        goodsIds=this.field.getValue('market_send_goods_idsb')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goods.map((item)=>{
                            if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let maiGoodsInfo = goodsInfo.slice();
                        this.setState({
                            maiGoodsInfox:maiGoodsInfo
                        })
                        this.field.setValue('market_send_goods_idsb',goodsArr.join(','));
                    }else{
                        goodsIds=this.field.getValue('market_send_goods_idsbtp')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goodsp.map((item)=>{
                           if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let maiGoodsInfo = goodsInfo.slice();
                        this.setState({
                            maiGoodsInfop:maiGoodsInfo
                        })
                        this.field.setValue('market_send_goods_idsbtp',goodsArr.join(','));
                    }
                    this.setState({
                        maiGoodsListData:data,
                    });
                    // console.log('买就送选择商品的类型为:',this.field.getValue('addgoodstypeb')=='0'?'选择商品':'排除商品','选择商品包含:',this.field.getValue('market_send_goods_idsb'),'排除商品包含:',this.field.getValue('market_send_goods_idsbtp'))
                    if (this.field.getValue('addgoodstypeb') == '1') {
                        let gids=this.field.getValue('market_send_goods_idsbtp');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                maiGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                            })
                        }else{
                            this.setState({
                                maiGoodsidsp: '您已排除'+0+'个宝贝'
                            })
                        }
                    }
                    if (this.field.getValue('addgoodstypeb') == '0') {
                        let gids=this.field.getValue('market_send_goods_idsb');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                maiGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                            })
                        }else{
                            this.setState({
                                maiGoodsids: '您已选择'+0+'个参与宝贝'
                            })
                        }
                    }
                }.bind(this), 'json');
            } else {
                $.get(apimap[apienv][searchValue==''?'FullGetGoodsListgenxt'+page:'FullGetGoodsListSearch'], function (data) {
                    let goodsInfo=[];
                    let goodsArr=[];
                    let goodsIds = null;
                    if(this.field.getValue('addgoodstypeb')=='0'){
                        goodsIds=this.field.getValue('market_send_goods_idsb')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goods.map((item)=>{
                            if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let maiGoodsInfo = goodsInfo.slice();
                        this.setState({
                            maiGoodsInfox:maiGoodsInfo
                        })
                        this.field.setValue('market_send_goods_idsb',goodsArr.join(','));
                    }else{
                        goodsIds=this.field.getValue('market_send_goods_idsbtp')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goodsp.map((item)=>{
                           if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let maiGoodsInfo = goodsInfo.slice();
                        this.setState({
                            maiGoodsInfop:maiGoodsInfo
                        })
                        this.field.setValue('market_send_goods_idsbtp',goodsArr.join(','));
                    }
                    this.setState({
                        maiGoodsData:data,
                    });
                    // console.log('买就送选择商品的类型为:',this.field.getValue('addgoodstypeb')=='0'?'选择商品':'排除商品','选择商品包含:',this.field.getValue('market_send_goods_idsb'),'排除商品包含:',this.field.getValue('market_send_goods_idsbtp'))
                    if (this.field.getValue('addgoodstypeb') == '1') {
                        let gids=this.field.getValue('market_send_goods_idsbtp');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                maiGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                            })
                        }else{
                            this.setState({
                                maiGoodsidsp: '您已排除'+0+'个宝贝'
                            })
                        }
                    }
                    if (this.field.getValue('addgoodstypeb') == '0') {
                        let gids=this.field.getValue('market_send_goods_idsb');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                maiGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                            })
                        }else{
                            this.setState({
                                maiGoodsids: '您已选择'+0+'个参与宝贝'
                            })
                        }
                    }
                }.bind(this));
            }
        }
    }
    /*点击评价送部分商品按钮 */
    addGoodsp = (type,page,searchValue) => {
        // console.log('评价部分商品点击获取ids:',this.field.getValue('market_send_goods_idsp'),this.field.getValue('market_send_goods_idsptp'))
        this.setState({
            defaultPingSendCallback:this.field.getValue('addgoodstypep'),
        })
        if (type == 0) {
            this.setState({ ifquanp: '1', pingSendType: 'all', pingSendDialogVisible: false })
        } else if (type == 1) {
            this.setState({ ifquanp: '0', pingSendType: 'some', pingSendDialogVisible: true })
            if (apienv != 'local') {
                $.post(apimap[apienv]['FullGetGoodsListgenxttt'], { 'page': page, 'fid': '',  'search': searchValue, 'goodsIds': this.field.getValue('market_send_goods_idsp'), 'goodsIdsp': this.field.getValue('market_send_goods_idsptp'), 'fromType': 'market', 'addtype': this.field.getValue('addgoodstypep') }, function (data) {
                    let goodsInfo=[];
                    let goodsArr=[];
                    let goodsIds = null;
                    if(this.field.getValue('addgoodstypep')=='0'){
                        goodsIds=this.field.getValue('market_send_goods_idsp')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goods.map((item)=>{
                            if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let pingGoodsInfo = goodsInfo.slice();
                        this.setState({
                            pingGoodsInfox:pingGoodsInfo
                        })
                        this.field.setValue('market_send_goods_idsp',goodsArr.join(','));
                    }else{
                        goodsIds=this.field.getValue('market_send_goods_idsptp')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goodsp.map((item)=>{
                           if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let pingGoodsInfo = goodsInfo.slice();
                        this.setState({
                            pingGoodsInfop:pingGoodsInfo
                        })
                        this.field.setValue('market_send_goods_idsptp',goodsArr.join(','));
                    }
                    this.setState({
                        pingGoodsData:data,
                    });
                    // console.log('买就送选择商品的类型为:',this.field.getValue('addgoodstypep')=='0'?'选择商品':'排除商品','选择商品包含:',this.field.getValue('market_send_goods_idsp'),'排除商品包含:',this.field.getValue('market_send_goods_idsptp'))
                    if (this.field.getValue('addgoodstypep') == '1') {
                        let gids=this.field.getValue('market_send_goods_idsptp');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                pingGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                            })
                        }else{
                            this.setState({
                                pingGoodsidsp: '您已排除'+0+'个宝贝'
                            })
                        }
                    }
                    if (this.field.getValue('addgoodstypep') == '0') {
                        let gids=this.field.getValue('market_send_goods_idsp');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                pingGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                            })
                        }else{
                            this.setState({
                                pingGoodsids: '您已选择'+0+'个参与宝贝'
                            })
                        }
                    }
                }.bind(this), 'json');
            } else {
                $.get(apimap[apienv][searchValue==''?'FullGetGoodsListgenxt'+page:'FullGetGoodsListSearch'], function (data) {
                    let goodsInfo=[];
                    let goodsArr=[];
                    let goodsIds = null;
                    if(this.field.getValue('addgoodstypep')=='0'){
                        goodsIds=this.field.getValue('market_send_goods_idsp')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goods.map((item)=>{
                            if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let pingGoodsInfo = goodsInfo.slice();
                        this.setState({
                            pingGoodsInfox:pingGoodsInfo
                        })
                        this.field.setValue('market_send_goods_idsp',goodsArr.join(','));
                    }else{
                        goodsIds=this.field.getValue('market_send_goods_idsptp')
                        if(goodsIds!=''){
                            goodsArr=goodsIds.split(',');
                        }
                        data.goodsp.map((item)=>{
                           if(goodsArr.indexOf(String(item.numIid))>=0){
                                var newItem = Object.assign({}, item, {used: true});
                                goodsInfo.push(newItem);
                            }else{
                                var newItem = Object.assign({}, item, {used: false});
                                goodsInfo.push(newItem);
                            }
                        })
                        let pingGoodsInfo = goodsInfo.slice();
                        this.setState({
                            pingGoodsInfop:pingGoodsInfo
                        })
                        this.field.setValue('market_send_goods_idsptp',goodsArr.join(','));
                    }
                    this.setState({
                        pingGoodsData:data,
                    });
                    // console.log('买就送选择商品的类型为:',this.field.getValue('addgoodstypep')=='0'?'选择商品':'排除商品','选择商品包含:',this.field.getValue('market_send_goods_idsp'),'排除商品包含:',this.field.getValue('market_send_goods_idsptp'))
                    if (this.field.getValue('addgoodstypep') == '1') {
                        let gids=this.field.getValue('market_send_goods_idsptp');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                pingGoodsidsp: '您已排除'+goodsids.length+'个宝贝'
                            })
                        }else{
                            this.setState({
                                pingGoodsidsp: '您已排除'+0+'个宝贝'
                            })
                        }
                    }
                    if (this.field.getValue('addgoodstypep') == '0') {
                        let gids=this.field.getValue('market_send_goods_idsp');
                        if(gids!=''){
                            let goodsids = String(gids).split(',');
                            this.setState({
                                pingGoodsids: '您已选择'+goodsids.length+'个参与宝贝'
                            })
                        }else{
                            this.setState({
                                pingGoodsids: '您已选择'+0+'个参与宝贝'
                            })
                        }
                    }
                }.bind(this));
            }
        }
    }
    addGoodsd = (page,searchValue) => {
        this.setState({
            fenSendDialogVisible: true
        })
        console.log('分享部分商品点击获取ids:',this.field.getValue('market_send_goods_idsd'))
        if (apienv != 'local') {
            $.post(apimap[apienv]['FullGetGoodsListgenx'], { 'page': page, 'fid': '',  'search': searchValue, 'goodsIds': this.field.getValue('market_send_goods_idsp'), 'fromType': 'market'}, function (data) {
                this.setState({
                    fenGoodsData:data,
                });
                let goodsInfo=[];
                let goodsArr=[];
                let goodsIds = null;
                goodsIds=this.field.getValue('market_send_goods_idsd')
                if(goodsIds!=''){
                    goodsArr=goodsIds.split(',');
                }
                data.goods.map((item)=>{
                    if(goodsArr.indexOf(String(item.numIid))>=0){
                        var newItem = Object.assign({}, item, {used: true});
                        goodsInfo.push(newItem);
                    }else{
                        var newItem = Object.assign({}, item, {used: false});
                        goodsInfo.push(newItem);
                    }
                })
                let fenGoodsInfo = goodsInfo.slice();
                this.setState({
                    fenGoodsInfo:fenGoodsInfo
                })
                this.field.setValue('market_send_goods_idsd',goodsArr.join(','));
            }.bind(this), 'json');
        } else {
            $.get(apimap[apienv][searchValue==''?'FullGetGoodsListgenxt'+page:'FullGetGoodsListSearch'], function (data) {
                this.setState({
                    fenGoodsData:data,
                });
                let goodsInfo=[];
                let goodsArr=[];
                let goodsIds = null;
                goodsIds=this.field.getValue('market_send_goods_idsd')
                if(goodsIds!=''){
                    goodsArr=goodsIds.split(',');
                }
                data.goods.map((item)=>{
                    if(goodsArr.indexOf(String(item.numIid))>=0){
                        var newItem = Object.assign({}, item, {used: true});
                        goodsInfo.push(newItem);
                    }else{
                        var newItem = Object.assign({}, item, {used: false});
                        goodsInfo.push(newItem);
                    }
                })
                let fenGoodsInfo = goodsInfo.slice();
                this.setState({
                    fenGoodsInfo:fenGoodsInfo
                })
                this.field.setValue('market_send_goods_idsd',goodsArr.join(','));
            }.bind(this));
        }
    }
    /* 满就送操作*/
    manSomeButtonState = (id) => {
        return <span>点击排除</span>
        // if(this.state.id){
        //     return 'true';
        // }else{
        //     return 'false';
        // }
        console.log('-----------manSomeButtonState-----------------------' + id);
        // this.setState({
        //     ['item'+id]:true
        // })

        // console.log('-----------------state=',this.state);
        // return <span>{'item'+id}</span>

    }
    /* 悬浮图片显示 */
    qusInfoOver = () => {
        // console.log('1111');
        this.setState({
            qusInfoDisplay: 'block'
        })
    }
    /* 悬浮图片隐藏 */
    qusInfoOut = () => {
        this.setState({
            qusInfoDisplay: 'none'
        })
    }
    //满就送排除部分商品
    renderManItemOprationp = (value, index, record, context) => {
        return <Button type={record.used?'normal':'secondary'} onClick={()=>this.doAddGoodfp(record.used,record.numIid)}>
            {record.used?'取消排除':'点击排除'}
        </Button>
    }
    //满就送选择部分商品
    renderManItemOprationx = (value, index, record, context) => {
         return <Button type={record.used?'normal':'secondary'} onClick={()=>this.doAddGoodf(record.used,record.numIid)}>
            {record.used?'取消参加':'点击参加'}
        </Button>
    }
    //买就送排除部分商品
    renderMaiItemOprationp = (value, index, record, context) => {
        return <Button type={record.used?'normal':'secondary'} onClick={()=>this.doAddGoodbp(record.used,record.numIid)}>
            {record.used?'取消排除':'点击排除'}
        </Button>
    }
    //买就送选择部分商品
    renderMaiItemOprationx = (value, index, record, context) => {
        return <Button type={record.used?'normal':'secondary'} onClick={()=>this.doAddGoodb(record.used,record.numIid)}>
            {record.used?'取消参加':'点击参加'}
        </Button>
    }
    //评价送排除部分商品
    renderPingItemOprationp = (value, index, record, context) => {
        return <Button type={record.used?'normal':'secondary'} onClick={()=>this.doAddGoodpp(record.used,record.numIid)}>
            {record.used?'取消排除':'点击排除'}
        </Button>
    }
    //评价送选择部分商品
    renderPingItemOprationx = (value, index, record, context) => {
        return <Button type={record.used?'normal':'secondary'} onClick={()=>this.doAddGoodp(record.used,record.numIid)}>
            {record.used?'取消参加':'点击参加'}
        </Button>
    }
    //分享送设置分享商品
    renderFenItemOpration = (value, index, record, context) => {
        return <Button type={record.used?'normal':'secondary'} onClick={()=>this.doAddGoodd(record.used,record.numIid)}>
            {record.used?'取消':'添加'}
        </Button>
    }
    render() {
        this.addgoodstype='1';
        const renderItemPicture = (value, index, record, context) => {
            // console.log('renderItemPicture:value:',value,'index:', index, 'record:',record,'context:', context)
            return <img width='50' height='50' src={record.picUrl} />;
        }
        const renderItemName = (value, index, record, context) => {
            // console.log('renderItemName:value:',value,'index:', index, 'record:',record,'context:', context)
            return <span>{record.title}</span>;
        }
        const renderItemPrice = (value, index, record, context) => {
            // console.log('renderItemPrice:value:',value,'index:', index, 'record:',record,'context:', context)
            return <span>{record.price}</span>;
        }
        const init = this.field.init,
        //FormItem样式
        formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 }
        },
        formItemLayout1 = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        },
        //添加店铺名称
        onShopNameClick=()=>{
            this.field.setValue('sms_template',String(this.field.getValue('sms_template'))+'【店铺的名称】');
            this.showTip();
        },
        //添加卖家名称
        onBuyerNameClick=()=>{
            this.field.setValue('sms_template',String(this.field.getValue('sms_template'))+'【买家名称】');
            this.showTip();
        },
        manSendDialogClose = () => {
            this.setState({
                manSendDialogVisible: false
            });
            console.log('manSendDialogClose');
        },
        maiSendDialogClose = () => {
            this.setState({
                maiSendDialogVisible: false
            });
            console.log('maiSendDialogClose');
        },
        pingSendDialogClose = () => {
            this.setState({
                pingSendDialogVisible: false
            });
            console.log('pingSendDialogClose');
        },
        fenSendDialogClose = () => {
            this.setState({
                fenSendDialogVisible: false
            });
            console.log('fenSendDialogClose');
        },
        marketingTypeChangedClose = () => {
            this.setState({
                marketingTypeChanged: false
            });
            console.log('marketingTypeChangedClose');
        },
        manSendCallback = (key) => {
            this.setState({
                defaultManSendCallback:key
            });
            this.field.setValue('addgoodstype',key);
            console.log(key=='1'?'满就送切换到排除':'满就送切换到选择')
            this.addGoodsf('1',this.state.manSomeCurrentPage,'');
        },
        maiSendCallback = (key) => {
            this.setState({
                defaultMaiSendCallback:key
            });
            this.field.setValue('addgoodstypeb',key);
            console.log(key=='1'?'买就送切换到排除':'买就送切换到选择')
            this.addGoodsb('1',this.state.maiSomeCurrentPage,'');
        },
        pingSendCallback = (key) => {
            this.setState({
                defaultPingSendCallback:key
            });
            this.field.setValue('addgoodstypep',key);
            console.log(key=='1'?'评价送切换到排除':'评价送切换到选择')
            this.addGoodsp('1',this.state.pingSomeCurrentPage,'');
        };

        const manFooter = <Button type='normal' onClick={manSendDialogClose}>关闭</Button>;
        const maiFooter = <Button type='normal' onClick={maiSendDialogClose}>关闭</Button>;
        const pingFooter = <Button type='normal' onClick={pingSendDialogClose}>关闭</Button>;
        const fenFooter = <Button type='normal' onClick={fenSendDialogClose}>关闭</Button>;
        const allTitle = <h2 style={{padding:'0',margin:'0',fontWeight:'bold'}}>选择商品</h2>;
        const changedTitle = <h4><a href="javascript:void(0)" title="关闭窗口"></a>提示</h4>
        // const marketingTypeChangedFooter = <Button type='normal' onClick={marketingTypeChangedClose}>关闭</Button>;
        const marketingTypeChangedFooter = (<div className="tc">
            <a href="javascript:void(0)" onClick={this.saveNext}>确 定</a>
        </div>);
        //国际化设置
        const sD = {
            placeholder: '活动开始日期',
            monthPlaceholder: '测试',
            rangeStartPlaceholder: '测试',
            rangeEndPlaceholder: '测试',
            panelMonthPlaceholder: 'YYYY-MM',
            panelDatePlaceholder: 'YYYY-MM-DD',
            panelTimePlaceholder: 'HH:mm:ss',
            ok: '确 定',
            clear: '清除'
        };
        const sT = {
            placeholder: '活动开始时间'
        };
        const eD = {
            placeholder: '活动结束日期'
        };
        const eT = {
            placeholder: '活动结束时间'
        };
        const sdisabledDate = function (theDate) {
            return theDate && theDate <= (new Date().getTime() - 86400000);
        };
        const edisabledDate = function (theDate) {
            return theDate && theDate <= (new Date().getTime() - 86400000);
        };
        const sdisabledHours = () => {
            let newDate = new Date();
            let hoursArr = [];
            // console.log('sdisabledHours');
            // console.log('选择时间:', Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'yyyy-MM-dd hh:mm:ss'));
            // console.log('当前时间:', Tools.formatDate(Tools.formatDate(newDate, 'yyyy-MM-dd hh:mm:ss')));
            if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'yyyy-MM-dd') < Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间<当前时间");
                for (let i = 0; i <= 23; i++) {
                    hoursArr.push(i);
                }
            }
            if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'yyyy-MM-dd') == Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间=当前时间");
                for (let i = 0; i <= 23; i++) {
                    if (i < newDate.getHours()) {
                        hoursArr.push(i);
                    }
                }
            }
            return hoursArr;
        };
        const sdisabledMinutes = () => {
            // console.log('sdisabledMinutes');
            let newDate = new Date();
            let minutesArr = [];
            if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'yyyy-MM-dd') == Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间=当前时间");
                if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'hh') == Tools.formatDate(newDate, 'hh')) {
                    // console.log("时->选择时间=当前时间");
                    for (let i = 0; i <= 59; i++) {
                        if (i < newDate.getMinutes()) {
                            minutesArr.push(i);
                        }
                    }
                }
                if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'hh') < Tools.formatDate(newDate, 'hh')) {
                    // console.log("时->选择时间<当前时间");
                    for (let i = 0; i <= 59; i++) {
                        minutesArr.push(i);
                    }
                }

            }
            if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'yyyy-MM-dd') < Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间<当前时间");
                for (let i = 0; i <= 59; i++) {
                    minutesArr.push(i);
                }
            }
            return minutesArr;
        };

        const sdisabledSeconds = () => {
            // console.log('sdisabledSeconds');
            let newDate = new Date();
            let secondsArr = [];
            if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'yyyy-MM-dd') == Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间=当前时间");
                if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'hh') == Tools.formatDate(newDate, 'hh')) {
                    // console.log("时->选择时间=当前时间");
                    if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'mm') == Tools.formatDate(newDate, 'mm')) {
                        // console.log("分->选择时间=当前时间");
                        for (let i = 0; i <= 59; i++) {
                            if (i < newDate.getSeconds()) {
                                secondsArr.push(i);
                            }
                        }
                    }
                    if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'mm') < Tools.formatDate(newDate, 'mm')) {
                        // console.log("分->选择时间<当前时间");
                        for (let i = 0; i <= 59; i++) {
                            secondsArr.push(i);
                        }
                    }
                }
                if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'hh') < Tools.formatDate(newDate, 'hh')) {
                    // console.log("时->选择时间<当前时间");
                    for (let i = 0; i <= 59; i++) {
                        secondsArr.push(i);
                    }
                }

            }
            if (Tools.formatDate(Tools.formatDate(this.refs.startDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.startTime.props.value, 'yyyy-MM-dd') < Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间<当前时间");
                for (let i = 0; i <= 59; i++) {
                    secondsArr.push(i);
                }
            }
            return secondsArr;
        }

        const edisabledHours = () => {
            let newDate = new Date();
            let hoursArr = [];
            // console.log('edisabledHours');
            if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'yyyy-MM-dd') < Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间<当前时间");
                for (let i = 0; i <= 23; i++) {
                    hoursArr.push(i);
                }
            }
            if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'yyyy-MM-dd') == Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间<当前时间");
                for (let i = 0; i <= 23; i++) {
                    if (i < newDate.getHours()) {
                        hoursArr.push(i);
                    }
                }
            }
            return hoursArr;
        };
        const edisabledMinutes = () => {
            let newDate = new Date();
            let minutesArr = [];
            // console.log('edisabledMinutes');
            if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'yyyy-MM-dd') == Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间=当前时间");
                if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'hh') == Tools.formatDate(newDate, 'hh')) {
                    // console.log("时->选择时间=当前时间");
                    for (let i = 0; i <= 59; i++) {
                        if (i < newDate.getMinutes()) {
                            minutesArr.push(i);
                        }
                    }
                }
                if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'hh') < Tools.formatDate(newDate, 'hh')) {
                    // console.log("时->选择时间<当前时间");
                    for (let i = 0; i <= 59; i++) {
                        minutesArr.push(i);
                    }
                }

            }
            if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'yyyy-MM-dd') < Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间<当前时间");
                for (let i = 0; i <= 59; i++) {
                    minutesArr.push(i);
                }
            }
            //
            return minutesArr;
        }

        const edisabledSeconds = () => {
            // console.log('edisabledSeconds');
            let newDate = new Date();
            let secondsArr = [];
            if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'yyyy-MM-dd') == Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间=当前时间");
                if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'hh') == Tools.formatDate(newDate, 'hh')) {
                    // console.log("时->选择时间=当前时间");
                    if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'mm') == Tools.formatDate(newDate, 'mm')) {
                        // console.log("分->选择时间=当前时间");
                        for (let i = 0; i <= 59; i++) {
                            if (i < newDate.getSeconds()) {
                                secondsArr.push(i);
                            }
                        }
                    }
                    if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'mm') < Tools.formatDate(newDate, 'mm')) {
                        // console.log("分->选择时间<当前时间");
                        for (let i = 0; i <= 59; i++) {
                            secondsArr.push(i);
                        }
                    }
                }
                if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'hh') < Tools.formatDate(newDate, 'hh')) {
                    // console.log("时->选择时间<当前时间");
                    for (let i = 0; i <= 59; i++) {
                        secondsArr.push(i);
                    }
                }
            }
            if (Tools.formatDate(Tools.formatDate(this.refs.endDate.props.value, 'yyyy-MM-dd') + ' ' + this.refs.endTime.props.value, 'yyyy-MM-dd') < Tools.formatDate(newDate, 'yyyy-MM-dd')) {
                // console.log("日->选择时间<当前时间");
                for (let i = 0; i <= 59; i++) {
                    secondsArr.push(i);
                }
            }
            return secondsArr;
        }
        const sTimeProps = init('startTime', {
            getValueFromEvent: (time) => {
                time = time && time.toLocaleTimeString('zh-CN', {
                    hour12: false
                });
                return time;
            },
            rules: [
                { required: true, message: '具体时间点必须要选' }
            ],
        });
        const eTimeProps = init('endTime', {
            getValueFromEvent: (time) => {
                time = time && time.toLocaleTimeString('zh-CN', {
                    hour12: false
                });
                return time;
            },
            rules: [
                { required: true, message: '具体时间点必须要选' }
            ],
        });
        const onShareGoodsClick = (flag) => {
            if(flag){
                this.setState({
                    shareGoodsDisplay:true,
                })
            }else{
                this.setState({
                    shareGoodsDisplay:false,
                })
            }
        }
        const onMsgSaveClick = () => {
            // console.log('MsgSaveClicked')
            this.setState({
                sms_content_bianji:'none'
            })
        }
        return (
            <div>
                <Breadcrumb style={{ padding: 20 }} className='Breadcrumb-main'>
                    <Breadcrumb.Item className='Breadcrumb-item1 Breadcrumb-item' link={LinkTool['index']}>抽奖活动</Breadcrumb.Item>
                    <Breadcrumb.Item className='Breadcrumb-item2 Breadcrumb-item' link={LinkTool['redux-setConfig']}>活动设置</Breadcrumb.Item>
                    <Breadcrumb.Item className='Breadcrumb-item3 Breadcrumb-item' link={LinkTool['redux-setConfig']}>基本信息</Breadcrumb.Item>
                </Breadcrumb>
                <Step style={{ padding: 20 }} current={0} type='arrow'>
                    <StepItem title={contOne} />
                    <StepItem title={contTwo} />
                    <StepItem title={contThree} />
                    <StepItem title={contFour} />
                </Step>
                <Form field={this.field}>
                    <FormItem required label='活动名称：' {...formItemLayout}>
                        <Input htmlType='text' ref='marketName' {...init('marketName') } placeholder='请输入活动名称' style={{ width: 240 }} />
                    </FormItem>

                    <FormItem label='活动时间：' {...formItemLayout}>
                        <Row>
                            <Col span='10'>
                                <DatePicker ref='startDate' className="marginR-4" disabledDate={sdisabledDate} locale={sD} {...init('startDate') } />
                                <TimePicker ref='startTime' disabledHours={sdisabledHours} disabledMinutes={sdisabledMinutes} disabledSeconds={sdisabledSeconds} disabled={this.state.startTimeDisabled} locale={sT} {...sTimeProps} />
                            </Col>
                            <Col span="1"><span className="lh30">至</span></Col>
                            <Col span='10'>
                                <DatePicker ref='endDate' className="marginR-4" disabledDate={edisabledDate} locale={eD} {...init('endDate') } />
                                <TimePicker ref='endTime' disabledHours={edisabledHours} disabledMinutes={edisabledMinutes} disabledSeconds={edisabledSeconds} disabled={this.state.endTimeDisabled} locale={eT} {...eTimeProps} />
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem label='抽奖短信：' {...formItemLayout} style={{display:"none"}}>
                        <Switch className='fl' {...init('switchBtn') } onChange={this.switchBtn.bind(this)} /><p className='fl' style={{ height: '24px', verticalAlign: 'middle' }}>&nbsp;&nbsp;&nbsp;&nbsp;短信余额为&nbsp;<span style={{ color: 'orange' }}>{this.state.result.smsCount == null ? 0 : this.state.result.smsCount}</span>&nbsp;,<a href='admin/sms.h4'>&nbsp;马上充值</a></p>
                        <div style={{width:'90%'}}>
                            <br />
                            <br />
                            <b ref='shortlinkcheck' style={{color:this.state.shortlinkcheck==''?'':'red'}}>{this.state.shortlinkcheck}</b>
                            <div className="f-cs mt10" style={{ color: 'orange' }}>满足抽奖条件，系统自动发送短信通知用户抽奖。（PS支持满就送、买就送、评价送）
                                <span className="pr qus-tb">
                                    <img src={apienv=='local'?'/src/images/140910_icon03.png':'/cp/images/140910_icon03.png'} className="vm" onMouseEnter={this.qusInfoOver} onMouseOut={this.qusInfoOut} />
                                    <span className="qus-info pa" style={{ right: 100, top: '-150px', position: 'absolute', zIndex: '99', display: this.state.qusInfoDisplay }}><img src={apienv=='local'?'/src/images/141206_img01.jpg':'/cp/images/141206_img01.jpg'}/></span>
                                </span>
                            </div>
                            <div className='light-gray'>
                                <div className="msg-list mt10 mb10 mr10 ml10 msg-info" {...init('sms_content_bianji') } style={{ display: this.state.sms_content_bianji}}>
                                    <div style={{ width: '55%' }} className="sms-enter fl pt10">
                                        <table width="100%" cellSpacing="0" cellPadding="0" style={{border:'1px solid #dbd9d9'}}>
                                            <tbody>
                                                <tr className='pt20'>
                                                    <td width="76%" height='0' style={{backgroundColor: 'white', textAlign: "left", verticalAlign: "top" }} rowSpan="3">

                                                        <Input multiple style={{ border:0, width: '100%' ,margin:'0px',padding:'0px'}} rows='5' onKeyUp={this.showTip} className="msg-nav textarea-no h100 f12 f666" {...init('sms_template',{initValue:''}) } />
                                                    </td>
                                                    <td width="24%" className='br5' style={{ bgColor: "#f0f0f0", textAlign: "center", borderLeft:'1px solid #dbd9d9',borderBottom: '1px solid #dbd9d9' }}>插入参数</td>
                                                </tr>
                                                <tr>
                                                    <td style={{borderLeft:'1px solid #dbd9d9', textAlign: "center", paddingTop:'0px'}}>
                                                        <a className="link-txt f14" href="javascript:void(0);" onClick={onShopNameClick}>【店铺名称】</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{borderLeft:'1px solid #dbd9d9',textAlign: "center"}}>
                                                        <a className="link-txt f14" href="javascript:void(0);" onClick={onBuyerNameClick}>【买家姓名】</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="f12 lh200 fl ml15 mt25" style={{ width: '45%', paddingTop: '20px',paddingLeft: '20px' }}>
                                        您已录入<b className="f60" id="totalCount">{this.state.totalCount}</b>个字符(内容<b className="f60" id="textCount">{this.state.textCount}</b>个，签名<b className="f60" id="signCount">{this.state.signCount}</b>个,签名符号<b className="f60">2</b>个,分隔符号<b className="f60">1</b>个,抽奖链接<b className="f60">21</b>个)，将被作为<b className="f60">{this.state.smsCount}</b>条短信发送，每条短信按<b className="f60">64</b>字计算单条短信最多 <b className="f60">70</b> 个字，超过<b className="f60">1</b>条短信的，每条短信最多<b className="f60">67</b>个字。短信模板字数不能超过 <b className="f60">301</b> 个字
                                    </div>
                                    <div className="pt10 clearfix">
                                        <table width="100%" cellSpacing="0" cellPadding="10px">
                                            <tbody>
                                                <tr>
                                                    <td width="8%" style={{paddingTop:'10px',verticalAlign: 'top' }}>短信签名：</td>
                                                    <td width="92%" style={{paddingTop:'10px'}}>
                                                        <span className="fl mr30">
                                                            <Input size='small' className="w200" onKeyDown={this.showTip} onKeyUp={this.showTip} {...init('sms_sign',{initValue:''}) } />
                                                        </span>
                                                        <span className="fl pl40">模版审核状态：
                                                            <span className="col_096f" id="a_status">
                                                                {this.state.result.marketInfo != null ?
                                                                    this.state.result.marketInfo.checkStatus == 'N' ? <span>审核不通过  {this.state.result.marketInfo.info}</span>
                                                                        :
                                                                        this.state.result.marketInfo.checkStatus == 'P' ? <span>审核通过</span>
                                                                            :
                                                                            this.state.result.marketInfo.checkStatus == 'W' ? <span>待审核</span>
                                                                                :
                                                                                null
                                                                    :
                                                                    null}
                                                            </span>
                                                        </span>
                                                        <p className="mt20 clearfix pb10 pt10">
                                                            <Button component='a' type='primary' onClick={onMsgSaveClick} className="press b-blue tc ffff f18 msg-bc">保 存</Button>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormItem>

                    <FormItem label='活动类型：' {...formItemLayout}>
                        <Row className='lh24'>
                            <Checkbox {...init('A') } checked={this.state.checkedA} onClick={this.clickedA.bind(this)} className='mtypechange' ref='A' value='checkedA'><lable className='pr20'>满就送</lable></Checkbox>
                            <Checkbox {...init('B') } checked={this.state.checkedB} onClick={this.clickedB.bind(this)} className='mtypechange' ref='B' value='checkedB'><lable className='pr20'>买就送</lable></Checkbox>
                            <Checkbox {...init('C') } checked={this.state.checkedC} onClick={this.clickedC.bind(this)} className='mtypechange' ref='C' value='checkedC'><lable className='pr20'>评价送</lable></Checkbox>
                            <Checkbox {...init('D') } checked={this.state.checkedD} onClick={this.clickedD.bind(this)} className='mtypechange' ref='D' value='checkedD'><lable className='pr20'>签到送</lable></Checkbox>
                            <Checkbox {...init('E') } checked={this.state.checkedE} onClick={this.clickedE.bind(this)} className='mtypechange' ref='E' value='checkedE'><lable className='pr20'>收藏/关注送</lable></Checkbox>
                            <Checkbox {...init('H') } checked={this.state.checkedH} onClick={this.clickedH.bind(this)} className='mtypechange' ref='H' value='checkedH'><lable className='pr20'>分享送</lable></Checkbox>
                            <Checkbox {...init('I') } checked={this.state.checkedI} onClick={this.clickedI.bind(this)} className='mtypechange' ref='I' value='checkedI'><lable className='pr20'>进店送</lable></Checkbox>
                            <Checkbox style={{ display: 'none' }} {...init('J') } checked={this.state.checkedJ} onClick={this.clickedJ.bind(this)} className='mtypechange' ref='J' value='checkedJ'><label style={{ display: 'none' }} className='pr20'>收藏商品送</label></Checkbox>
                            <Checkbox style={{ display: 'none' }} {...init('F') } checked={this.state.checkedF} onClick={this.clickedF.bind(this)} className='mtypechange' ref='F' value='checkedF'><label style={{ display: 'none' }} className='pr20'>加购物车送</label></Checkbox>
                            <Checkbox style={{ display: 'none' }} {...init('G') } checked={this.state.checkedG} onClick={this.clickedG.bind(this)} className='' ref='G' value='checkedG'><label style={{ display: 'none' }} className='pr20'>关注送</label></Checkbox>
                        </Row>
                    </FormItem>

                    <FormItem label='满就送：' {...formItemLayout1} style={{ display: this.state.checkedA ? 'block' : 'none' }}>
                        <Button className='mr10' id='quanbu' {...init('quanbu') } type={this.state.manSendType == 'all' ? 'secondary' : 'normal'} onClick={this.addGoodsf.bind(this, '0',1,'')}>全部宝贝</Button>
                        <Button id='bufen' ref='bufen' {...init('bufen') } type={this.state.manSendType == 'some' ? 'secondary' : 'normal'} onClick={this.addGoodsf.bind(this, '1',1,'')}>部分宝贝</Button>
                        <Input htmlType='hidden' id='market_send_goods_ids' ref='market_send_goods_ids' {...init('market_send_goods_ids',{initValue:''})}/>
                        <Input htmlType='hidden' id='market_send_goods_idstp' ref='market_send_goods_idstp' {...init('market_send_goods_idstp',{initValue:''})} />
                        <Input htmlType='hidden' id='addgoodstype' ref='addgoodstype' {...init('addgoodstype',{initValue:'1'})} />
                        <br />
                        <br />

                        {/*<div dangerouslySetInnerHTML={this.createMarkup()} />*/}

                        <div className='fl' style={{ display: this.state.checkedA ? 'block' : 'none' }}>
                            满:&nbsp;<Input id='manjiu' ref='manjiu' {...init('manjiu') } style={{ width: 50 }} size='small' />&nbsp;
                            <Select size='small' style={{ verticalAlign: 'top' }} value={this.state.fullType} ref='fullType' id='ismanyuan'
                                {...init('fullType', {
                                    props: {
                                        onChange: (v) => {
                                            this.onManSendUnitChange(v);
                                        }
                                    }
                                }) }>

                                <Option key='0' value='0'>元</Option>
                                <Option key='1' value='1'>件</Option>
                            </Select>
                            &nbsp;,送:&nbsp;<Input style={{ width: 40 }} size='small' id='manjiu1' ref='manjiu1' {...init('manjiu1') } />&nbsp;次&nbsp;,赠送限制&nbsp;
                            <Select size='small' style={{ verticalAlign: 'top', width: 40 }} value={this.state.optLimit} ref='optLimit'
                                {...init('optLimit', {
                                    props: {
                                        onChange: (v) => {
                                            this.onOptLimitChange(v);
                                        }
                                    }
                                }) }>

                                <Option key='0' value='0'>上不封顶</Option>
                                <Option key='1' value='1'>限制封顶</Option>
                            </Select>
                            <div className='fr' id='optLimit2_span' ref="optLimit2_span" {...init('optLimit2_span') } style={{ width: 400, display: this.state.optLimit == '0' ? 'none' : 'block' }}><Input style={{ width: 50 }} size='small' ref='optLimitA' {...init('optLimitA') } />&nbsp;次封顶(指限定同一用户最多可赠送次数)</div>
                        </div>
                        <Dialog style={{ width: '60%', height:'auto'}} visible={this.state.manSendDialogVisible}
                            footer={manFooter}
                            onClose={manSendDialogClose} title={allTitle}>
                            <Tab type='wrapped' defaultActiveKey={this.state.defaultManSendCallback} onChange={manSendCallback}>
                                <TabPane tab='排除部分宝贝' key='1'>
                                    <div style={{ position: 'relative' }} >
                                        <span className='fl' style={{ lineHeight: '38px'}}>{this.state.manGoodsidsp}</span>
                                        <div className='fr'>
                                            <Search size={this.state.primarySize} inputWidth={80} placeholder='默认搜索值'
                                                onSearch={this.onManSearch.bind(this)} onChange={this.onManSearchChange.bind(this)}
                                                dataSource={this.state.dataSource} searchText='' value={this.state.manSearchValue} />
                                        </div>
                                    </div>
                                    <div style={{ height: '38px' }}></div>
                                    <Table dataSource={this.state.manGoodsInfop}>
                                        <Table.Column style={{ width: 90 }} title='商品图片' cell={renderItemPicture} />
                                        <Table.Column style={{ width: 260 }} title='商品名称' cell={renderItemName} />
                                        <Table.Column style={{ width: 115 }} title='当前售价(元)' cell={renderItemPrice} />
                                        <Table.Column style={{ width: 115, textAlign: 'center' }} title='操作' cell={this.renderManItemOprationp.bind(this)} />
                                    </Table>
                                </TabPane>
                                <TabPane tab='选择参与宝贝' key='0'>
                                    <div >
                                        <span className='fl' style={{ lineHeight: '38px'}}>{this.state.manGoodsids}</span>
                                        <div className='fr'>
                                            <Search size={this.state.primarySize} inputWidth={80} placeholder='默认搜索值'
                                                onSearch={this.onManSearch.bind(this)} onChange={this.onManSearchChange.bind(this)}
                                                dataSource={this.state.dataSource} searchText='' value={this.state.manSearchValue}/>
                                        </div>
                                    </div>
                                    <div style={{ height: '38px' }}></div>
                                    <Table dataSource={this.state.manGoodsInfox} >
                                        <Table.Column style={{ width: 90 }} title='商品图片' cell={renderItemPicture} />
                                        <Table.Column style={{ width: 260 }} title='商品名称' cell={renderItemName} />
                                        <Table.Column style={{ width: 115 }} title='当前售价(元)' cell={renderItemPrice} />
                                        <Table.Column style={{ width: 115, textAlign: 'center' }} title='操作' cell={this.renderManItemOprationx.bind(this)} />
                                    </Table>
                                </TabPane>
                            </Tab>
                            <Pagination style={{ paddingTop: 20, textAlign: 'center' }} defaultCurrent={1} current={this.state.manSomeCurrentPage} pageSize={4} total={4 * this.state.manGoodsData.totalPage} onChange={this.manPaginationChange} />
                        </Dialog>
                    </FormItem>
                    <FormItem label='买就送：' {...formItemLayout1} style={{ display: this.state.checkedB ? 'block' : 'none' }}>
                        <Button className='mr10' {...init('quanbub') } type={this.state.maiSendType=='all' ? 'secondary' : 'normal'} onClick={this.addGoodsb.bind(this, '0',1,'')}>全部宝贝</Button>
                        <Button ref='bufengb' {...init('bufengb') } type={this.state.maiSendType=='some' ? 'secondary' : 'normal'} onClick={this.addGoodsb.bind(this, '1',1,'')}>部分宝贝</Button>
                        <Input htmlType='hidden' id='market_send_goods_idsb' {...init('market_send_goods_idsb',{initValue:''})} />
                        <Input htmlType='hidden' id='market_send_goods_idsbtp' {...init('market_send_goods_idsbtp',{initValue:''})} />
                        <Input htmlType='hidden' id='addgoodstypeb' {...init('addgoodstypeb',{initValue:''})} />
                        <div style={{ display: this.state.checkedB  ? 'block' : 'none' }}>
                            <div className='mt10' style={{ color: 'orange' }}>一笔订单评价,即为一个评价.订单中包含多种商品,所有商品评价,即为订单评价</div>
                            <div className='mt10 fl'>送抽奖:&nbsp;<Input style={{ width: 50 }} size='small' ref='maijiu1' {...init('maijiu1',{initValue:''}) } />&nbsp;次&nbsp;,赠送限制&nbsp;
                                <Select size='small' style={{ verticalAlign: 'top', width: 50 }} value={this.state.optLimit1} ref='optLimit1'
                                    {...init('optLimit1', {
                                        props: {
                                            onChange: (v) => {
                                                this.onOptLimit1Change(v);
                                            }
                                        }
                                    }) }>
                                    <Option key='0' value='0'>上不封顶</Option>
                                    <Option key='1' value='1'>限制封顶</Option>
                                </Select>
                            </div>
                            <div className='mt10 fl' ref='optLimit2_span1' {...init('optLimit2_span1') } style={{ width: 400, display: this.state.optLimit1 == '0' ? 'none' : 'block' }}><Input style={{ width: 50 }} size='small' ref='optLimit2' {...init('optLimit2') } />&nbsp;次封顶(指限定同一用户最多可赠送次数)</div>
                        </div>
                        <Dialog style={{ width: '60%', height:'auto'}} visible={this.state.maiSendDialogVisible}
                            footer={maiFooter}
                            onClose={maiSendDialogClose} title={allTitle}>
                            <Tab type='wrapped' defaultActiveKey={this.state.defaultMaiSendCallback} onChange={maiSendCallback}>
                                <TabPane tab='排除部分宝贝' key='1'>
                                    <div style={{ position: 'relative' }} >
                                        <span className='fl' style={{ lineHeight: '38px'}}>{this.state.maiGoodsidsp}</span>
                                        <div className='fr'>
                                            <Search size={this.state.primarySize} inputWidth={80} placeholder='默认搜索值'
                                                onSearch={this.onMaiSearch.bind(this)} onChange={this.onMaiSearchChange.bind(this)}
                                                dataSource={this.state.dataSource} searchText='' value={this.state.maiSearchValue} />
                                        </div>
                                    </div>
                                    <div style={{ height: '38px' }}></div>
                                    <Table dataSource={this.state.maiGoodsInfop}>
                                        <Table.Column style={{ width: 90 }} title='商品图片' cell={renderItemPicture} />
                                        <Table.Column style={{ width: 260 }} title='商品名称' cell={renderItemName} />
                                        <Table.Column style={{ width: 115 }} title='当前售价(元)' cell={renderItemPrice} />
                                        <Table.Column style={{ width: 115, textAlign: 'center' }} title='操作' cell={this.renderMaiItemOprationp.bind(this)} />
                                    </Table>
                                </TabPane>
                                <TabPane tab='选择参与宝贝' key='0'>
                                    <div >
                                        <span className='fl' style={{ lineHeight: '38px'}}>{this.state.maiGoodsids}</span>
                                        <div className='fr'>
                                            <Search size={this.state.primarySize} inputWidth={80} placeholder='默认搜索值'
                                                onSearch={this.onMaiSearch.bind(this)} onChange={this.onMaiSearchChange.bind(this)}
                                                dataSource={this.state.dataSource} searchText='' value={this.state.maiSearchValue}/>
                                        </div>
                                    </div>
                                    <div style={{ height: '38px' }}></div>
                                    <Table dataSource={this.state.maiGoodsInfox} >
                                        <Table.Column style={{ width: 90 }} title='商品图片' cell={renderItemPicture} />
                                        <Table.Column style={{ width: 260 }} title='商品名称' cell={renderItemName} />
                                        <Table.Column style={{ width: 115 }} title='当前售价(元)' cell={renderItemPrice} />
                                        <Table.Column style={{ width: 115, textAlign: 'center' }} title='操作' cell={this.renderMaiItemOprationx.bind(this)} />
                                    </Table>
                                </TabPane>
                            </Tab>
                            <Pagination style={{ paddingTop: 20, textAlign: 'center' }} defaultCurrent={1} current={this.state.maiSomeCurrentPage} pageSize={4} total={4 * this.state.maiGoodsData.totalPage} onChange={this.maiPaginationChange} />
                        </Dialog>
                    </FormItem>
                    <FormItem label='评价送：' {...formItemLayout1} ref='divhao' style={{ display: this.state.checkedC ? 'block' : 'none' }}>
                        <Button className='mr10 fl' ref='quanbup' {...init('quanbup') } type={this.state.pingSendType=='all' ? 'secondary' : 'normal'} onClick={this.addGoodsp.bind(this, '0',1,'')}>全部宝贝</Button>
                        <Button className='fl' ref='bufengp' {...init('bufengp') } type={this.state.pingSendType=='some' ? 'secondary' : 'normal'} onClick={this.addGoodsp.bind(this, '1',1,'')}>部分宝贝</Button>
                        <Input htmlType='hidden' id='market_send_goods_idsp' {...init('market_send_goods_idsp',{initValue:''})} />
                        <Input htmlType='hidden' id='market_send_goods_idsptp' {...init('market_send_goods_idsptp',{initValue:''})}/>
                        <Input htmlType='hidden' id='addgoodstypep' {...init('addgoodstypep',{initValue:'1'})}/>
                        <Dialog style={{ width: '60%', height:'auto'}} visible={this.state.pingSendDialogVisible}
                            footer={pingFooter}
                            onClose={pingSendDialogClose} title={allTitle}>
                            <Tab type='wrapped' defaultActiveKey={this.state.defaultPingSendCallback} onChange={pingSendCallback}>
                                <TabPane tab='排除部分宝贝' key='1'>
                                    <div style={{ position: 'relative' }} >
                                        <span className='fl' style={{ lineHeight: '38px'}}>{this.state.pingGoodsidsp}</span>
                                        <div className='fr'>
                                            <Search size={this.state.primarySize} inputWidth={80} placeholder='默认搜索值'
                                                onSearch={this.onPingSearch.bind(this)} onChange={this.onPingSearchChange}
                                                dataSource={this.state.dataSource} searchText='' value={this.state.pingSearchValue} />
                                        </div>
                                    </div>
                                    <div style={{ height: '38px' }}></div>
                                    <Table dataSource={this.state.pingGoodsInfop}>
                                        <Table.Column style={{ width: 90 }} title='商品图片' cell={renderItemPicture} />
                                        <Table.Column style={{ width: 260 }} title='商品名称' cell={renderItemName} />
                                        <Table.Column style={{ width: 115 }} title='当前售价(元)' cell={renderItemPrice} />
                                        <Table.Column style={{ width: 115, textAlign: 'center' }} title='操作' cell={this.renderPingItemOprationp.bind(this)} />
                                    </Table>
                                </TabPane>
                                <TabPane tab='选择参与宝贝' key='0'>
                                    <div style={{ position: 'relative' }} >
                                        <span className='fl' style={{ lineHeight: '38px'}}>{this.state.pingGoodsids}</span>
                                        <div className='fr'>
                                            <Search size={this.state.primarySize} inputWidth={80} placeholder='默认搜索值'
                                                onSearch={this.onPingSearch.bind(this)} onChange={this.onPingSearchChange}
                                                dataSource={this.state.dataSource} searchText='' value={this.state.pingSearchValue} />
                                        </div>
                                    </div>
                                    <div style={{ height: '38px' }}></div>
                                    <Table dataSource={this.state.pingGoodsInfox} >
                                        <Table.Column style={{ width: 90 }} title='商品图片' cell={renderItemPicture} />
                                        <Table.Column style={{ width: 260 }} title='商品名称' cell={renderItemName} />
                                        <Table.Column style={{ width: 115 }} title='当前售价(元)' cell={renderItemPrice} />
                                        <Table.Column style={{ width: 115, textAlign: 'center' }} title='操作' cell={this.renderPingItemOprationx.bind(this)} />
                                    </Table>
                                </TabPane>
                            </Tab>
                            <Pagination style={{ paddingTop: 20, textAlign: 'center' }} defaultCurrent={1} current={this.state.pingSomeCurrentPage} pageSize={4} total={4 * this.state.pingGoodsData.totalPage} onChange={this.pingPaginationChange} />
                        </Dialog>
                        <div className='fl w100p' style={{ display: this.state.checkedC ? 'block' : 'none' }}>
                            <div className='fl mt10'>送抽奖:&nbsp;<Input style={{ width: 50 }} size='small' ref='haoping' {...init('haoping') } />&nbsp;次&nbsp;,赠送限制&nbsp;
                                <Select size='small' style={{ verticalAlign: 'top', width: 50 }} value={this.state.optLimit9} ref='optLimit9'
                                    {...init('optLimit9', {
                                        props: {
                                            onChange: (v) => {
                                                this.onOptLimit9Change(v);
                                            }
                                        }
                                    }) }>
                                    <Option key='0' value='0'>上不封顶</Option>
                                    <Option key='1' value='1'>限制封顶</Option>
                                </Select>
                            </div>
                            <div className='mt10 fl' ref='optLimit2_span9' {...init('optLimit2_span9') } style={{ display: this.state.optLimit9 == '0' ? 'none' : 'block' }}>
                                <Input style={{ width: 50 }} size='small' ref='optLimit3' {...init('optLimit3') } />&nbsp;次封顶(指限定同一用户最多可赠送次数)
                            </div>
                        </div>
                        <div className='bgF0F0F0 pt20 pl20 mt10 hauto pb20 w80p fl'>
                            <div className='fl'>
                                评价条件&nbsp;<b>:</b>
                                {/*<RadioGroup onChange={this.onPingjiaChange} value={this.state.praise} ref='praise' {...init('praise') }>*/}
                                <Radio className='ml20' ref='allPraise' onChange={this.allPraiseChange} checked={this.state.praise == '0' ? true : false}>所有评价</Radio>
                                {/*checked={this.state.praise=='1'?true:false}*/}
                                <Radio className='ml20' ref='daiziPraise' onChange={this.daiziPraiseChange} checked={this.state.praise == '1' ? true : false}>带字评价<Input ref='praiseWLimit' {...init('praiseWLimit') } value={this.state.daiziPraiseValue} onChange={this.onPraiseWLimitFocus.bind(this)} style={{ width: 50 }} size='small' />字以上</Radio>
                                {/*</RadioGroup>*/}
                                <div style={{ display: 'none' }} ref='shaituPraise' value='shaituPraise'>晒图评价<Input ref='shaituLimit' {...init('shaituLimit') } style={{ width: 50 }} size='small' />字以上(评价内容包含上传宝贝图片)</div>

                            </div>
                            <div className='fl w100p ml102 mt10' style={{ color: 'gray' }}>*所有评价*包括系统默认评价和买家手动评价</div>
                            <div className='fl w100p mt10'>不良关键词或买家过滤:<Icon className='DeepSkyBlue' type='prompt' size='medium' />不输入则不过滤</div>
                            <div className='fl mt10 w100p'>
                                <Input ref='filterKeyword' {...init('filterKeyword') } size='small' className='w90p' />
                            </div>
                            <div className='fl mt10' style={{ color: 'orange' }}>每个关键词或买家之间用','逗号隔开,如:很差,不好,垃圾,太差了,骗人,买家昵称1,买家2</div><div className='fl mt10 DeepSkyBlue'><Icon type='prompt' size='small' className='ml10 mr10' /><label>不输入则不过滤</label></div>
                            <div className='fl mt10'>评价内容必须包含的关键字:<Icon className='DeepSkyBlue' type='prompt' size='medium' />不输入则不限制</div>
                            <div className='fl mt10 w100p'>
                                <Input ref='filterKeyword2' {...init('filterKeyword2') } size='small' className='w90p' />
                            </div>
                            <div className='fl mt10 w100p' style={{ color: 'orange' }}>每个关键词之间用','逗号隔开,如:很好,发货速度快,服务态度好</div>
                            <div className='fl mt10' >评价时间&nbsp;:&nbsp;确认收货后&nbsp;<Input style={{ width: 50 }} size='small' ref='praiseTnum' {...init('praiseTnum') } />&nbsp;天内评价有效</div>
                        </div>
                    </FormItem>
                    <FormItem label='签到送：' {...formItemLayout1} ref='divqian' style={{ display: this.state.checkedD ? 'block' : 'none' }}>
                        <div style={{ verticalAlign: 'middle' }}>
                            连续签到&nbsp;<Input ref='sign_draw_day' size='small' {...init('sign_draw_day') } style={{ width: 50 }} />&nbsp;天&nbsp;,送抽奖&nbsp;<Input style={{ width: 50 }} size='small' ref='sign_draw_num' {...init('sign_draw_num') } />&nbsp;次
                        </div>
                    </FormItem>
                    <FormItem label='收藏送：' {...formItemLayout1} ref='divshou' style={{ display: this.state.checkedE ? 'block' : 'none' }}>
                        <div>
                            收藏店铺送&nbsp;<Input style={{ width: 50 }} size='small' ref='collection_draw_num' {...init('collection_draw_num') } />&nbsp;次
                        </div>
                    </FormItem>
                    <FormItem label='分享送：' {...formItemLayout1} ref='divfen' style={{ display: this.state.checkedH ? 'block' : 'none' }}>
                        <Checkbox {...init('share_all',{initValue:''}) } checked={this.state.share_all} onClick={this.clickedShareAll}>分享活动抽奖页</Checkbox>
                        <Checkbox className='ml20' {...init('share_goods',{initValue:''}) } checked={this.state.share_goods} onClick={this.clickedShareGoods}>分享指定商品</Checkbox>
                        <Button className='ml20'  {...init('demoBtn11',{initValue:''}) } id='demoBtn11' style={{ height: '22px', lineHeight: '22px' }} size='small' onClick={this.addGoodsd.bind(this,1,'')}><div>设置分享商品</div></Button>
                        <div className='mt10' style={{ verticalAlign: 'middle' }}>
                            客户分享,并成功邀请&nbsp;<Input style={{ width: 50 }} size='small' {...init('share_num',{initValue:''}) } />&nbsp;个好友&nbsp;,送抽奖<Input style={{ width: 50 }} size='small' ref='share_draw_num' {...init('share_draw_num') } />&nbsp;次&nbsp;,最多送<Input style={{ width: 50 }} size='small' {...init('share_limit_num') } />&nbsp;次(0为不限制)
                        </div>
                        <Input className='mt10' htmlType="hidden" {...init('market_send_goods_idsd', { initValue: ''}) } />
                        <Dialog style={{ width: '60%', height:'auto'}} visible={this.state.fenSendDialogVisible}
                            footer={fenFooter}
                            onClose={fenSendDialogClose} title={allTitle}>
                            <div style={{ position: 'relative' }} >
                                <div className='fr'>
                                    <Search size={this.state.primarySize} inputWidth={80} placeholder='默认搜索值'
                                        onSearch={this.onFenSearch.bind(this)} onChange={this.onFenSearchChange}
                                        dataSource={this.state.dataSource} searchText='' value={this.state.fenSearchValue} />
                                </div>
                            </div>
                            <div style={{ height: '38px' }}></div>
                            <Table dataSource={this.state.fenGoodsInfo} >
                                <Table.Column style={{ width: 90 }} title='商品图片' cell={renderItemPicture} />
                                <Table.Column style={{ width: 260 }} title='商品名称' cell={renderItemName} />
                                <Table.Column style={{ width: 115 }} title='当前售价(元)' cell={renderItemPrice} />
                                <Table.Column style={{ width: 115, textAlign: 'center' }} title='操作' cell={this.renderFenItemOpration.bind(this)} />
                            </Table>
                            <Pagination style={{ paddingTop: 20, textAlign: 'center' }} defaultCurrent={1} current={this.state.fenCurrentPage} pageSize={4} total={4 * this.state.fenGoodsData.totalPage} onChange={this.fenPaginationChange} />
                        </Dialog>
                        <div className='mt10'>分享抽奖&nbsp;:分享时会自带当前抽奖所在网站,分享到各个微博后,别人可以进去到抽奖页面</div>
                    </FormItem>
                    <FormItem label='进店送：' {...formItemLayout1} ref='divjin' style={{ display: this.state.checkedI ? 'block' : 'none' }}>
                        <Select size='small' style={{ verticalAlign: 'middle', width: '180px', lineHeight: '22px', height: '22px' }} {...init('intoStore_user_type', {
                            props: {
                                onChange: (value) => {
                                    console.log('jindian_value', value);
                                    if (value == '1') {
                                        this.setState({
                                            div_intoStore_send_user: 'none'
                                        })
                                    } else if (value == 3) {
                                        this.setState({
                                            div_intoStore_send_user: 'block'
                                        })
                                    }
                                }
                            }
                        }) }>
                            <Option key='1' value='1'>所有淘宝会员</Option>
                            <Option key='3' value='3'>只许以下淘宝网买家参与</Option>
                        </Select>
                        <span style={{ verticalAlign: 'middle' }}>&nbsp;进店可免费抽奖&nbsp;<Input style={{ width: 50 }} size='small' ref='intoStore_draw_num' {...init('intoStore_draw_num') } />&nbsp;次</span>
                        <div style={{ display: this.state.div_intoStore_send_user, width: 500 }} ref="div_intoStore_send_user">
                            <div>
                                <Input style={{ width: '500px', marginTop: '10px' }} multiple placeholder='' ref='intoStore_send_user' {...init('intoStore_send_user') } />
                            </div>
                            <div>
                                <span>（买家昵称,多个用','隔开或者每行一个）</span>
                            </div>
                        </div>
                    </FormItem>
                    {/*<FormItem label='divGoodsListForm' {...formItemLayout} ref='divGoodsListForm' style={{ display: 'none' }}>
                        <div className="from_wrapper" ref='divGoodsList' id="divGoodsList" style={{ display: 'none' }}></div>
                    </FormItem>*/}
                    <FormItem label='关注送:' {...formItemLayout} ref='divguan' style={{ display: 'none' }}>
                        <span>关注送：</span>
                        <img src="http://img.alicdn.com/imgextra/i1/749864544/TB2MixsdFXXXXXfXXXXXXXXXXXX_!!749864544-2-tae.png" />店铺品牌，品牌号：
                        <Input htmlType="text" ref="brandId" {...init('brandId') } /><a target="_blank" href="http://bangpai.taobao.com/group/thread/16135535-305276796.htm?spm=0.0.0.0.WG9o9V&qq-pf-to=pcqq.group">怎么获取品牌号</a>	<font size="2">(店铺品牌 仅支持天猫)</font>
                        <p>关注送&nbsp;<Input ref="attention_draw_num" {...init('attention_draw_num') } htmlType="text" value="1" />&nbsp;次抽奖机会</p>
                    </FormItem>
                    <FormItem label='加购物车送: ' {...formItemLayout} ref='divjia' style={{ display: 'none' }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>加购物车送：</span>

                                    </td>
                                    <td colSpan="3"><a onClick={this.addGoods_cart.bind(this)}>设置加购物车商品</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <Input htmlType="hidden" ref="market_cart_send_goods_ids" {...init('market_cart_send_goods_ids') } />
                                        <Input htmlType="hidden" ref="market_cart_send_goods_info" {...init('market_cart_send_goods_info') } />

                                        加入<Input htmlType="text" ref="cart_goods_num" {...init('cart_goods_num') } />件，送抽奖<Input htmlType="text" ref="cart_draw_num" {...init('cart_draw_num') } />次
                                    </td>
                                    <td>
                                        <span>赠送限制：</span>
                                        <Select size='small' style={{ verticalAlign: 'top', width: 50 }} value={this.state.optLimit11} {...init('optLimit11', {
                                            props: {
                                                onChange: (v) => {
                                                    this.onOptLimit11Change(v);
                                                }
                                            }
                                        }) }>
                                            <Option key='0' value='0'>上不封顶</Option>
                                            <Option key='1' value='1'>限制封顶</Option>
                                        </Select>
                                    </td><td>
                                        <span ref="optLimit2_span4" style={{ display: 'none' }}>
                                            <Input htmlType="text" ref="optLimit5" {...init('optLimit5') } />
                                            {this.state.result.type == 'full'}?<span>翻</span>:<span>次</span>
                                            封顶<span>（指限制同一用户最多可赠送次数）</span></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </FormItem>
                    <FormItem label='收藏商品送：' {...formItemLayout} ref='divshougood' style={{ display: 'none' }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td> <span>收藏商品送：</span>
                                    </td>
                                    <td colSpan="3"><a onClick={this.addGoods_shou.bind(this)}>设置收藏商品</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <Input htmlType="hidden" ref="market_shou_send_goods_ids" {...init('market_shou_send_goods_ids') } />
                                        <Input htmlType="hidden" ref="market_shou_send_goods_info" {...init('market_shou_send_goods_info') } />
                                        <Input htmlType="hidden" ref="d_num_set_num" {...init('d_num_set_num') } />
                                        <Checkbox {...init('d_num_set') } checked={this.state.d_num_set} onClick={this.d_num_set.bind(this)} ref='d_num_set' value='d_num_set'> </Checkbox>

                                        收藏<Input htmlType="text" ref="shou_goods_num" {...init('shou_goods_num') } />件，送抽奖
                                        <Input htmlType="text" ref="shou_draw_num" {...init('shou_draw_num') } />次
                                    </td>
                                    <td>
                                        <span>赠送限制：</span>

                                        <Select size='small' style={{ verticalAlign: 'top', width: 50 }} value={this.state.optLimit13} {...init('optLimit13', {
                                            props: {
                                                onChange: () => {
                                                    this.optLimit2show7.bind(this)
                                                }
                                            }
                                        }) }>
                                            <Option key='0' value='0'>上不封顶</Option>
                                            <Option key='1' value='1'>限制封顶</Option>
                                        </Select>
                                    </td>
                                    <td>
                                        <span ref="optLimit2_span7" style={{ display: 'none' }}>
                                            <Input type="text" ref="optLimit14" value={this.state.optLimit14} />
                                            {this.state.result.type == 'full'}?<span>翻</span>:<span>次</span>
                                            封顶<span>（指限制同一用户最多可赠送次数）</span></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </FormItem>
                  {
                    (this.state.ifover=="yover" && this.state.reset=="")?
                      null:<Row style={{ marginTop: 24 }}>
                      <Col offset='8'>
                        <Button type='primary' ref='xiayibu' onClick={this.saveCheck} style={{ display: this.state.xiayibu }}>下一步</Button>
                      </Col>
                    </Row>
                  }
                </Form>
                {/*<div className="from_wrapper" ref="divGoodsList" style={{ display: 'none' }}></div>*/}
                <Dialog style={{ width: '400px', height: 'auto'}} visible={this.state.marketingTypeChanged}
                    footer={marketingTypeChangedFooter}
                    onClose={marketingTypeChangedClose} title={changedTitle}>
                    <Input htmlType="hidden" value={this.state.type_changed} />
                    <div>
                        请注意，修改活动类型将会影响已设置的奖品概率，<br />
                        <span style={{color: 'red'}}><b>请在修改后检查奖品概率</b></span>。
                    </div>
                    <br />
                </Dialog>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        setConfig: state.setConfig
    };
})(SetConfig);

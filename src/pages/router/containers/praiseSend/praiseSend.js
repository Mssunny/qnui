'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/praiseSend';
import Breadcrumb from 'qnui/lib/breadcrumb';
import Form from 'qnui/lib/form';
import { Group as RadioGroup } from 'qnui/lib/radio';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Pagination from 'qnui/lib/pagination';
import Select from 'qnui/lib/select';
import { RangePicker } from 'qnui/lib/date-picker';
import Field from 'qnui/lib/field';
import Icon from 'qnui/lib/icon';
import Tag from 'qnui/lib/tag';
import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';
import Dialog from 'qnui/lib/dialog';
import Search from 'qnui/lib/search';
import {Row, Col} from 'qnui/lib/grid';
import LinkTool from 'utils/linkTools';
import './praiseSend.scss';
const TabPane = Tab.TabPane;

const FormItem = Form.Item;
const paginationChange = function(value) {
    console.log(value);
};
const list = [
    {
        value: 'allPraise',
        label: '所有评价'
    },
    {
        value: 'wordPraise',
        label: '带字评价'
    }
];
const dataSource = [
    {label:'彩票', value:'prize_cp'},
    {label:'手机流量', value:'prize_sjll'},
    {label:'话费', value:'prize_hf'}
];
const dataSource1 = [
    {label:'统一', value:'prize_ty'},
    {label:'阶梯', value:'prize_jt'}
];
const dataSource2 = [
    {label:'元', value:'prize_yuan'},
    {label:'件', value:'prize_jian'}
];


class PraiseSend extends React.Component {
    field = new Field(this);
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.field.getValues());
        this.field.validate();
    };

    constructor(props) {
        super(props);

        this.state = {
            radioValue: 'allPraise',
            selectValue: 'option1',
            searchValue: '',
            allItemVisible: true,
            someItemXuanzeCount: 0,
            someItemPaichuCount: 0,
            someItemDialogVisible: false,
            canjiaType:'primary',
            canjiaValue:'点击参加',
            paichuType:'primary',
            paichuValue:'点击排除',
            prize1Name:'设置彩票',
            prize2Name:'设置彩票',
            prize3Name:'设置彩票',
            prize1Visible:false,
            prize2Visible:false,
            prize3Visible:false,
            prize1Type:1,
            prize2Type:1,
            prize3Type:1,
        };

        this.onRadioChange = this.onRadioChange;

        this.onSelectChange = this.onSelectChange;
    };
    onSearch(value) {
      this.setState({
        searchValue: value
      })
    }
    onRadioChange(value) {
        this.setState({
            radioValue: value
        });
        console.log(value);
    };
    onSelectChange(value) {
        this.setState({
            selectValue: value
        });
        console.log(value);
    };
    setLottery(){
      console.log('setLottery');
    };
    allItemClick=(value)=>{
      console.log('allClick');
      this.setState({
        allItemVisible:true
      });
    };
    someItemClick=(value)=>{
      console.log('someClick');
      this.setState({
        allItemVisible:false,
        someItemDialogVisible: true
      });
    };
    setPrize1=(value)=>{
      this.setState({
        prize1Visible:true
      });
      console.log(value);
    }
    prize1Change=(value,data)=>{
      let prizeName='';
      let prizeType=0;
      switch(value){
        case 'prize_cp':
        prizeName='设置彩票';
        prizeType=1;
        break;
        case 'prize_sjll':
        prizeName='设置手机流量';
        prizeType=2;
        break;
        case 'prize_hf':
        prizeName='设置话费';
        prizeType=3;
        break;
        default:
        prizeType=0;
        break;
      }
      this.setState({
        prize1Name:prizeName,
        prizeType:prizeType
      })
      console.log('value:'+value+',data:'+data.value)
        console.log(this.state.prize1Name);
    }
    setPrize2=(value)=>{
      this.setState({
        prize2Visible:true
      });
      console.log(value);
    }
    prize2Change=(value,data)=>{
      let prizeName='';
      switch(value){
        case 'prize_cp':
        prizeName='设置彩票';
        break;
        case 'prize_sjll':
        prizeName='设置手机流量';
        break;
        case 'prize_hf':
        prizeName='设置话费'
        break;
        default:
        break;

      }
      this.setState({
        prize2Name:prizeName
      })
    }
    setPrize3=(value)=>{
      this.setState({
        prize3Visible:true
      });
      console.log(value);
    }
    prize3Change=(value,data)=>{
      let prizeName='';
      switch(value){
        case 'prize_cp':
        prizeName='设置彩票';
        break;
        case 'prize_sjll':
        prizeName='设置手机流量';
        break;
        case 'prize_hf':
        prizeName='设置话费'
        break;
        default:
        break;

      }
      this.setState({
        prize3Name:prizeName
      })
    }
    prize1DialogClose=()=>{
      this.setState({
        prize1Visible:false
      })
    }
    prize2DialogClose=()=>{
      this.setState({
        prize2Visible:false
      })

    }
    prize3DialogClose=()=>{
      this.setState({
        prize3Visible:false
      })

    }

    render() {
      const renderItemName = value => {
          if (value == '2016') {
              return '今年';
          }
          return value;
      }
      const renderItemPicture = value => {
          return value;
      }
      const renderItemPrice = value => {
          return value;
      }
      const renderItemOpration = value => {
          return value;
      }
      const someItemCallback=(key)=> {
          if('paichu'==key){
              console.log('排除部分宝贝');
          }else{
              console.log('选择参与宝贝');
          }
      };
      const someItemDialogClose = () => {
          this.setState({
              someItemDialogVisible: false
          });
          console.log('someItemDialogClose');
      };
        const init = this.field.init;

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        const insetItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        const someItemFooter = <Button type='normal' onClick={someItemDialogClose}>关闭</Button>;
        return (
            <div className='redux-demo-home'>

                <Breadcrumb style={{padding:20}}>
                    <Breadcrumb.Item link={LinkTool['index']}>活动信息</Breadcrumb.Item>
                    <Breadcrumb.Item link={LinkTool['router-praiseSend']}>评价送礼设置</Breadcrumb.Item>
                </Breadcrumb>

                <Form >
                    <FormItem label='活动时间：' labelCol={{ span: 6 }}>
                        <RangePicker/> <span style={{color:'orange'}}> 活动暂停 </span>
                    </FormItem>

                    <FormItem label='评价限制：' labelCol={{ span: 6 }}>
                        <RadioGroup dataSource={list} value={this.state.radioValue} onChange={this.onRadioChange.bind(this)} />
                    </FormItem>

                    <FormItem label='评价时间：' labelCol={{ span: 6 }}>
                        确认收货后<Input style={{width:30}}></Input>天内评价有效<span style={{color:'gray'}}> (不可为0) </span>
                    </FormItem>

                    <FormItem label='奖励条件：' labelCol={{ span: 6 }}>
                      <div>
                        <Select style={{verticalAlign:'top'}} defaultValue='prize_jt' dataSource={dataSource1}></Select><span style={{verticalAlign:'middle'}}>&nbsp;&nbsp;返现</span>
                        <br></br>
                        <div style={{verticalAlign:'bottom', paddingTop:5}}>每笔订单满&nbsp;&nbsp;<Input style={{width:60, verticalAlign:'top'}}></Input>&nbsp;<Select dataSource={dataSource2} defaultValue='prize_jian'></Select>&nbsp;,奖励&nbsp;&nbsp;<Select onChange={this.prize1Change} defaultValue='prize_cp' style={{verticalAlign:'top'}} dataSource={dataSource}></Select>&nbsp;&nbsp;<Button onClick={this.setPrize1} type='primary'>&nbsp;&nbsp;{this.state.prize1Name}&nbsp;&nbsp;</Button></div>
                        <Dialog style={{width:700,height:600}} visible = {this.state.prize1Visible}
                            onClose = {this.prize1DialogClose} onOk = {this.prize1DialogClose} onCancel = {this.prize1DialogClose} title = {'设置奖品1'}>

                        </Dialog>
                        <br></br>
                        <div style={{paddingTop:5}}>每笔订单满&nbsp;&nbsp;<Input style={{width:60, verticalAlign:'top'}}></Input>&nbsp;件&nbsp;,奖励&nbsp;&nbsp;<Select onChange={this.prize2Change} defaultValue='prize_cp' style={{verticalAlign:'top'}} dataSource={dataSource}></Select>&nbsp;&nbsp;<Button onClick={this.setPrize2} type='primary'>&nbsp;&nbsp;{this.state.prize2Name}&nbsp;&nbsp;</Button></div>
                        <Dialog style={{width:700,height:600}} visible = {this.state.prize2Visible}
                            onClose = {this.prize2DialogClose} onOk = {this.prize2DialogClose} onCancel = {this.prize2DialogClose} title = '设置奖品2'>

                        </Dialog>
                        <br></br>
                        <div style={{paddingTop:5}}>每笔订单满&nbsp;&nbsp;<Input style={{width:60, verticalAlign:'top'}}></Input>&nbsp;件&nbsp;,奖励&nbsp;&nbsp;<Select onChange={this.prize3Change} defaultValue='prize_cp' style={{verticalAlign:'top'}} dataSource={dataSource}></Select>&nbsp;&nbsp;<Button onClick={this.setPrize3} type='primary'>&nbsp;&nbsp;{this.state.prize3Name}&nbsp;&nbsp;</Button></div>
                        <Dialog style={{width:700,height:600}} visible = {this.state.prize3Visible}
                            onClose = {this.prize3DialogClose} onOk = {this.prize3DialogClose} onCancel = {this.prize3DialogClose} title = '设置奖品3'>
                            {/*<div style={{display:(this.state.prize3Name='prize_sjll')?'block':'none'}}>
                              手机流量
                            </div>
                            <div style={{display:(this.state.prize3Name='prize_cp')?'block':'none'}}>
                              彩票
                            </div>
                            <div style={{display:(this.state.prize3Name='prize_hf')?'block':'none'}}>
                              话费
                            </div>
                          */}
                        </Dialog>
                      </div>
                    </FormItem>

                    <FormItem label='赠送限制：' labelCol={{ span: 6 }}>
                      <Input style={{width:30}}></Input>&nbsp;&nbsp;次封顶(&nbsp;同一用户活动期限内,最多赠送次数,不可为0)<Icon/>
                    </FormItem>

                    <FormItem label='参与宝贝' labelCol={{ span: 6 }}>
                      <div>
                        <Tag shape='selectable' selected={this.state.allItemVisible} onSelect={this.allItemClick}>全部宝贝</Tag>
                        &nbsp;&nbsp;
                        <Tag shape='selectable' selected={!this.state.allItemVisible} onSelect={this.someItemClick}>部分宝贝</Tag>
                        <div style={{display:this.state.allItemVisible?'none':'block'}}>
                        <Dialog style={{width:700,height:600}} visible = {this.state.someItemDialogVisible}
                            footer = {someItemFooter}
                            onClose = {someItemDialogClose} title = '选择商品'>
                            <Tab type='wrapped' onChange={someItemCallback}>
                               <TabPane tab='排除部分宝贝' key='paichu'>
                                    <span>您已排除{this.state.someItemPaichuCount}个选项</span>
                                    <div style={{padding:5}}>
                                        <Search size={this.state.primarySize} inputWidth={80} defaultValue='默认搜索值'
                                        onSearch={this.onSearch} onChange={this.onChange}
                                        dataSource={this.state.dataSource} searchText='' />
                                    </div>

                                    <Table dataSource={dataSource2}>
                                        <Table.Column style={{width:60}} title='商品图片' dataIndex='itemPicture' cell={renderItemPicture}/>
                                        <Table.Column style={{width:120}} title='商品名称' dataIndex='itemName' cell={renderItemName}/>
                                        <Table.Column style={{width:60}} title='当前售价(元)' dataIndex='itemPrice' cell={renderItemPrice}/>
                                        <Table.Column style={{width:60}} title='操作' dataIndex='itemOpration' cell={renderItemOpration}/>
                                    </Table>
                               </TabPane>
                               <TabPane tab='选择参与宝贝' key='xuanze'>
                                    <span>您已选择{this.state.someItemXuanzeCount}个选项</span>
                                    <div style={{padding:5}}>
                                        <Search style={{width:100,float:'left'}} size={this.state.primarySize} inputWidth={80} defaultValue='默认搜索值'
                                            onSearch={this.onSearch} onChange={this.onChange}
                                            dataSource={this.state.dataSource} searchText='' />
                                    </div>
                                    <Table dataSource={dataSource1}>
                                        <Table.Column style={{width:60}} title='商品图片' dataIndex='itemPicture' cell={renderItemPicture}/>
                                        <Table.Column style={{width:120}} title='商品名称' dataIndex='itemName' cell={renderItemName}/>
                                        <Table.Column style={{width:60}} title='当前售价(元)' dataIndex='itemPrice' cell={renderItemPrice}/>
                                        <Table.Column style={{width:60}} title='操作' dataIndex='itemOpration' cell={renderItemOpration}/>
                                    </Table>
                               </TabPane>
                            </Tab>
                            <Pagination style={{paddingTop:20, textAlign:'center'}} defaultCurrent={1} onChange={paginationChange} />
                        </Dialog>
                        </div>
                      </div>
                    </FormItem>

                    <FormItem label='词组过滤：' labelCol={{ span: 6 }}>

                    </FormItem>

                    <Row style={{ marginTop: 24 }}>
                        <Col offset='6'>
                            <Button type='primary' onClick={this.handleSubmit.bind(this)}>确定</Button>
                        </Col>
                    </Row>
                </Form>

            </div>
        );
    }
}

export default connect((state)=> {
  return {
    praiseSend: state.praiseSend
  };
})(PraiseSend);

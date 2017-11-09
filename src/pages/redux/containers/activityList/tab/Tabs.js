'use strict';

import React from 'react';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import RunningTable from './Tabs/runningTable';
import EndingTable from './Tabs/endingTable';
import LinkTool from 'utils/linkTools';

const TabPane = Tab.TabPane;

const tabs = [
    { tab: '总统计', key: 0, content: <RunningTable/>},
    { tab: '抽奖统计', key: 1, content: <EndingTable/>},
    { tab: '送礼统计', key: 3, content: <RunningTable/>},
    { tab: '积分统计', key: 4, content: <EndingTable/>},
];
class Tab1 extends React.Component {
    constructor(props){
        super(props);
    }
    handleChange(key) {
        // console.log(key);
    }
    handleClick(key) {
        // console.log(key);
    }
    CreateActivity=()=>{
        location.href=LinkTool['redux-setConfig']+'?status=n&type=88&activityId='+this.props['data-activityId'];
    }

    render(){//<Button type="primary" style={{marginRight:'20px'}} onClick={this.CreateActivity.bind(this)}>高级版本 立即充值</Button>;
        const extraContent =<p style={{color:'gray',marginBottom:0,lineHeight:'38px'}}>高级版本每月拉单量为1万单超过请充值<span  style={{marginRight:'20px',paddingLeft:'20px',color:'#3089dc'}} onClick={this.CreateActivity.bind(this)}>立即充值</span></p>
        return <div style={{width:'100%'}}>
            <Tab defaultActiveKey={0} onChange={this.handleChange.bind(this)} tabBarExtraContent={extraContent}>
            {
                tabs.map(item => <TabPane key={item.key} tab={item.tab} onClick={this.handleClick.bind(this)}>{item.content}</TabPane>)
            }
            </Tab>
        </div>;
    }
}
export default Tab1;

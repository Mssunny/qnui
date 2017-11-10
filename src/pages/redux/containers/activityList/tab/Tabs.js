'use strict';

import React from 'react';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import TotalStatistics from './Tabs/totalStatistics'; //总统计
import LotteryStatistics from './Tabs/lotteryStatistics'; //抽奖统计
import GiftsStatistics from './Tabs/giftsStatistics'; //送礼统计
import IntegralStatistics from './Tabs/integralStatistics'; //积分统计
import CreatAIndex from '../creatActive/creatActive'; //
import LinkTool from 'utils/linkTools';

const TabPane = Tab.TabPane;
let tabBorder = {
    //border: '1px solid #e6e6e6',
    margin: '0 20px',
}
const tabs = [
    {
        tab: '总统计',
        key: 0,
        content: <TotalStatistics/>
    },
    {
        tab: '抽奖统计',
        key: 1,
        content: <LotteryStatistics/>
    },
    {
        tab: '送礼统计',
        key: 2,
        content: <GiftsStatistics/>
    },
    {
        tab: '积分统计',
        key: 3,
        content: <IntegralStatistics/>
    },
];
class Tab1 extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange(key) {
        console.log("key" + key);
    }
    handleClick(key) {
        //console.log("key"+key);
    }
    CreateActivity=() => {
        location.href = LinkTool['redux-setConfig'] + '?status=n&type=88&activityId=' + this.props['data-activityId'];
    }
    render() { //<Button type="primary" style={{marginRight:'20px'}} onClick={this.CreateActivity.bind(this)}>高级版本 立即充值</Button>;
        const extraContent = <p style={{
            color: 'gray',
            marginBottom: 0,
            lineHeight: '38px'
        }}>高级版本每月拉单量为1万单超过请充值<span  style={{
            marginRight: '20px',
            paddingLeft: '20px',
            color: '#3089dc'
        }} onClick={this.CreateActivity.bind(this)}>立即充值</span></p>
        return <div style={{
                width: '100%'
            }}>
            <Tab defaultActiveKey={0} onChange={this.handleChange.bind(this)} tabBarExtraContent={extraContent} style={tabBorder}>
            {
            tabs.map(item => <TabPane key={item.key} tab={item.tab} onClick={this.handleClick.bind(this)}>{item.content}</TabPane>)
            }
            </Tab>

           <CreatAIndex/>
           </div>
    }
}
export default Tab1;
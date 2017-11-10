'use strict';

import React from 'react';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import RunningTable from './Tabs/runningTable';
import EndingTable from './Tabs/endingTable';
import LinkTool from 'utils/linkTools';

const TabPane = Tab.TabPane;

const tabs = [
    { tab: '运行中的活动', key: 0, content: <RunningTable/>},
    { tab: '结束的活动', key: 1, content: <EndingTable/>},
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

    render(){
        const extraContent = <Button type="primary" style={{marginRight:'20px'}} onClick={this.CreateActivity.bind(this)}>创建活动</Button>;
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

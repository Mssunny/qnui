'use strict';

import React from 'react';
import Button from 'qnui/lib/button';
import Tab from 'qnui/lib/tab';
import { Row, Col } from 'qnui/lib/grid';
import $ from 'jquery';
import LinkTool from 'utils/linkTools';
import Tools from 'utils/index';
import apimap from 'utils/apimap';
const apienv = window.apienv || 'local';
const apiname = 'ActivityDiv';
class ActivityDiv extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }
    componentWillMount(){
        $.get(apimap[apienv][apiname], function(result) {
            var resultData = apienv=='local'?result:JSON.parse(result);
            console.log('$.get',resultData);
            this.setState({
                data:resultData
            })
        }.bind(this));

    }
    render() {
        return <div className='div-index'>
            <div className='div-top'><span className='ml20'>彩票功能已正式上线啦!</span></div>
             {this.state.data.ishave==1?(<div className='demo-col-inset'>
                    <div className='div-left div-both'>
                        <div className='div-inner-top-l'>
                            抽奖活动
                        </div>
                        <div className='div-inner-mid'>
                            支持PC/手机同时抽奖
                        </div>
                        <div className='div-inner-bot'>
                            <Button type='primary' component='a' href={LinkTool['redux-setConfig']+'?status=n&type=1&ifover=nover&activityId='+this.state.data.activityId} target='_self'>
                                创建活动
                            </Button>
                        </div>
                    </div>
                </div>):(<div className='demo-col-inset'>
                <div className='div-left div-both'>
                    <div className='div-inner-top-l'>
                        抽奖活动
                    </div>
                    <div className='div-inner-mid'>
                        支持PC/手机同时抽奖
                    </div>
                    <div className='div-inner-bot'>
                        <Button type='primary' component='a' href={LinkTool['redux-activityList']+'?activityId='+this.state.data.activityId} target='_self'>
                            查看活动
                        </Button>
                    </div>
                </div>
                </div>)}
            {/*{this.state.data.snatchExist==1?(<div className='demo-col-inset'>*/}
                {/*<div className='div-right div-both'>*/}
                    {/*<div className='div-inner-top-r'>*/}
                        {/*评价有礼*/}
                    {/*</div>*/}
                    {/*<div className='div-inner-mid'>*/}
                        {/*评价自动返奖*/}
                    {/*</div>*/}
                    {/*<div className='div-inner-bot'>*/}
                        {/*<Button type='primary' component='a' href={LinkTool['router-praiseSend']+'?flag=0'} target='_self'>*/}
                            {/*创建活动*/}
                        {/*</Button>*/}
                    {/*</div>*/}
                {/*</div>*/}
            {/*</div>):(<div className='demo-col-inset'>*/}
                {/*<div className='div-right div-both'>*/}
                    {/*<div className='div-inner-top-r'>*/}
                        {/*评价有礼*/}
                    {/*</div>*/}
                    {/*<div className='div-inner-mid'>*/}
                        {/*评价自动返奖*/}
                    {/*</div>*/}
                    {/*<div className='div-inner-bot'>*/}
                        {/*<Button type='primary' component='a' href={LinkTool['router-praiseSend']+'?flag=0'} target='_self'>*/}
                            {/*查看活动*/}
                        {/*</Button>*/}
                    {/*</div>*/}
                {/*</div>*/}
            {/*</div>)}*/}
        </div>;
    }
}
export default ActivityDiv;

'use strict';

import React from 'react';
import { connect } from 'react-redux';
import LinkTool from 'utils/linkTools';
import Button from 'qnui/lib/button';
import $ from 'jquery';
import apimap from 'utils/apimap';

const apienv = window.apienv || 'local';
const apiname = 'LoginState';
class ActivityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    componentWillMount() {
        $.get(apimap[apienv][apiname], function(result) {
            var resultData = apienv == 'local' ? result : JSON.parse(result);
            console.log('$.get', resultData);
            this.setState({
                data: resultData
            })
            console.log("ishave" + this.state.data.ishave)
        }.bind(this));

    }
    render() {
        return (
            <div className = 'g-wrapper' style={{
                margin: '0 20px'
            }}>
      <div className="g-title">创建活动<span className="g-r-text">只支持有订单用户发送短信</span></div>  
      <div className>
        {this.state.data.ishave == 1 ?
                (<div><ul className="pd-lr20 actionlist"> <li><span className="title1">抽奖</span> <span className="textStateGary">(未开启)</span></li><li>定价送机会</li>
        <li>买送机会</li>
        <li>满送机会</li> 
        <li>分享送机会</li> 
        <li>签到送机会</li> 
        <li>收藏/关注送机会</li> 
        <li>评价送机会</li> 
        <li>问卷送机会</li>        
        <li>买送机会</li> 
        <li><Button type="primary" size="large" className="alignCenter">创建活动</Button></li>
        </ul>
        <ul className="pd-lr20 actionlist"> <li><span className="title1">直接送礼</span> <span className="textStateGary">(未开启)</span></li><li>定价送机会</li>
        <li>买送机会</li>
        <li>满送机会</li> 
        <li>分享送机会</li> 
        <li>签到送机会</li> 
        <li>收藏/关注送机会</li> 
        <li>评价送机会</li> 
        <li>问卷送机会</li>        
        <li>买送机会</li> 
        <li><Button type="primary" size="large" className="alignCenter">创建活动</Button></li>
        </ul>
        <ul className="pd-lr20 actionlist"> <li><span className="title1">会员积分</span> <span className="textStateGary">(未开启)</span></li><li>填写会员信息获积分</li>
        <li>购物获积分</li>
        <li>分享获积分</li> 
        <li>签到获积分</li> 
        <li>收藏/关注获积分</li> 
        <li>评价获积分</li> 
        <li>问卷获机会</li>               
        <li><Button type="primary" size="large" className="alignCenter">创建活动</Button></li>
        </ul>
        <ul className="pd-lr20 actionlist"> <li><span className="title1">自动评价</span> <span className="textStateGary">(未开启)</span></li><li>自动回评<span className="textrtblue">未开启</span></li>
        <li>差评展示<span className="textrtblue">未开启</span></li>            
        <li><Button type="primary" size="large" className="alignCenter">创建活动</Button></li>
        </ul>
        <ul className="pd-lr20 actionlist"> <li><span className="title1">活动短信</span> <span className="textStateGary">(未开启)</span></li><li>抽奖短信<span className="textrtblue">未开启</span></li>
        <li>获奖短信<span className="textrtblue">未开启</span></li>       
        <li>积分短信<span className="textrtblue">未开启</span></li>       
        <li><Button type="primary" size="large" className="alignCenter">创建活动</Button></li>
        </ul></div>) : ""}
      </div>  
    </div>
        )
    }
}

export default connect((state) => {
    return {
        activityList: state.activityList
    };
})(ActivityList);

'use strict';

import React from 'react';
import { connect } from 'react-redux';
//import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Tabs from '../../redux/containers/activityList/tab/Tabs';
//import { Row, Col } from 'qnui/lib/grid';
import $ from 'jquery';
import LinkTool from 'utils/linkTools';
import apimap from 'utils/apimap';//本地模拟数据api  

const apienv = window.apienv || 'local';
const apiname = 'InitData'; //访问量接口
class InitData extends React.Component {
    constructor(props){
        super(props);
        this.state={
            result:[],
        }
    }
    componentWillMount(){
        $.get(apimap[apienv][apiname], function(result) {
            var resultData = apienv=='local'?result:JSON.parse(result);
            console.log('$.get',resultData);
            this.setState({
                result:resultData
            })
        }.bind(this));

    }
   render() {
    return (
      <div>
        <div className='div-top'><span className='ml20' >2017抽奖点我全新改版上线啦!</span></div>
        <Tabs data-activityId={this.state.result.activityId}/>
        
      </div>
    );
  }
}
export default connect((state)=> {
  return {
    InitData: state.InitData
  };
})(InitData);

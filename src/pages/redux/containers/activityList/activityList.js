'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/activityList';
import Breadcrumb from 'qnui/lib/breadcrumb';
import LinkTool from 'utils/linkTools';
// import Pagination from './mod/Pagination';
import Button from 'qnui/lib/button';
import Tabs from './mod/Tabs';
import Step,{Item as StepItem} from 'qnui/lib/step';
import './activityList.scss';
import $ from 'jquery';
import apimap from 'utils/apimap';

const apienv = window.apienv || 'local';
class ActivityList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      result:[]
    }
  }
  componentWillMount(){
    $.get(apimap[apienv]['MarketingMeanslieb'],function(result) {
        let resultData = (apienv == 'local' ? result : JSON.parse(result));
        console.log('activity.resultData->', resultData);
        this.setState({
          result:resultData
        });
      }.bind(this));
  }
  render() {
    return (
      <div>
        <Breadcrumb style={{padding:20}}>
          <Breadcrumb.Item link={LinkTool['index']}>抽奖活动</Breadcrumb.Item>
          <Breadcrumb.Item link={LinkTool['redux-setConfig']}>活动设置</Breadcrumb.Item>
          <Breadcrumb.Item link={LinkTool['redux-activityList']}>活动列表</Breadcrumb.Item>
        </Breadcrumb>
        <Tabs data-activityId={this.state.result.activityId}/>
        {/*<Pagination/>*/}
      </div>
    );
  }
}
export default connect((state)=> {
  return {
    activityList: state.activityList
  };
})(ActivityList);

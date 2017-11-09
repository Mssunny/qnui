'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Navigation, Icon } from 'qnui';
import * as actions from '../../actions/toolkit';
import Step, { Item as StepItem } from 'qnui/lib/step';
import Breadcrumb from 'qnui/lib/breadcrumb'
import Button from 'qnui/lib/button';

import LinkTool from 'utils/linkTools';
import Dialog from 'qnui/lib/dialog';
import $ from 'jquery';
import './toolkit.scss';
const apienv = window.apienv || 'local';

class Toolkit extends React.Component {
   constructor(props){
    super(props);
      this.state = {
       
      };
    
  } 
  render(){
    const rowSelection = {
       
        getProps: (record) =>{
            return {
                disabled: record.nickName == f_xuxinxin
            }
        }
    }
    return (
      <div>
        <Breadcrumb style={{padding: 20}}>
        <Breadcrumb.Item link={LinkTool['index']}>首页</Breadcrumb.Item>
        <Breadcrumb.Item >工具箱</Breadcrumb.Item>
        </Breadcrumb>
        <br></br>
       <div className="right-content-bor">
          <dl className="dl-wrap">
            <dt><span >自动评价</span><Icon type="favorites-filling" size='xl' className="icon1"/></dt>
            <dd><Button type='primary' className="Button-secondary">立即使用</Button></dd>

          </dl>
       </div>
      </div>
      );
  }
}
export default connect((state)=> {
  return {
    toolkit: state.toolkit
  };
})(Toolkit);

'use strict';

import React from 'react';
//import Table from 'qnui/lib/table';
import Button from 'qnui/lib/button';
import Dialog from 'qnui/lib/dialog';
import apimap from 'utils/apimap';
import Pagination from 'qnui/lib/pagination';
import LinkTool from 'utils/linkTools';
import { Row, Col } from 'qnui/lib/grid';
import $ from 'jquery';
// import 'whatwg-fetch';
// import 'es6-promise';
import './statistics.scss'; //统计
const apienv = window.apienv || 'local';
const apiname = 'LoginState';
class TotalStatistics extends React.Component {
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
        return <div><div className = 'g-wrapper' > 
        { < div className="pd-tb16"> < div className = "statistics" >
      < div className = "conts" >
      < div className = "title" > 昨日访问量 < /div> < div className = "num" >{this.state.data.ishave == 1 ? this.state.data.zrfwl : "--"} < /div > < /div> < div className = "conts" >
      < div className = "title" > 昨日收藏 < /div> < div className = "num" >{this.state.data.ishave == 1 ? this.state.data.zrsc : "--"} < /div > < /div> < div className = "conts" >
      < div className = "title" > 昨日分享 < /div> < div className = "num" >{this.state.data.ishave == 1 ? this.state.data.zrfx : "--"} < /div > < /div> < div className = "conts" >
      < div className = "title" > 昨日签到 < /div> < div className = "num" >{this.state.data.ishave == 1 ? this.state.data.zrqd : "--"} < /div > < /div> < div className = "conts" >
      < div className = "title" > 昨日评价 < /div> < div className = "num" >{this.state.data.ishave == 1 ? this.state.data.zrpj : "--"} < /div >
      < /div>{this.state.data.ishave == 2 ? (< div className = "conts" > < div className = "title" > 昨日拉单量 < /div> < div className = "num" >{this.state.data.zrldl} < /div >
      < /div>) : ""}< /div >
      < div className = "statistics" >
      < div className = "conts" >
      < div className = "title" > 总访问量 < /div> < div className = "num" >{this.state.data.ishave == 2 ? this.state.data.zfwl : "--"} < /div > < /div> < div className = "conts" >
      < div className = "title" > 总收藏 < /div> < div className = "num" >{this.state.data.ishave == 2 ? this.state.data.zsc : "--"} < /div > < /div> < div className = "conts" >
      < div className = "title" > 总分享 < /div> < div className = "num" >{this.state.data.ishave == 2 ? this.state.data.zfx : "--"} < /div > < /div> < div className = "conts" >
      < div className = "title" > 总签到 < /div> < div className = "num" >{this.state.data.ishave == 2 ? this.state.data.zqd : "--"} < /div > < /div> < div className = "conts" >
      < div className = "title" > 总评价 < /div> < div className = "num" >{this.state.data.ishave == 2 ? this.state.data.zpj : "--"} < /div >
      < /div>  {this.state.data.ishave == 2 ? (< div className = "conts" >
      < div className = "title" > 总拉单量 < /div> < div className = "num" >{this.state.data.zldl} < /div >
      < /div>) : ""} < /div>< /div >}     
     < /div>

     < /div>;




    }
}

export default (TotalStatistics);
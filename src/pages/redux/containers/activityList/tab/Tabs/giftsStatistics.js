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
        return <div className = 'g-wrapper' > {
            <div>
            < div className = "statistics" >
            < div className = "conts" >
            < div className = "title" >昨日送礼< /div> < div className = "num" >{this.state.data.ishave == 1 ? this.state.data.zrfwl : "--"} < /div> < /div>
           < /div>
            < div className = "statistics" >
            < div className = "conts" >
            < div className = "title" >总送礼 < /div> < div className = "num" >{this.state.data.ishave == 2 ? this.state.data.zfwl : "--"} < /div> < /div>          
            < /div>
            < /div>}

            < /div>;
    }
}

export default (TotalStatistics);
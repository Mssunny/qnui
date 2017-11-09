'use strict';

import React from 'react';
import Input from 'qnui/lib/input';
import Dropdown from './Input/Dropdown'
const change = function(value) {
    console.log(value);
    };
class Input1 extends React.Component {
    
  render() {
    return <div>
	    <span>奖品类型设置:</span><Dropdown/>
	    <br />
	    <br />
	    <span>奖品数量:</span><Input style={{width: 150}} className='textClsName'/>
	    <br />
	    <br />
	    <span className='sd-send-draw'>手动送抽奖:</span><Input rows='5' style={{width: 400}} size='medium' multiple/>
	</div>;
  }
}
export default Input1;
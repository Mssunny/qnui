'use strict';

import React from 'react';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';
const onClick= () => {
    console.log(arguments);
}

const menu = <Menu onClick={onClick}>
    <Menu.Item selected>流量</Menu.Item>
    <Menu.Item>红包</Menu.Item>
    <Menu.Item>彩票</Menu.Item>
    <Menu.Item>自定义奖品</Menu.Item>
</Menu>, afterOpen = ()=>{ console.log('openMenu') } ;

function handleClick(key) {

    console.log('click', key);
}
class Dropdown1 extends React.Component {
    
  render() {
    return <Dropdown trigger={<span>自定义奖品</span>} triggerType='click' afterOpen={afterOpen}>
    {menu}
</Dropdown>
  }
}
export default Dropdown1;




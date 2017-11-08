'use strict';

import React from 'react';
import { Navigation, Icon } from 'qnui';
import classnames from 'classnames';
import LinkTool from 'utils/linkTools';
import './side-menu.scss';
import $ from "jquery";
const Item = Navigation.Item;
const Group = Navigation.Group;

class SideMenu extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let className = classnames({
      "left-menu": true
    });
    return (
      <div className={className}>
        <Navigation
          style={{ width: '100%' }}
          type="tree"
		      //selectedStyle="true"
          activeDirection="right"
        >
          <Item
      			itemid="none"
      			icon="history"
      			text="首页"
      			link={LinkTool.index}/>
          <Item
            itemid="redux"
            className="left-nav-item"
            icon="service"
            text="抽奖活动">
  		      <Navigation >
              <Item
                itemid="redux-activityList"
                className="left-nav-item"
                text="活动列表"
                icon="service"
                link={LinkTool['redux-activityList']} />
              <Item
                itemid="redux-pcMod"
                className="left-nav-item"
                text="PC模板"
                icon="training"
                link={LinkTool['redux-pcMod']} />
              <Item
                itemid="redux-mobileMod"
                className="left-nav-item"
                text="手淘模板"
                icon="electronics"
                link={LinkTool['redux-mobileMod']} />
              <Item
                itemid="redux-fullMod"
                className="left-nav-item"
                text="全屏模板"
                icon="training"
                link={LinkTool['redux-fullMod']} />
            </Navigation>
  			  </Item>
          {/*<Item*/}
            {/*itemid="router-group"*/}
            {/*className="left-nav-item"*/}
            {/*icon="attachment"*/}
            {/*text="评价有礼" >*/}
            {/*<Navigation >*/}
              {/*<Item*/}
                {/*itemid="router-praiseSend"*/}
                {/*className="left-nav-item"*/}
                {/*text="评价送礼"*/}
                {/*icon="service"*/}
                {/*link={LinkTool['router-praiseSend']} />*/}
              {/*<Item*/}
                {/*itemid="router-recordList"*/}
                {/*className="left-nav-item"*/}
                {/*text="记录列表"*/}
                {/*icon="training"*/}
                {/*link={LinkTool['router-recordList']} />*/}
            {/*</Navigation>*/}
          {/*</Item>*/}
  		    {/*<Item*/}
            {/*itemid="sucaiku"*/}
            {/*className="left-nav-item"*/}
            {/*icon="history"*/}
            {/*text="素材库"*/}
  		      {/*link={LinkTool.sucaiku}/>*/}
        </Navigation>
      </div>
    );
  }
}

export default SideMenu;

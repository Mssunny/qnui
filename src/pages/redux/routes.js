'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from 'components/layout/layout';
import ActivityList from './containers/activityList/activityList';
import PcMod from './containers/pcMod/pcMod';
import MobileMod from './containers/mobileMod/mobileMod';
import FullMod from './containers/fullMod/fullMod';
import SetPrize from './containers/activityList/setPrize/setPrize';
import SetConfig from './containers/activityList/setConfig/setConfig';
import RecordList from './containers/activityList/recordList/recordList';
import ModifyRules from './containers/activityList/modifyRules/modifyRules';
import UseLink from './containers/activityList/useLink/useLink';

let pageTitle = document.title;

/**
 * menu 选中态map,其中value为side-menu组件中的itemid
 */
const menuMap = {
  '/activityList': 'redux-activityList',
  '/pcMod': 'redux-pcMod',
  '/mobileMod': 'redux-mobileMod',
  '/fullMod': 'redux-fullMod',
}

const onRouteEnter = (nextState, replace, callback) => {
  callback();
  //根据路由设置菜单选中
  let routePath = nextState.location.pathname;
  window.selectedMenuKey = menuMap[routePath];
  console.log( menuMap[routePath]);
};
const onRouteChange = (prevState, nextState, replace, callback) => {
  callback();
  document.title = nextState.routes[1].title || pageTitle;

    //根据路由设置菜单选中
  let routePath = nextState.location.pathname;
  window.selectedMenuKey = menuMap[routePath];
   console.log(menuMap[routePath]);
};

export default (<Route path="/" component={Layout} onEnter={onRouteEnter} onChange={onRouteChange}>
  <Route path="activityList" component={ActivityList} title="活动列表" />
  <Route path="pcMod" component={PcMod} title="PC模板"/>
  <Route path="mobileMod" component={MobileMod} title="手淘模板"/>
  <Route path="fullMod" component={FullMod} title="全屏模板"/>
  <Route path="setPrize" component={SetPrize} title="设置抽奖奖品"/>
  <Route path="setConfig" component={SetConfig} title="设置抽奖条件"/>
  <Route path="recordList" component={RecordList} title="记录列表"/>
  <Route path="modifyRules" component={ModifyRules} title="修改抽奖规则"/>
  <Route path="useLink" component={UseLink} title="安装链接"/>

  <IndexRoute component={ActivityList}/>
  <Route path="*" component={ActivityList}/>
</Route>);

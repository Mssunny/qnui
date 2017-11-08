'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from 'components/layout/layout';
import PraiseSend from './containers/praiseSend/praiseSend';
import RecordList from './containers/recordList/recordList';
import Pay from './containers/pay/pay';


let pageTitle = document.title;

/**
 * menu 选中态map,其中value为side-menu组件中的itemid
 */
const menuMap = {
  '/praiseSend': 'router-praiseSend',
  '/recordList': 'router-recordList'
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

export default (<Route path='/' component={Layout} onEnter={onRouteEnter} onChange={onRouteChange}>
  <Route path='praiseSend' component={PraiseSend} title='praiseSend' />
  <Route path='recordList' component={RecordList} title='recordList'/>
  <Route path='pay' component={Pay} title='pay'/>
  <IndexRoute component={PraiseSend}/>
  <Route path='*' component={PraiseSend}/>
</Route>);

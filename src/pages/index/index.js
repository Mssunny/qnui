'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store/index';
import reducers from './reducers/index';
import Layout from 'components/layout/layout';
//import Mods from './mod/activityDiv'; 抽奖活动老版首页
import Index from './index/index'; // 新版首页
import './index.scss';
const store = createStore(reducers);
ReactDOM.render(
  <Provider store={store}>
    <Layout>
      <Index/>
    </Layout>
   </Provider>,
  document.getElementById('container')
);


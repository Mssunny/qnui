'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store/index';
import reducers from './reducers/index';
import Layout from 'components/layout/layout';
import Mods from './mod/activityDiv';
import './index.scss';
const store = createStore(reducers);
ReactDOM.render(
  <Provider store={store}>
    <Layout>
      <Mods/>
    </Layout>
   </Provider>,
  document.getElementById('container')
);


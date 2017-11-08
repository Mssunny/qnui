'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store/index';
import reducers from './reducers/index';
import Layout from 'components/layout/layout';
import List from './mods/list/list';
import './index.scss';

const store = createStore(reducers);
ReactDom.render(
  <Provider store={store}>
    <Layout>
    	<List/>
    </Layout>
  </Provider>,
  document.getElementById('container')
);

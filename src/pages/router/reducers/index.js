'use strict';

import { combineReducers } from 'redux';
import RecordList from './recordList/';
import { routerReducer } from 'react-router-redux';
import PraiseSend from './praiseSend/';

// 将现有的reduces加上路由的reducer
const rootReducer = combineReducers({
    PraiseSend,
    RecordList,
    routing: routerReducer
});

export default rootReducer;

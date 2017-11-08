'use strict';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ActivityList from './activityList/';
import PcMod from './pcMod/';
import MobileMod from './mobileMod/';
import FullMod from './fullMod/';



// 将现有的reduces加上路由的reducer
const rootReducer = combineReducers({
  ActivityList,
  PcMod,
  MobileMod,
  FullMod,
  routing: routerReducer
});

export default rootReducer;

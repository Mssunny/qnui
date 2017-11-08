'use strict';

import * as actions from '../actions/index';

// 对页面prop 数据进行管理
const initialState = {
  hasSnatch:0,
  ishave:0
};
const defaultAction = {
  type: 'doNothing'
};

export default function index(state = initialState, action = defaultAction) {
  switch (action.type) {
    case actions.GET_LIST_SUCCESS:

      return Object.assign({}, state, {
        hasSnatch: action.data.hasSnatch,
        ishave: action.data.ishave
      });

    default:
      return state;
  }
}

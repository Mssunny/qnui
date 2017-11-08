'use strict';

import * as actions from '../actions/sucaiku';

// 对页面prop 数据进行管理
const initialState = {
  // list: [],
  counter: 0
};
const defaultAction = {
  type: 'doNothing'
};

export default function index(state = initialState, action = defaultAction) {
console.log('state,action',state,action);
console.log(action.GET_LIST_SUCCESS);
  switch (action.type) {

    case actions.GET_LIST_SUCCESS:

      return Object.assign({}, state, {
        // list: action.data.list.map(item => {
        //   return `第${action.data.counter}次加载：${item}`;
        // }),
        counter: action.data.ishave
      });

    default:
      return state;
  }
}

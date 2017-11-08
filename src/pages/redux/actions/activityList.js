'use strict';

// constants 与 actions 在一起
import { ajax, nameSpace} from 'utils/index';

let ns = nameSpace('ActivityList');
export const GET_DATA = ns('GET_DATA');

export function getList(data) {

  return (dispatch) => {

    //发送请求前
    dispatch({
      type: GET_LIST_REQUEST,
      data: data
    });

    //接收到数据
    ajax({
      api: 'EndingTable',
      method: 'GET',
    }).then(json => {
      //成功后
      dispatch({
        type: GET_LIST_SUCCESS,
        data: 'activityList'
      });

    }, json => {
      //失败后
      dispatch({
        type: GET_LIST_FAILED,
        data: json
      });

    });

  };
}

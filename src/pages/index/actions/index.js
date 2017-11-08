'use strict';

import { ajax, nameSpace} from 'utils/index';

let ns = nameSpace('Index');
export const GET_LIST_SUCCESS = ns('GET_LIST_SUCCESS');

export function getData(sucCallback, failCallback) {

  return (dispatch) => {

    //接收到数据
    ajax({
      api: 'ActivityDiv',
      method: 'GET',
    }, json => {

      dispatch({
        type: GET_LIST_SUCCESS,
        data: {
        	hasSnatch: json.data.hasSnatch,
        	ishave: json.data.ishave
        }
      });
      sucCallback(json);

    }, json => {

      failCallback(json);
    });

  };
}

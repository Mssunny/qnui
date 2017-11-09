import Tools from 'utils/index';
const linkConfig = {
  //本地localhost或127.0.0.1环境下的路径设置
  local: {
    'index': '/demos/index.html',
    'router-praiseSend': '/demos/router.html#/praiseSend',
    'router-recordList': '/demos/router.html#/recordList',
    'router-pay': '/demos/router.html#/pay',
    'router-toolkit': '/demos/router.html#/toolkit',
	'redux-activityList': '/demos/redux.html#/activityList',
    'redux-setConfig': '/demos/redux.html#/setConfig',
    'redux-setPrize': '/demos/redux.html#/setPrize',
    'redux-recordList': '/demos/redux.html#/recordList',
    'redux-useLink': '/demos/redux.html#/useLink',
    'redux-modifyRules':'/demos/redux.html#/modifyRules',
    // 'redux-modifyRules-save':'/demos/redux.html#/modifyRules',
    'redux-pcMod': '/demos/redux.html#/pcMod',
    'redux-mobileMod': '/demos/redux.html#/mobileMod',
    'redux-fullMod': '/demos/redux.html#/fullMod',
	  'sucaiku': '/demos/sucaiku.html',

  },
  onLine: {//自行根据服务端路径定义
    'index': 'QnIndex.h4',
    'router-praiseSend': 'QnRouter.h4#/praiseSend',
    'router-recordList': 'QnRouter.h4#/recordList',
    'router-pay': 'QnRouter.h4#/pay',
    'router-tool-kit': '/demos/router.html#/toolkit',//工具箱
	  'redux-activityList': 'QnRedux.h4#/activityList',
    'redux-setConfig': 'QnRedux.h4#/setConfig',
    'redux-setPrize': 'QnRedux.h4#/setPrize',
    'redux-useLink': 'QnRedux.h4#/useLink',
    'redux-recordList': 'QnRedux.h4#/recordList',
    'redux-modifyRules':'QnRedux.h4#/modifyRules',
    // 'redux-modifyRules-save':'QnRedux.h4#/modifyRules',
    'redux-pcMod': 'QnRedux.h4#/pcMod',
    'redux-mobileMod': 'QnRedux.h4#/mobileMod',
	  'redux-fullMod': 'QnRedux.h4#/fullMod',
	  'sucaiku': 'QnSucaiku.h4'
  }
}

const links = Tools.isLocal() ? linkConfig.local : linkConfig.onLine;
export default links;

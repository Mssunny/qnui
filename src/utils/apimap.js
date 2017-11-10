'use strict';

/**
 * API MAP 对象
 * 页面上所有ajax请求统一在这里管理.
 */
export default {
  //本地开发环境,一般可以mock数据
  local : {
    /*invoke*/
    FullGetGoodsListSearch:'/data/FullGetGoodsListSearch.json',
    FullGetGoodsListgenx:'/data/FullGetGoodsListgenx.json',
    FullGetGoodsListgenxt:'/data/FullGetGoodsListgenxt.json',
    FullGetGoodsListgenxt1:'/data/FullGetGoodsListgenxt1.json',
    FullGetGoodsListgenxt2:'/data/FullGetGoodsListgenxt2.json',
    FullGetGoodsListgenxt3:'/data/FullGetGoodsListgenxt3.json',
    RedEnvelopesSave:'/data/RedEnvelopesSave.json',
    MarketingMeanslieb2:'/data/MarketingMeanslieb2.json',
    MarketingMeanslieb:'/data/MarketingMeanslieb.json',
    MarketingMeansliebt:'/data/MarketingMeansliebt.json',
    QueryPrizeTempList:'/data/QueryPrizeTempList.json',
    QueryPrizeTempList1:'/data/QueryPrizeTempList1.json',
    QueryPrizeTempList2:'/data/QueryPrizeTempList2.json',
    MarketingMeansSet2Savegenx:'/data/MarketingMeansSet2Savegenx.json',
    MarketingMeansSet2Savegenxgail:'/data/MarketingMeansSet2Savegenxgail.json',
    // MarketingMeansSetgenx:'/data/MarketingMeansSetgenx.json',
    ActDupChk:'/data/ActDupChk.json',
    HeadInfo:'/data/HeadInfo.json',
    CreateActivity:'/data/CreateActivity.json',
    MarketingMeansdelete:'/data/MarketingMeansdelete.json',
    MarketingMeansSetgenx:'/data/MarketingMeansSetgenx.json',
    MarketingMeansSetSavegenx:'/data/MarketingMeansSetSavegenx.json',
    MarketingMeansSet2genx:'/data/MarketingMeansSet2genx.json',
    MarketingMeansSetUpdate:'/data/MarketingMeansSetUpdate.json',
    MarketingMeansSetDrainageSavegenx:'/data/MarketingMeansSetDrainageSavegenx.json',
    MarketingManualSendgenx: '/data/MarketingManualSendgenx.json',
    MarketingManualSendSavegenx: '/data/MarketingManualSendSavegenx.json',
    MarketingMeansRunControlgenx: '/data/MarketingMeansRunControlgenx.json',
    ActivityDiv: '/data/ActivityDiv.json',
    CreateActivityButton : '/data/CreateActivityButton.json',
    ModifyRules :'/data/ModifyRules.json',
    SysSetUpSave:'/data/SysSetUpSave.json',
    GiftDrawChancetoo:'/data/GiftDrawChancetoo.json',
    MarketingMeansDrawgx:'/data/MarketingMeansDrawgx.json',
    SMSDrawChancegx:'/data/SMSDrawChancegx.json',
    MarketingMeansDrawDel:'/data/MarketingMeansDrawDel.json',
    MarketingMeansDrawUserInfo:'/data/MarketingMeansDrawUserInfo.json',
    MarketingMobileLotterygenx:'/data/MarketingMobileLotterygenx.json',
    MarketingDrawTemplateSavegenx:'/data/MarketingDrawTemplateSavegenx.json',
    MarketingMeansDrawUpdateSendType:'/data/MarketingMeansDrawUpdateSendType.json',


    InitData:'/data/InitData.json',
    LoginState:'/data/LoginState.json'

  },
  //daily环境,可重写base定义的接口
  development:{
    FullGetGoodsListgenx:'/admin/FullGetGoodsListgenx.json',
    FullGetGoodsListgenxt:'/admin/FullGetGoodsListgenxt.json',
    FullGetGoodsListgenxtt:'/admin/FullGetGoodsListgenxtt.json',
    FullGetGoodsListgenxttt:'/admin/FullGetGoodsListgenxttt.json',
    RedEnvelopesSave:'/admin/RedEnvelopesSave.json',
    MarketingMeanslieb2:'/admin/MarketingMeanslieb2.json',
    MarketingMeanslieb:'/admin/MarketingMeanslieb.json',
    MarketingMeansliebt:'/admin/MarketingMeansliebt.json',
    QueryPrizeTempList:'/admin/QueryPrizeTempList.json',
    MarketingMeansSet2Savegenx:'/admin/MarketingMeansSet2Savegenx.json',
    MarketingMeansSet2Savegenxgail:'/admin/MarketingMeansSet2Savegenxgail.json',
    // MarketingMeansSetgenx:'/admin/MarketingMeansSetgenx.json',
    ActDupChk:'/admin/ActDupChk.json',
    HeadInfo:'/admin/HeadInfo.json',
    CreateActivity:'/admin/MarketingMeansSetgenx.json',
    MarketingMeansdelete:'/admin/MarketingMeansdelete.json',
    MarketingMeansSetgenx:'/admin/MarketingMeansSetgenx.json',
    MarketingMeansSetSavegenx:'/admin/MarketingMeansSetSavegenx.json',
    MarketingMeansSet2genx:'/admin/MarketingMeansSet2genx.json',
    MarketingMeansSetUpdate:'/admin/MarketingMeansSetUpdate.json',
    MarketingMeansSetDrainageSavegenx:'/admin/MarketingMeansSetDrainageSavegenx.json',
    MarketingManualSendgenx: '/admin/MarketingManualSendgenx.json',
    MarketingManualSendSavegenx: '/admin/MarketingManualSendSavegenx.json',
    MarketingMeansRunControlgenx: '/admin/MarketingMeansRunControlgenx.json',
    ActivityDiv: '/admin/MainPagegx.json',
    CreateActivityButton : '/admin/MarketingMeanslieb.json',
    ModifyRules :'/admin/SysSetUpgenxtoo.json',
    SysSetUpSave:'/admin/SysSetUpSave.json',
    GiftDrawChancetoo:'/admin/GiftDrawChancetoo.json',
    MarketingMeansDrawgx:'/admin/MarketingMeansDrawgx.json',
    SMSDrawChancegx:'/admin/SMSDrawChancegx.json',
    MarketingMeansDrawDel:'/admin/MarketingMeansDrawDel.json',
    MarketingMeansDrawUserInfo:'/admin/MarketingMeansDrawUserInfo.json',
    MarketingMobileLotterygenx:'/admin/MarketingMobileLotterygenx.json',
    MarketingDrawTemplateSavegenx:'/admin/MarketingDrawTemplateSavegenx.json',
    MarketingMeansDrawUpdateSendType:'/admin/MarketingMeansDrawUpdateSendType.json',


    InitData:'/data/InitData.json',
    LoginState:'/data/LoginState.json'
    // SysSetUpgenxtoo:'/admin/SysSetUpgenxtoo.json'
    //page2List: '/data/page2List.json',
  },
  //线上环境
  production:{
    //这里填入线上的host
    _HOST:'//mlottery.shopmodule.jaeapp.com'
  }
}

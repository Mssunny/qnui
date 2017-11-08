'use strict';

// constants 与 actions 在一起
import { ajax, nameSpace} from 'utils/index';

let ns = nameSpace('SetConfig');
export const GET_DATA = ns('GET_DATA');

export function getData() {
  return (dispatch) => {
    dispatch({
      type: GET_DATA,
      data: 'setConfig'
    });
  };
}
// export function getShareGoodsDataSource(page,fid,type,search,goodsIds,goodsIdsp,fromType,addType){
//   let page;/*页码*/
//   let fid;/*过滤器ID*/ 
//   let fromType;/*类型*/
//   let search;/*关键字*/
//   let goodsIds;/*新建商品选中商品*/
//   let goodsIdsp;/*新建商品选中商品*/
//   let addtype;/*类型*/
//   $.get(apimap[apienv]['FullGetGoodsListgenxt'],/* { 'page': this.state.manSomeCurrentPage, 'fid': '', 'search': this.state.manSearchValue, 'goodsIds': goodid, 'goodsIdsp': goodidp, 'fromType': 'market', 'addtype': addgoodstype },*/ function (data) {
//       this.setState({ divGoodsListData: data });
//       console.log('this.state.divGoodsListData:', this.state.divGoodsListData);
//       this.divGoodsListDisplay.bind(this, 'block');
//       var gids = this.refs.market_send_goods_ids.props.value;
//       if (gids != '') {
//           var goodsids = gids.split(',');
//           if (addgoodstype == 1) {
//               console.log('addgoodstype==1');
//               // $("#demoBtn3b").html("您已排除" + "<span style='color:#f00;'>" + goodsids.length + "</span>个宝贝");
//               this.setState({
//                   manGoodsids: goodsids.length
//               })
//           }
//           if (addgoodstype == 0) {
//               console.log('addgoodstype==0');
//               // $("#demoBtn3b").html("您已选择" + "<span style='color:#f00;'>" + goodsids.length + "</span>个参与宝贝");
//               this.setState({
//                   manGoodsids: goodsids.length
//               })
//           }
//       }
//   }.bind(this), 'json');
// }

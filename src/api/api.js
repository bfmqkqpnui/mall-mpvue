import request from './request'
import constant from '../constant/config'

// https://www.fastmock.site/mock/4d95dc6a08018dca1b878d1bbd40a4a8/mock/api
// http://yapi.demo.qunar.com/mock/68201/mock

const baseUrlApi = constant.$NET_TYPE === 'dev' ? 'http://localhost:10086/mock' : constant.$NET_TYPE === 'sit' ? 'https://mh5.bl.com/h5_gateway' : 'https://mh5.st.bl.com/h5_gateway'

console.log("baseUrlApi>", baseUrlApi)
const api = {
  // 查询首页轮播图
  queryBanners: r => request.post('/home/banners', r, {
    baseURL: baseUrlApi
  }),
  // 查询首页icon列表
  queryIcons: r => request.post('/home/iconList', r, {
    baseURL: baseUrlApi
  }),

  // 查询分类菜单列表
  queryItemMenus: r => request.post('/items/menus', r, {
    baseURL: baseUrlApi
  }),
  // 根据分类编号查询商品列表
  queryGoodsListByCategoryId: r => request.post('/items/goodsList', r, {
    baseURL: baseUrlApi
  }),


  // 查询购物车信息
  queryCartInfo: r => request.post('/cart/list', r, {
    baseURL: baseUrlApi
  }),


  // 查询订单列表
  queryOrderList: r => request.post('/order/queryOrdersByStatus', r, {
    baseURL: baseUrlApi
  }),


  // 查询用户所有收货地址
  queryAddressList: r => request.post('/address/queryAddressList', r, {
    baseURL: baseUrlApi
  }),
}

export default api

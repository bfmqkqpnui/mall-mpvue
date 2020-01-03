import request from './request'
import constant from '../constant/config'

const baseUrlApi = constant.$NET_TYPE === 'dev' ? 'https://www.fastmock.site/mock/4d95dc6a08018dca1b878d1bbd40a4a8/mock/api' : constant.$NET_TYPE === 'sit' ? 'https://mh5.bl.com/h5_gateway' : 'https://mh5.st.bl.com/h5_gateway'

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
}

export default api

module.exports = [
  {
    path: 'pages/home/home',
    name: 'home',
    config: {
      navigationBarTitleText: '首页',
    }
  },
  {
    path: 'pages/items/items',
    name: 'items',
    config: {
      navigationBarTitleText: '分类',
    }
  },
  {
    path: 'pages/cart/cart',
    name: 'cart',
    config: {
      navigationBarTitleText: '购物车',
    }
  },
  {
    path: 'pages/usercenter/usercenter',
    name: 'usercenter',
    config: {
      navigationBarTitleText: '个人中心',
    }
  },
  {
    path: 'pages/login/login',
    name: 'login',
    config: {
      navigationBarTitleText: '登录',
    }
  },
  {
    path: 'pages/imgFlipping/imgFlipping',
    name: 'imgFlipping',
    config: {
      navigationBarTitleText: '图片翻转',
    }
  },
  {
    path: 'packageB/orders/orderList',
    name: 'orderList',
    root: 'packageB',
    subPackage: true,
    config: {
      navigationBarTitleText: '我的订单',
    }
  },
  {
    path: 'packageB/orders/orderDetail',
    name: 'orderDetail',
    root: 'packageB',
    subPackage: true,
    config: {
      navigationBarTitleText: '订单详情',
    }
  },
]

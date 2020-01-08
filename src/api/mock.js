// 使用 Mock
const Random = Mock.Random
// 首页轮播
const banners = params => {
  console.log("轮播")
  let num = Random.integer(1, 6)
  let list = []
  for (let i = 0; i < num; i++) {
    let obj = {
      index: i + 1,
      imgUrl: Random.image('375x250', Random.color(), '', 'png', ''),
      link: Random.url('http')
    }
    list.push(obj)
  }
  let object = {}
  if (list && list.length) {
    object = {
      resCode: "00100000",
      obj: list,
      msg: ""
    }
  } else {
    object = {
      resCode: "00100005",
      obj: "",
      msg: "网络异常,请稍后再试"
    }
  }
  console.log("轮播完成：", JSON.stringify(object))
  return object
}

// 首页icon列表
const iconList = params => {
  let flag = Random.boolean()
  console.log("列表标识：", flag)
  let num = 5
  if (flag) {
    num = 10
  }
  let list = []
  for (let i = 0; i < num; i++) {
    let obj = {
      index: i + 1,
      imgUrl: Random.image('375x250', Random.color(), '', 'png', Random.cword(1)),
      link: Random.url('http'),
      content: Random.cword(2, 4)
    }
    list.push(obj)
  }
  let object = ""
  if (list && list.length) {
    object = {
      resCode: "00100000",
      obj: list,
      msg: ""
    }
  } else {
    object = {
      resCode: "00100005",
      obj: "",
      msg: "网络异常,请稍后再试"
    }
  }
  return object
}
// 分类菜单列表
const categories = (params) => {
  let num = Random.integer(10, 25)
  let list = []
  for (let i = 0; i < num; i++) {
    let obj = {
      index: i + 1,
      categorySid: Random.integer(100000, 999999),
      categoryName: Random.cword(2, 4)
    }
    list.push(obj)
  }
  let object = {}
  if (list && list.length) {
    object = {
      resCode: "00100000",
      obj: list,
      msg: ""
    }
  } else {
    object = {
      resCode: "00100005",
      obj: "",
      msg: "网络异常,请稍后再试"
    }
  }
  return object
}
// 分类商品列表
const goodListByCategory = (parentId) => {
  let round1 = Random.integer(2, 10)
  let list = []
  for (let i = 0; i < round1; i++) {
    let round2 = Random.integer(5, 15)
    let categorys = []
    for (let j = 0; j < round2; j++) {
      let item = {
        index: j + 1,
        categoryId: Random.integer(100000, 999999),
        categoryPicture: Random.image('150x150', Random.color()),
        categoryName: Random.cword(2, 4),
      }
      categorys.push(item)
    }
    let obj = {
      index: i + 1,
      parentId: parentId,
      categoryName: Random.cword(2, 4),
      showModel: Random.boolean() ? '1' : '0',
      categoryId: Random.integer(1000000, 9999999),
      categorys: categorys,
    }
    list.push(obj)
  }
  let object = {}
  if (list && list.length) {
    object = {
      resCode: "00100000",
      obj: list,
      msg: ""
    }
  } else {
    object = {
      resCode: "00100005",
      obj: "",
      msg: "网络异常,请稍后再试"
    }
  }
  return object
}

// 查询购物车信息
const carts = (params) => {
  let num = Random.integer(0, 25)
  let list = []
  for (let i = 0; i < num; i++) {
    let obj = {
      index: i + 1,
      categorySid: Random.integer(100000, 999999),
      categoryName: Random.cword(2, 4)
    }
    list.push(obj)
  }
  let object = {}
  if (list && list.length) {
    object = {
      resCode: "00100000",
      obj: list,
      msg: ""
    }
  } else {
    object = {
      resCode: "00100005",
      obj: "",
      msg: "网络异常,请稍后再试"
    }
  }
  return object
}

// 查询订单列表
const orderList = (params) => {
  let num = Random.integer(0, 25)
  let list = []
  for (let i = 0; i < num; i++) {
    let obj = {
      index: i + 1,
      orderId: Random.integer(1000000000, 9999999999),
      orderStatus: Random.integer(1001, 1005),
      totalCount: Random.integer(1, 99),
      totalAmount: Random.float(1, 999999, 2, 2),
    }
    let goodsList = []
    let goodsNum = Random.integer(1, 10)
    for (let j = 0; j < goodsNum; j++) {
      let good = {
        goodsId: Random.integer(1000000, 9999999999),
        goodsSaleName: Random.cword(10, 50),
        goodsSpecs: Random.cword(8, 20),
        goodsImg: Random.image('150x150', Random.color()),
        goodsPrice: Random.float(100, 999999, 2, 2),
        buyNumber: Random.integer(1, 99)
      }
      let promitionNum = Random.integer(0, 3)
      let goodsPromitionList = []
      for (let k = 0; k < promitionNum; k++) {
        let pro = {
          promitionId: Random.integer(1000, 9999),
          promitionType: Random.word(2, 8),
          promitionName: Random.cword(2, 6)
        }
        goodsPromitionList.push(pro)
      }
      if (goodsPromitionList && goodsPromitionList.length) {
        good.goodsPromitions = goodsPromitionList
      }
      goodsList.push(good)
    }
    if (goodsList && goodsList.length) {
      obj.goodsList = goodsList
    }
    list.push(obj)
  }
  let object = {}
  if (list && list.length) {
    object = {
      resCode: "00100000",
      obj: list,
      msg: ""
    }
  } else {
    object = {
      resCode: "00100005",
      obj: "",
      msg: "网络异常,请稍后再试"
    }
  }
  return object
}

// mock拦截
Mock.mock('/mock/home/banners', "POST", banners) // 轮播图
Mock.mock('/mock/home/iconList', "POST", iconList) // icon列表

// 分类
Mock.mock('/mock/items/menus', "POST", categories) // 菜单列表
Mock.mock('/mock/items/goodsList', "POST", goodListByCategory) // 商品列表

// 购物车
Mock.mock('/mock/cart/list', "POST", carts) // 查询购物车信息

// 订单
Mock.mock('/mock/order/queryOrdersByStatus', 'POST', orderList)
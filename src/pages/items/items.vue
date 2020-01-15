<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <div class="input" @click.stop="toSearch">搜索热门商品</div>
    </div>
    <!-- 左侧栏目 -->
    <scroll-view scroll-y class="classify" style="height: 100vh;" v-if="classifyList && classifyList.length">
      <ul class="classify-list">
        <li v-for="(item, index) in classifyList" class="hair" :class="{ active: categorySid == item.categorySid }" :key="index" @click="classifyHandle(item.categorySid)">{{ item.categoryName }}</li>
      </ul>
    </scroll-view>
    <!-- 右侧栏目 -->
    <scroll-view scroll-y class="classify-content" style="height: 100vh;" v-if="detailGoods && detailGoods.length">
      <ul class="content-list">
        <li class="li-item" v-for="(item, index) in detailGoods" :key="index">
          <div class="li-head" :class="{ hot: item.showModel == '1' }">{{ item.categoryName }}</div>
          <div class="classify-wrap">
            <ul>
              <li class="goods-box" v-for="(child, childIndex) in item.categorys" :key="childIndex" @click="goSearchList(child)">
                <div class="lazy-box">
                  <img class="goods-img" :src="child.categoryPicture" alt="" lazy-load>
                  <div class="sale-hot" v-if="child.categoryHot == '1'">HOT</div>
                </div>
                <div class="lazy-name" :class="{ hot: child.categoryHot == '1' }">{{ child.categoryName }}</div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </scroll-view>
  </div>
</template>

<script>
import api from '../../api/api'
import utils from '../../utils'

  export default {
    name: 'items',
    data() {
      return {
        classifyList: "",
        detailGoods: "",
        categorySid: ""
      }
    },
    onShow() {
      this.queryMenus()
    },
    methods: {
      // 查询分类菜单列表
      queryMenus () {
        let params = {}
        api.queryItemMenus(params).then(res => {
          console.log("查询分类菜单列表结果：", res)
          if (res.obj) {
            this.classifyList = res.obj
            this.categorySid = this.classifyList[0].categorySid
            this.getGoods(this.categorySid)
          }
        })
      },
      // 根据编号获取商品列表
      getGoods(val) {
        this.detailGoods = []
        api.queryGoodsListByCategoryId({
          channelSid: this.$CHANNEL_ID,
          parentId: val
        }).then(data => {
          if (data.obj) {
            this.detailGoods = data.obj
          } else {
            utils.wxToast({
              message: data.msg,
              position: "bottom"
            })
          }
        })
      },
      classifyHandle(categoryId) {
        console.log("分类跳转编号：", categoryId)
        this.categorySid = categoryId
        this.getGoods(this.categorySid)
      },
      goSearchList(item) {
        console.log("去搜索列表", item)
        if (item) {
          utils.navigateTo("/pages/items/category")
        }
      },
    },
  }
</script>

<style lang="scss" src="./css/items.scss" scoped></style>
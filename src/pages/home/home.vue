<template>
  <div class="home">
    <!-- 搜索 -->
    <div class="search">
      <div class="input" @click.stop="toSearch">搜索热门商品</div>
    </div>
    <!-- 轮播 -->
    <swiper :autoplay="bannerList && bannerList.length" :indicator-dots="true" :circular="true" indicator-color="#999" class="swiper" style="height: 500rpx" interval="2000">
      <block v-if="bannerList && bannerList.length" v-for="(item, index) in bannerList" :key="index">
        <swiper-item v-if="item.imgUrl">
          <image :src="item.imgUrl" class="slide-image" mode="widthFix" />
        </swiper-item>
      </block>
    </swiper>
    <!-- icon List -->
    <div class="iconList">
      <div class="iterm" v-for="(item, i) in iconList" :key="i">
        <img :src="item.imgUrl" v-if="item.imgUrl">
        <div class="content" v-text="item.content" v-if="item.content"></div>
      </div>
    </div>

  </div>
</template>

<script>
import api from '../../api/api'
import utils from '../../utils'
  export default {
    name: 'home',
    data() {
      return {
        bannerList: "",
        iconList: ""
      }
    },
    props: {},
    onShow() {
      this.queryBannerList()
      this.queryIconList()
    },
    methods: {
      // 查询首页轮播图
      queryBannerList() {
        let params = {
          aa: '1'
        }
        this.bannerList = []
        api.queryBanners(params).then(res => {
          console.log("查询首页轮播结果：", res)
          if (res && res.resCode == '00100000') {
            this.bannerList = res.obj.bannerList
          }
        })
      },
      // 查询首页icon列表
      queryIconList() {
        let params = {
          bb: '11111'
        }
        this.iconList = []
        api.queryIcons(params).then(res => {
          console.log("查询首页icon列表结果：", res)
          if (res && res.resCode == '00100000') {
            this.iconList = res.obj.iconList
          }
        })
      },
      toSearch() {
        console.log("分类")
        utils.navigateTo("/pages/items/items")
      }
    },
    components: {
    }
  }
</script>

<style lang="scss" src="./css/home.scss" scoped></style>

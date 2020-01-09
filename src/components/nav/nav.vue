<template>
  <div>
    <ul class="nav">
      <div class="animate" :animation="animationData">
        <li class="inav" v-if="isNav" v-for="(item, index) in navList" :key="index" @click="navTo(item)"><span>{{ item.name }}</span></li>
      </div>
      <li class="up" :class="{'down': isNav}" @click="navTop()"><span v-if="isNav">收起</span><span v-else>快速<br/>导航</span></li>
    </ul>
  </div>
</template>
<script>
/*
 * 快速导航
 */
import utils from '../../utils'
export default {
  name: 'nav',
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      isNav: false,
      animation: null,
      animationData: '',
      navList: [
        {name: '首页', key: 'home'},
        {name: '购物车', key: 'cart'},
        {name: '搜索', key: 'search'},
        {name: '我的', key: 'mine'},
        {name: '置顶', key: 'top'}
      ]
    }
  },
  methods: {
    navTo(item) {
      utils.Loading()
      if (item && item.key) {
        switch (item.key) {
          case 'home':
            utils.navigateTo('/pages/home/home')
          break
          case 'cart':
            utils.navigateTo('/pages/cart/cart')
          break
          case 'search':
            utils.navigateTo('/packageB/search/search')
          break;
          case 'mine':
            utils.navigateTo('/pages/usercenter/usercenter')
          break;
          case 'top':
            this.type && this.type == "goodsDetail" ? this.$emit("pageScrollTo") : wx.pageScrollTo({scrollTop: 0, duration: 300})
          break;
        }
      }
    },
    navTop() {
      this.isNav ? this.isNav = false : this.isNav = true
      let animation = wx.createAnimation({
        duration: 100,
        timingFunction: "ease",
        delay: 0
      })
      this.animation = animation
      if (this.isNav) {
        animation.translateY(0).step()
        this.animationData = animation.export()
      } else {
        animation.translateY(55).step()
        this.animationData = animation.export()
      }
    }
  },
  onHide() {
    this.isNav = false
    utils.hideLoading()
  },
  onUnLoad() {
    this.isNav = false
    utils.hideLoading()
  }
}
</script>
<style lang="scss" src="./css/nav.scss" scoped></style>

<template>
  <div>
    <ul class="nav">
      <div class="animate" :animation="animationData">
        <li class="inav" v-if="isNav" v-for="(item, index) in navList" :key="index" @click="navTo(index)"><span>{{ item.name }}</span></li>
      </div>
      <li class="up" :class="{'down': isNav}" @click="navTop()"><span v-if="isNav">收起</span><span v-else>快速<br/>导航</span></li>
    </ul>
  </div>
</template>
<script>
/*
 * 快速导航
 */
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
        {name: '首页', url: 'home'},
        {name: '购物车', url: ''},
        {name: '搜索', url: ''},
        {name: '我的', url: ''},
        {name: '置顶'}
      ]
    }
  },
  methods: {
    navTo(index) {
      switch (index) {
        case 0:
          this.$router.push({path: '/pages/home/home', isTab: true})
        break;
        case 1:
          this.$router.push({path: '/pages/shopcart/index', isTab: true})
        break;
        case 2:
          this.$router.push('/pages/search/search')
        break;
        case 3:
          this.$router.push({path: '/pages/usercenter/usercenter', isTab: true})
        break;
        case 4:
          this.type && this.type == "goodsDetail" ? this.$emit("pageScrollTo") : wx.pageScrollTo({scrollTop: 0, duration: 300})
        break;
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
}
</script>
<style lang="scss" src="./css/nav.scss" scoped></style>

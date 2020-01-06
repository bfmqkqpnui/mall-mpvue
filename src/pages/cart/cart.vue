<template>
<div class="cart">
  <!-- 加载页面结束 -->
  <div class="page">
    <template v-if="carts && carts.length">
      <div class='top-ql'>
        <div v-if="!upstatus" bindtap="updata" class='top-ql-1' style='color:#333;'>编辑商品</div>
        <div v-else @click.stop="ok" class='top-ql-1' style='color:#f60;'>完成</div>
        <div v-if="upstatus" bindtap="delall" class='top-ql-1 iconfont icon-icon-test' style='color:#f60;'>快速清理</div>
      </div>
      <div class="shop df" v-for="(item, key) in carts" :key="key">
        <image class="sh_slt" :src="item.imgurl"></image>
        <div class="df_1">            
          <div class="sp_text">
            <div @click.stop="toGoods(item)">
                <div class="sp_tit ovh1">{{item.ProductName}}</div>
            </div>
            <div class="sp_neb">数量：×{{item.BuyCount}}</div>
            <div class="sp_jg">¥：{{item.Price}}</div>
            <button class="dle" @click.stop="removeShopCard(item)">删除</button> 
            <div class="dle" @click.stop="toSubmit(item)">下单</div>
          </div>
        </div>
      </div>
    </template>
    <!--样式--> 
    <div class="container carts-list" v-else>
      <div class="pp">
        <img class="kong" src="./css/i/empty-cart.png" mode="aspectFill"/>
        <div class="cla">购物车空空如也</div>
        <div class="cla go" @click.stop='go_index'>去逛逛</div>
      </div>
    </div>
    <div class="container carts-list">
    <!--勾-->
    <div v-for="(item, key) in carts"  :key="key" class="carts-item">
      <icon v-if="item.selected" type="success_circle" size="20"  @click.stop="bindCheckbox" />
      <icon v-else type="circle" size="20" @click.stop="bindCheckbox"/>
      <!--img-->
      <navigator style='align-content:center;' @click.stop="toGoods(item)">
        <div >
          <image class="carts-image" :src="item.imgurl" mode="aspectFill"/>
        </div> 
      </navigator>
      <div class="carts-text">
        <div style='width:100%;height:120rpx;overflow: hidden;' @click.stop="toGoods(item)">
          <span class="carts-title">{{item.pro_name}}</span>
          <span class="carts-title" style='font-size:28rpx;color:#CCCCCC;margin:0;' v-if="item.size">[{{item.size}}]</span>
        </div>
      <div class="title">
        <span class="carts-price">¥ {{item.price}}</span> 
        <div class="stepper">
          <!-- 减号 -->
          <div class="calcMark" @click.stop="calcTotal('minus')">
            <img src="./css/i/minus-new.png" alt="">
          </div>
          <!-- 数值 -->
          <input type="number" @blur="bindManual" :value="item.num" class='cart_number'/>
          <!-- 加号 -->
          <div class="calcMark" @click.stop="calcTotal('add')">
            <img src="./css/i/add-new.png" alt="">
          </div>
        </div> 
      </div>
      </div>
    </div>
    <!--右边-->
    </div>
    <!--底部-->
    <div class="carts-footer" v-if="carts.length >= 1">
      <div bindtap="bindSelectAll" class='heji'>
        <icon v-if="selectedAllStatus" type="success_circle" size="24" />
        <icon v-else type="circle" size="24" />
        <span>全选</span>
        <span v-if="!upstatus" class="reds">{{total}}</span>
      </div>
      <div v-if="upstatus" class="bottom_1">
        <div class="button_1_1" bindtap='shouc'>移至收藏</div>
        <div class="button_1_2" style='background:#f60;border:1px solid #f60;' bindtap='delarr'>删除</div>     
      </div>
      <div v-else class="button" style='background:#f60;' bindtap='bindCheckout'>立即结算 </div>
    </div>
  </div>
</div>
</template>

<script>
import utils from '../../utils'
import api from '../../api/api'

  export default {
    name: 'cart',
    data() {
      return {
        carts: '',
        upstatus: false,
        pageNum: 1,
        minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
        selectedAllStatus: false,
        total: '￥0.00'
      }
    },
    onShow() {
      console.log("查询购物车信息")
    },
    methods: {
      // 查询购物车信息
      queryCarts() {
        console.log("查询购物车信息")
        let params = {}
        api.queryCartInfo(params).then(res => {
          console.log("查询购物车结果：", res)
        })
      },
      // 去首页
      go_index() {
        utils.navigateTo("/pages/home/home")
      },
      // 去详情页
      toGoods(item) {
        if (item) {
          console.log("购物车去详情页：", item)
        }
      },
      // 去结算页
      toSubmit(item) {
        if (item) {
          console.log("购物车去结算页：", item)
        }
      },
      // 删除
      removeShopCard(item) {
        if (item) {
          console.log("购物车删除：", item)
        }
      },
      // 复选框
      bindCheckbox(item) {
        console.log("购物车复选框")
      },
      // 购物车输入框
      bindManual(item) {
        if (item) {
          console.log("购物车输入框", item)
        }
      },
      // 购物车加减计算
      calcTotal(type) {
        if (type && type == 'add') {
          // 计算加
        } else {
          // 计算减
        }
      }
    },
  }
</script>

<style lang="scss" src="./css/cart.scss" scoped></style>
<template>
  <div class="orderbody">
    <div class="menulist">
      <div class="menu" :class="{active: item.tabValue == currentTab}" v-for="(item, i) in menuList" :key="i" v-text="item.tabName" @click.stop="chooseTab(item)"></div>
    </div>
    <div class="orderlist" v-if="orderList && orderList.length">
      <div class="order" v-for="(order, i) in orderList" :key="i">
        <!-- 订单顶部 -->
        <div class="top">
          <div class="ordernum"><span>订单编号:</span>{{order.orderId}}</div>
          <div class="orderstatus">{{order.orderStatus == '1001' ? '待付款' : order.orderStatus == '1002' ? '待发货' : order.orderStatus == '1003' ? '待收货' : order.orderStatus == '1004' ? '待评价' : order.orderStatus == '1005' ? '已完成' : '未知'}}</div>
        </div>
        <!-- 订单顶部 -->
        <div class="middle" v-for="(good, index) in order.goodsList" :key="index">
          <div class="img-box" v-if="good.goodsImg"><img :src="good.goodsImg" alt=""></div>
          <div class="name">
            <div class="content" v-text="good.goodsSaleName" v-if="good.goodsSaleName"></div>
            <div class="title" v-if="good.goodsPromitions && good.goodsPromitions.length">
              <div v-for="(pro, idx) in good.goodsPromitions" :key="idx" v-text="pro.promitionName"></div>
            </div>
          </div>
          <div class="num">
            <div class="price">￥{{good.goodsPrice}}</div>
            <div class="count">x{{good.buyNumber}}</div>
          </div>
        </div>
        <!-- 订单底部 -->
        <div class="bottom">
          <div class="count">
            <span>共</span>{{order.totalCount}}<span>件商品</span>
            <span>合计:</span><span class="price">￥{{order.totalAmount}}</span>
          </div>
          <div class="btns">
            <div class="btn" v-if="order.orderStatus == '1003' || order.orderStatus == '1004' || order.orderStatus == '1005'">查看物流</div>
            <div class="btn rbtn" v-if="order.orderStatus == '1003'">确认收货</div>
            <div class="btn rbtn" v-if="order.orderStatus == '1004'">追加评论</div>
            <div class="btn rbtn" v-if="order.orderStatus == '1005'">再次购买</div>
            <div class="btn rbtn" v-if="order.orderStatus == '1001'">立即支付</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/api'
import utils from '../../utils'
  export default {
    name: 'orderlist',
    data() {
      return {
        menuList: [
          {
            index: 1,
            tabName: '全部',
            tabValue: 'all'
          },
          {
            index: 2,
            tabName: '待付款',
            tabValue: 'payment'
          },
          {
            index: 3,
            tabName: '待发货',
            tabValue: 'delive'
          },
          {
            index: 4,
            tabName: '待收货',
            tabValue: 'receive'
          },
          {
            index: 5,
            tabName: '待评价',
            tabValue: 'evaluate'
          }
        ],
        currentTab: 'all',
        orderList: ""
      }
    },
    onShow() {
      this.queryOrders()
    },
    methods: {
      queryOrderListByStatus() {
        console.log("查询订单列表")
      },
      // 选择订单tab
      chooseTab(item) {
        if (item) {
          if (item.tabValue != this.currentTab) {
            this.currentTab = item.tabValue
          }
        }
      },
      queryOrders() {
        console.log("查询所有订单")
        let params = {}
        api.queryOrderList(params).then(res => {
          console.log("查询订单列表结果：", res)
          if (res.obj) {
            this.orderList = res.obj
          }
        })
      }
    },
  }
</script>

<style lang="scss" src="./css/orderlist.scss" scoped></style>
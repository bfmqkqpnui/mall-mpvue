<template>
  <div class="userCenterBox">
    <div class="headBox">
      <div class="headPic"><img :src="wxAvatarUrl"></div>
      <div class="headText" v-if="loginFlag">{{wxNickName || mobile}}</div>
      <div class="headText" v-else @click="toLogin()">登录/注册</div>
    </div>
    <div class="quickBox" v-if="1 != 1">
      <div class="collectBox" @click="toWebView(1)">
        <em><img src="../../../static/assets/mine/mc-myCollect.png"></em>
        <p>我的收藏</p>
        <span v-if="goodsFavCount == 0">您还没有收藏</span>
        <span v-else>已收藏<span>{{goodsFavCount}}</span>个商品</span>
      </div>
      <div class="paymentCodeBox" @click="toWebView(18)">
        <em><img src="../../../static/assets/mine/mc-userCard.png"></em>
        <p>会员卡/付款码</p>
      </div>
    </div>

    <div class="entryBox myWalletBox" v-if="1 != 1">
      <div class="itemBox" @click="toWebView(2)">
        <div class="itemPoint">0</div>
        <div class="itemText">积分</div>
        <div class="itemTip">有积分将到期</div>
      </div>

      <div class="itemBox" @click='toWebView(3)'>
        <div class="itemPoint">0</div>
        <div class="itemText">优惠券</div>
        <div class="itemTip"><span>2</span>张将到期</div>
      </div>
      <div class="itemBox" @click="toWebView(4)">
        <div class="itemPoint">10000</div>
        <div class="itemText">电子卡</div>
      </div>
      <div class="itemBox" @click="toWebView(5)">
        <div class="itemPoint">0</div>
        <div class="itemText">余额</div>
      </div>

      <div class="itemBox bgLine" @click="toWebView(6)">
        <div class="itemPic">
          <img src="../../../static/assets/mine/mc-myWallet.png">
        </div>
        <div class="itemText">我的钱包</div>
      </div>
    </div>

    <div class="entryBox myOrderBox">
      <div class="itemBox" @click="toWebView(7)">
        <div class="itemPic">
          <div class="itemNum" v-if="logined && waitPayNum > 0">{{waitPayNum}}</div>
          <img src="../../../static/assets/mine/mc-toPayment.png">
        </div>
        <div class="itemText">待付款</div>
      </div>
      <div class="itemBox" @click="toWebView(8)">
        <div class="itemPic">
          <div class="itemNum" v-if="logined && waitReceiveNum>0">{{waitReceiveNum}}</div>
          <img src="../../../static/assets/mine/mc-toReceiving.png">
        </div>
        <div class="itemText">待收货</div>
      </div>
      <div class="itemBox" @click="toWebView(9)">
        <div class="itemPic">
          <div class="itemNum" v-if="logined && waitToCommentNum>0">{{waitToCommentNum>99?'99':waitToCommentNum}}{{waitToCommentNum>99?'+':''}}</div>
          <img src="../../../static/assets/mine/mc-toEvaluate.png">
        </div>
        <div class="itemText">待评价</div>
      </div>
      <div class="itemBox" @click="toWebView(13)">
        <div class="itemPic">
          <img src="../../../static/assets/mine/mc-sales.png">
        </div>
        <div class="itemText">售后</div>
      </div>
      <div class="itemBox bgLine" @click="toWebView(10)">
        <div class="itemPic">
          <img src="../../../static/assets/mine/mc-myOrder.png">
        </div>
        <div class="itemText">我的订单</div>
      </div>
    </div>

    <div class="entryList">
      <ul>
        <li @click="toWebView(15)">
          <img class="tagImg" src="../../../static/assets/mine/wodeqianbao.png">
          <p>我的钱包</p>
          <img class="arrImg" src="../../../static/assets/mine/mc-arr.png">
        </li>
        <li @click="toWebView(15)">
          <img class="tagImg" src="../../../static/assets/mine/wodeyouhuiquan.png">
          <p>我的优惠券</p>
          <img class="arrImg" src="../../../static/assets/mine/mc-arr.png">
        </li>
        <li @click="toWebView(15)">
          <img class="tagImg" src="../../../static/assets/mine/choujiang.png">
          <p>我的抽奖</p>
          <img class="arrImg" src="../../../static/assets/mine/mc-arr.png">
        </li>
        <li @click="toWebView(15)">
          <img class="tagImg" src="../../../static/assets/mine/wodejifen.png">
          <p>我的积分</p>
          <img class="arrImg" src="../../../static/assets/mine/mc-arr.png">
        </li>
        <li @click="toWebView(15)">
          <img class="tagImg" src="../../../static/assets/mine/support.png">
          <p>我的收藏</p>
          <img class="arrImg" src="../../../static/assets/mine/mc-arr.png">
        </li>
        <li @click="toWebView(15)">
          <img class="tagImg" src="../../../static/assets/mine/mc-address.png">
          <p>地址管理</p>
          <img class="arrImg" src="../../../static/assets/mine/mc-arr.png">
        </li>
        <li @click="toWebView(16)">
          <img class="tagImg" src="../../../static/assets/mine/mc-paymentCode.png">
          <p>支付密码</p>
          <span v-if="payStatus == 0">已设置</span>
          <span v-else>未设置</span>
          <img class="arrImg" src="../../../static/assets/mine/mc-arr.png">
        </li>
        <li @click="toWebView(12)">
          <img class="tagImg" src="../../../static/assets/mine/mc-service.png">
          <p>联系客服</p>
          <span>400-888-8888</span>
          <img class="arrImg" src="../../../static/assets/mine/mc-arr.png">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'usercenter',
    data() {
      return {
        // 微信小程序接口返回的头像地址
        wxAvatarUrl: '',
        // 微信小程序接口返回的昵称
        wxNickName: '',
        // 是否登录标识
        loginFlag: false,
      }
    },
    onShow() {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#d4237a'
      })
      this.getWxUserInfo()
    },
    methods: {
      getWxUserInfo () {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              withCredentials: true,
              success: (res) => {
                this.wxAvatarUrl = res.userInfo.avatarUrl
                this.wxNickName = res.userInfo.nickName
                this.loginFlag = true
              },
              fail: (res) => {
                console.log(6666666666)
                console.log(res)
              }
            })
          }
        })
      },
      },
  }
</script>

<style lang="scss" src="./css/usercenter.scss" scoped></style>

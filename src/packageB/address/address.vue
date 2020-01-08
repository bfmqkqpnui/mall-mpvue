<template>
  <div class="root-container">
    <div class="address-error-container" v-if="addressIllegal || nameInIllegal">
      <img src="./css/i/icon-warn-hint.png">
      收件人、收货地址不可含特殊字符，请修改！
    </div>
    <div class="edit-container">
      <div class="item">
        <div class="left-text">收件人</div>
        <input placeholder="收货人姓名不超过10个字" class="right-input" placeholder-style="color:#999999;" v-model="name" maxlength="10" :class="nameInIllegal ? 'error-warn-color' : ''">
      </div>
      <div class="greyLine"></div>
      <div class="item">
        <div class="left-text">手机号</div>
        <input placeholder="收件人手机号" class="right-input" placeholder-style="color:#999999;" v-model="tel" type="number">
      </div>
      <div class="greyLine"></div>

      <div class="item">
        <div class="left-text">所在地区</div>
        <div class="right-input">
          <picker mode="region" @change="bindRegionChange">
            <input placeholder="请选择省市" placeholder-style="color:#999999;" v-model="area" disabled>
          </picker>
        </div>
        <img class="arrow-back" src="./css/i/arrow.png" />
      </div>
      <div class="greyLine"></div>
      <div class="item">
        <div class="left-text">详细地址</div>
        <input placeholder="街道、楼牌号等" class="right-input" placeholder-style="color:#999999;" v-model="cityAddress" :class="addressIllegal ? 'error-warn-color' : ''">
      </div>
      <div class="greyLine"></div>
      <div class="item">
        <div class="left-text flex-1">设为默认地址</div>
        <switch :checked="isDefault" @change="switch1Change"></switch>
      </div>
    </div>
    <div class="hint" v-if="hintMsg">{{hintMsg}}</div>
    <button class="save grey-button" :disabled="!isCanSave" @click="save">
      {{type ? '保存并使用' : '保存'}}
    </button>
  </div>
</template>

<script>
  export default {
    name: 'address',
    data() {
      return {
        name: "",
        isCanSave: false,
        cityAddress: "",
        addressInfo: "",
        area: "",
        addr: "",
        type: "",
        hintMsg: "如您下单的详细地址与您所选省份不符，订单将会做取消处理，烦请确认地址是否一致，感谢您的配合。"
      }
    },
    onLoad() {},
    onShow() {
      this.type = this.$mp.query.type || ''
    },
    methods: {
      // 设置默认收货地址
      switch1Change(e) {
        this.isDefault = !this.isDefault
      },
      // 地址选择
      bindRegionChange(e) {
        this.area = e.target.value[0] + " " + e.target.value[1] + " " + e.target.value[2];
        this.addressInfo = e;
        this.addr = e.target.value[0] + e.target.value[1] + e.target.value[2];

        let params = {
          province: e.mp.detail.value[0],
          city: e.mp.detail.value[1],
          area: e.mp.detail.value[2]
        }
        console.log("请求入参：", params);
      },
      save() {
        console.log("收货地址保存")
      }
    },
  }
</script>

<style lang="scss" src="./css/address.scss" scoped></style>
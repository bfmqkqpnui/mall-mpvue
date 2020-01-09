<template>
  <div class="address-select-container" v-if="addressList && addressList.length">
    <div class="address-list-container">
      <div v-for="(addressItem, i) in addressList" :key="i" class="container-inner">
        <div class="address-item">
          <div class="address-item-phone-name">
            <div class="name-info" @click="selectedAddress(i,addressItem)">
              <div>
                <!-- <input type="radio" name="" :checked="currentSelected && (currentSelected.addressId == addressItem.addressId)"> -->
                <radio color="#ff7f7f" :checked="currentSelected && (currentSelected.addressId == addressItem.addressId)"></radio>
              </div>
              <div>{{addressItem.receiverName}} {{addressItem.receiverMphone}}</div>
              <div class="default-tag" v-if="addressItem.defaultFlag == '0'">[默认]</div>
            </div>
            <img class="edit-img" src="./css/i/edit-icon.png" @click="editAddress(i,addressItem)">
          </div>
          <div class="address-name" @click="selectedAddress(i,addressItem)">{{addressItem.addressDes}}</div>
        </div>
        <div class="greyLine"></div>
      </div>
    </div>
    <div class="confirm" @click="addAddress">+新建地址</div>
    <mp_nav></mp_nav>
  </div>
</template>

<script>
import api from '../../api/api'
import utils from '../../utils'
import nav from '../../components/nav/nav'
  export default {
    name: 'addresslist',
    data() {
      return {
        currentSelected: "",
        addressList: ""
      }
    },
    onLoad(options) {
      Object.assign(this.$data, this.$options.data())
    },
    onShow() {
      this.queryAllAddress()
    },
    onHide() {
      utils.hideLoading()
    },
    onUnLoad() {
      utils.hideLoading()
    },
    methods: {
      // 查询用户所有收货地址
      queryAllAddress() {
        let params = {}
        this.addressList = []
        api.queryAddressList(params).then(res => {
          console.log("查询用户所有收货地址结果：", res)
          if (res && res.obj) {
            this.addressList = res.obj
          }
        })
      },
      selectedAddress(index, addressItem) {
        this.currentSelected = addressItem
      },
      editAddress(i, addressItem) {
        utils.Loading()
        utils.navigateTo("/packageB/address/address")
      }
    },
    components: {
      'mp_nav': nav
    }
  }
</script>

<style lang="scss" src="./css/addresslist.scss" scoped></style>
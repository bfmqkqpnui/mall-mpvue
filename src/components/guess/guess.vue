<template>
    <div class="guess" v-if="goodsList">
        <h1>猜你喜欢<i></i></h1>
        <ul>
            <li v-for="(item, index) in goodsList" :key="index" v-if="item.cellType === 'goods' && item.newGoods">
                <div class="ibox"><span @click="goSimilar(item.newGoods)">看相似</span><image :src="item && item.newGoods ? item.newGoods.url : item.blTag.goodsPic" lazy-load="true" @click="goDetail(item.newGoods)"/></div>
                <h2 v-if="item.newGoods">{{ item.newGoods.goods_sales_name }}</h2>
                <!-- <p><i>¥</i>{{ item.newGoods.sale_price }}</p> -->
                <p v-if="item.newGoods">
                    <i>¥</i>
                    <em>{{ (tagList[item.newGoods.sid] && tagList[item.newGoods.sid].price) ? tagList[item.newGoods.sid].price : item.newGoods.sale_price }}</em>
                    <cite v-if="tagList && tagList[item.newGoods.sid] && tagList[item.newGoods.sid].promotion && tagList[item.newGoods.sid].promotion.length">[{{ tagList[item.newGoods.sid].promotion[0].popDes }}]</cite>
                </p>
            </li>
        </ul>
        <div class="load" v-if="busy">加载中...</div>
        <footer v-else></footer>
    </div>
</template>
<script>
/*
 * 猜你喜欢
 */
import api from '../../api/api'
import utils from '../../utils'
import userInfoUtils from '@/utils/userInfoUtil'
import constant from '@/constant/constant'
import httpUtils from "@/utils/httpUtils"
export default {
    name: 'bl-com-guess',
    props: {
      page: undefined
    },
    data () {
        return {
            busy: true,
            goodsList: [],
            tagList: [],
            apis: "",
            method: "",
            confing: {
                pNum: 1,
                pSize: 8,
                api: 'gyl',
                chan: this.$CHANNEL_ID
            },
            newGoodsList: [],
			memberToken: userInfoUtils.getMemberToken(),
        }
    },
    onLoad() {
        this.loadData()
    },
    onReachBottom() {
        this.loadData()
    },
    methods: {
      getPageRequestData(data) {
        return httpUtils.getRequestDataWithPageInfo(data, this.page)
      },
        loadData() {
            if (this.busy) {
                api.ariesByPage(this.getPageRequestData(this.confing)).then(data => {
                    if (data.resCode == '00100000') {
                        this.confing.pNum++
                        let obj = JSON.parse(data.obj)
                        this.apis = obj.api
                        this.method = obj.method
                        console.log('guess', obj)
                        obj.cells.length > 0 ? this.goodsList = this.goodsList.concat(obj.cells) : this.busy = false
                        // console.log('guess', obj.cells)
                        // let newGoodsList = []
                        for (let item of obj.cells) {
                            let Tagobj = {
                                brandSid: item.newGoods.brand_sid ? item.newGoods.brand_sid : '-1',
                                buid: String(item.newGoods.com_sid),
                                categoryid: item.newGoods.category_id ? item.newGoods.category_id : '-1',
                                goodsDetSid: String(item.newGoods.sid),
                                shopid: '-1',
                                supplySid: item.newGoods.supplier_sid ? item.newGoods.supplier_sid : '-1',
                                goodsType: item.newGoods.goods_type ? item.newGoods.goods_type : '-1',
                                backCatId: item.newGoods.category_id ? item.newGoods.category_id : '-1'
                            }
                            this.newGoodsList.push(Tagobj)
                        }
                        this.goodsTag(this.newGoodsList)
                    }
                })
            }
        },
        goodsTag(newGoodsList) {
            let goodsPrcieRequest = {
                list: newGoodsList,
                sysid: this.$SYS_ID,
                channelid: this.$CHANNEL_ID,
                promotionType: true
            }
            api.goodsPrcie(this.getPageRequestData(goodsPrcieRequest)).then(data => {
                if (data.resCode == '00100000') {
                    let obj = JSON.parse(data.obj)
                    this.tagList = obj
                }
            })
        },
        goDetail(item) {
            // console.log('gueslist', item);
            // 猜你喜欢埋点
            // 搜索全局埋点 resourceId资源位id，resourceType资源位类型，deployId资源位内容,TODO暂时写死2大数据商品埋点
            utils.wholeSensors({'resourceId': String(this.apis), 'resourceType': '2', 'deployId': String(this.method)});
            this.$router.push({path: '/pages/goods/goods', query: {productid: item.sid}})
        },
        goSimilar(item) {
          console.log('=======图片地址=====', item.url);
          let url = constant.getH5Domain() + '/similarIndex?goodsId=' + item.sid + '&pricecnxh=' + item.sale_price + '&imgcnxh=' + item.url + '&goodsNamecnxh=' + encodeURIComponent(item.goods_sales_name);
            utils.toWebView(encodeURIComponent(url))
            // location.href = this.$H5URL + '/similarIndex?goodsId=' + item.sid + '&pricecnxh=' + item.sale_price + '&imgcnxh=' + item.url + '&goodsNamecnxh=' + item.goods_sales_name
        }
    },
}
</script>
<style lang="scss" src="./css/guess.scss" scoped></style>

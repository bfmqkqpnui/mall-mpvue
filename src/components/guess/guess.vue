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
 * @guess component @Ming
 * 猜你喜欢
 */
import api from '@/api/guessApi'
import utils from '@/utils'
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
<style lang="scss" scoped>
.guess{
    background: #fff;
    padding: 0 .2rem 1rem .2rem;
    h1{
        font-size: .34rem;
        color: #333;
        text-align: center;
        height: .9rem;
        line-height: .6rem;
        i{
            display: block;
            margin: 0 auto;
            height: .04rem;
            width: .4rem;
            background: #333;
        }
    }
    ul{
        width: 100%;
        overflow: hidden;
    }
    li{
        width: 50%;
        height: 4.8rem;
        float: left;
        overflow: hidden;
        .ibox{
            text-align: center;
            width: 100%;
            height: 3.2rem;
            position: relative;
            span{
                position: absolute;
                top: 0.1rem;
                right: 0.4rem;
                padding: .02rem 0.04rem;
                border-radius: 0.06rem;
                border: 1px solid #bbb;
                font-size: 0.20rem;
                text-align: center;
                z-index: 1;
                color: #999;
                background: rgba(255, 255, 255, 0.5);
            }
        }
        image{
            width: 3.2rem;
            height: 3.2rem;
        }
        h2{
            padding: .04rem .2rem;
            font-size: .24rem;
            height: .62rem;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        p{
            font-size: .28rem;
            color: #333;
            position: relative;
            padding: 0 0 0 .4rem;
            margin: .1rem 0;
            i{
                display: inline-block;
                font-size: .2rem;
                position: absolute;
                left: .22rem;
                top: 0.025rem;
            }
            em{
                display: inline-block;
                margin: 0 .2rem 0 0;
            }
            cite{
                display: inline-block;
                font-size: .24rem;
                color: #FF4A4A;
            }
        }
    }
    .load{
        text-align: center;
        color: #999;
        font-size: .24rem;
        padding: .2rem 0;
    }
    footer{
        width: 1.3rem;
        height: .4rem;
        background: url(data:image/png;base64,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) no-repeat;
        background-size: cover;
        margin: .4rem auto;
    }
}
</style>



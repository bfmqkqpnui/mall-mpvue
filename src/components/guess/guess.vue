<template>
	<div class="guess" v-if="goodsList && goodsList.length">
		<div class="title" v-if="title">{{title}}</div>
		<div class="item-list">
			<ul>
				<li v-for="(item, i) in goodsList" :key="i">
					<div class="good-img">
						<img :src="item.goodsImg" alt="">
					</div>
					<div class="good-content">
						<div class="good-name" v-text="item.goodsSaleName"></div>
						<div class="good-price">
							<div class="price">￥{{item.goodsPrice}}</div>
							<div class="cart" @click.stop="addCart">
								<img src="./css/i/icon-cart.png" />
							</div>
						</div>
					</div>
				</li>
				<!-- <li>
					<div class="good-img">
						<img src="http://dummyimage.com/375x375/79f2c3.png" alt="">
					</div>
					<div class="good-content">
						<div class="good-name">SkinAT笔记本外壳面保护贴膜 适用于苹果适用于苹果适用SkinAT笔记本外壳面保护贴膜 适用于苹果适用于苹果适用</div>
						<div class="good-price">
							<div class="price">￥2000.00</div>
							<div class="cart" @click.stop="addCart">
								<img src="./css/i/icon-cart.png" />
							</div>
						</div>
					</div>
				</li> -->
			</ul>
		</div>
	</div>
</template>
<script>
/*
 * 猜你喜欢
 */
import api from '../../api/api'
import utils from '../../utils'
export default {
	name: 'guess',
	props: {
		page: undefined,
		title: ''
	},
	data () {
		return {
			busy: true,
			goodsList: [],
			tagList: [],
			newGoodsList: [],
		}
	},
	onLoad() {
		this.queryGoodsList()
	},
	onShow() {},
	methods: {
		// 查询推荐商品列表
		queryGoodsList() {
			let params = {}
			api.queryGuessList(params).then(res => {
				console.log("查询推荐列表结果：", res)
				if (res && res.obj) {
					this.goodsList = res.obj
				}
			})
		},
		addCart(item) {
			console.log("加入购物车")
		}
	},
}
</script>
<style lang="scss" src="./css/guess.scss" scoped></style>

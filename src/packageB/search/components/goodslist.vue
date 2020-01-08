<template>
  <div>
    <!-- 单列 -->
		<div class="single-column">
			<ul>
				<li class="flex" v-for="(item, index) in goods" :key="index" v-show="item && item.length" @click="productDetail(item)">
					<div class="left-cont pr">
						<!-- 图标 热销：bestSeller 新品：newGoods -->
						<div class="common-pic pr left-pic">
							<img class="main-pic" :src="item[0].goodsImgPath" alt="">
							<img v-if="assetsPath && item[0].bestSeller" class="pb icon-label" :src="assetsPath + '/rx.png'" alt="">
							<img v-else-if="assetsPath && item[0].newGoods == '1' && item[0].newGoods !== ''" class="pb icon-label" :src="assetsPath + '/xp.png'" alt="">
							<span class="hots" v-if="item[0].hotSalePicStr">{{item[0].hotSalePicStr}}</span>
						</div>
						<div class="good-msg pb" v-if="item[0].activityType == '18'">
							<span>预售中</span>
						</div>
						<div class="good-msg pb" v-if="item[0].isPriceBack && item[0].isAvailable == '0'">
							<span>无货</span>
						</div>
						<div class="good-msg-browse pb" v-if="item[0].boughtGood && item[0].boughtGood == '2'">
							<span>经常浏览</span>
						</div>
					</div>
					<div class="common-cont right-cont flex-item">
						<div class="common-inner right-inner">
							<p class="tags">
								<span v-if="item[0].goodsType == 8">跨境</span>
								<span v-if="item[0].subYunType == 3">自营百股</span>
								<span v-else-if="item[0].subYunType == 4">自营联华</span>
								<span v-else-if="item[0].subYunType == 1">自营百联</span>
								{{ item[0].goodsMsg }}
							</p>
							<p>
								<!-- 团购标签 => 列表接口 -->
								<span v-for="(item1, idx) in item[0].hotPropValues" :key="idx">{{ item1 }}</span>&nbsp;
							</p>
							<div class="common-labels sale-labels">
								<span v-if="item[0].popDes">{{ item[0].popDes }}</span>
								<span v-else-if="item[0].activityType == '18'">预售中</span>
								<span v-else-if="item[0].actClassify && item[0].actClassify == '4'">爆款</span>
								<span v-else-if="item[0].ptActivityType == '50'">拼团</span>
							</div>
							<div class="common-cart flex price-cart pr">
								<div class="price single-price">￥{{ item[0].marketPrice }}</div>
								<div class="pl-zan flex-m">
									<div class="pl flex-m">
										<img class="common-icon" v-if="assetsPath" :src="assetsPath + '/pl.png'" alt="">
										<span class="common-nums">{{ item[0].totalEvaluate || '0' }}</span>
									</div>
									<div class="zan flex-m">
										<img class="common-icon" v-if="assetsPath" :src="assetsPath + '/zan.png'" alt="">
										<span class="common-nums">{{ item[0].goodRatio * 100 }}%</span>
									</div>
								</div>
								<div class="cart pb" @click.stop.prevent="addCard(item[0])">
									<img class="cart-icon" v-if="assetsPath" :src="assetsPath + '/redcart.png'" alt="">
								</div>
							</div>
						</div>
					</div>
				</li>
				<div class="bottom-footer" v-if="showFoot && goods && goods.length">- 底部喽 -</div>
				<div class="infinite-layer" v-show="loading">
					<button loading="true">加载中...</button>
				</div>
				</ul>
			</div>
			<!-- 暂无结果 -->
			<div class="no-result" v-if="noResult">暂无结果</div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>
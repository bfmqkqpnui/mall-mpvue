<template>
  <div class="searchPage" @touchmove.stop>
		<!-- 输入框 -->
		<div class="searchInput">
      <div class="inputContainer">
        <div class="logo"><img src="./css/i/search.png" /></div>
        <input type="text" v-model="thinkKeyword" confirm-type="search" class="searchKeyWord" id="searchKeyWord" :placeholder="placeholderKey" @input="getKeyup(thinkKeyword)" @confirm="confirm($event)">
      </div>
      <div class="cancelSearch" @click="goSearch">取消</div>
    </div>
    <!-- 最近搜索的标签 -->
    <div class="serachLable">
      <div class="serachLable-tit">
        <h3 class="iconNear"><img src="./css/i/time.png" />&nbsp;最近搜索</h3>
        <div v-if="historySearchArry.length" class="iconDelete" @click="clearSearchHistory()"><img v-if="assetsPath" :src="assetsPath + '/delete.png'"></div>
      </div>
      <div class="labelList">
        <ul id="searchHistory">
          <li  v-for="(item, index) in historySearchArry" :key="index" @click="searchTap(item)">{{ item }}</li>
          <div v-if="!historySearchArry.length" class="noLabel">无搜索历史</div>
        </ul>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="serachLable">
	    <div class="serachLable-tit">
	      <h3 class="iconHot"><img src="./css/i/star.png" />&nbsp;热门搜索</h3>
	    </div>
	    <div class="labelList">
	      <ul id="searchHot">
	        <li v-for="(item, index) in hotSearchArry" :key="index" @click="searchTap(item.keyword)">{{item.keyword}}</li>
	      </ul>
	    </div>
	  </div>
	  <!-- 搜索链接 -->
	  <div class="searchLink" v-if="!!thinkSearchArry.length">
      <ul>
        <li v-for="(item, index) in thinkSearchArry" :key="index" @click="searchTap(item.showKeyWord)">
          <span class="searchName">{{item.showKeyWord}}</span>
          <span class="searchNum">共有{{item.rowCount}}个结果</span>
        </li>
      </ul>
    </div>
	</div>
</template>

<script>
  export default {
    name: 'search',
    data() {
      return {
        hotSearchArry: [],
        historySearchArry: [],
        thinkSearchArry: [],
        thinkKeyword: '',
        placeholderKey: '搜索热门商品'
      }
    },
    onShow() {},
    onHide() {},
    methods: {
      queryHotWord() {
        console.log("查询热门搜索词")
      }
    },
  }
</script>

<style lang="scss" src="./css/search.scss" scoped></style>
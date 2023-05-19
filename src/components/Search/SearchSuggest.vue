<template>
  <div id="searchSuggest">
    <div class="searchSuggest-box">
      <div class="suggest-content" v-show="flags">
        <div class="list" v-for="item in searchSuggestList" :key="item.id" @click="$emit('goto-detail',item?.name)">
          <div class="search-icon"><van-icon name="search" size="18" /></div>
          <div class="suggest-text">{{ item?.name }}</div>
        </div>
      </div>
      
      <!-- 搜索结果组件 -->
      <SearchResult v-show="!flags" :searchResultList="$attrs.searchResultList" :isShowSkeleton="$attrs.isShowSkeleton"></SearchResult>
    </div>
  </div>
</template>

<script>

import SearchResult from '@/components/Search/SearchResult.vue'

export default {

  name:'searchSuggest',

  props:{
    searchSuggestList:{
      type:Array
    },
    flags:{
      type:Boolean
    }
  },

  components:{
    SearchResult
  },


}
</script>

<style lang="scss" scoped>
.searchSuggest-box{
  width: 375px;
  margin: 0 auto;
}
.auto-img{
  width: 100%;
  display: block;
}
.suggest-content{
  width: 375px;
  box-sizing: border-box;
  padding: 0 15px;
  margin-top: 10px;
  .list{
    width: 345px;
    height: 40px;
    display: flex;
    border-bottom: 1px solid lightgray;
    box-sizing: border-box;
    padding-left: 5px;
    .search-icon{
      width: 20px;
      height: 20px;
      margin-top: 10px;
    }
    .suggest-text{
      width: 280px;
      height: 30px;
      margin-left: 10px;
      font-size: 14px;
      font-weight: 500;
      margin-top: 7px;
    }
  }
}

</style>
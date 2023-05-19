<template>
  <div id="search">
    <div class="search-box">
      <div class="header">
        <div class="back" @click="comeBack"><van-icon name="arrow-left" size="20" /></div>
        <div class="search"><van-search v-model.trim="value" placeholder="请输入搜索关键词" autofocus=true @search="addHistorySearch" @keyup="getSearchSuggestData" @clear="clear" /></div>
        <div class="text" @click="addHistorySearch">搜索</div>
      </div>
      <!-- 历史搜索组件 -->
      <SearchList v-show="flag" :hotSearchList="hotSearchList" @goto-detail="clickBtnSearch"></SearchList>

      <!-- 搜索建议组件 -->
      <SearchSuggest v-show="!flag" :searchSuggestList="searchSuggestList" :flags="flags" :searchResultList="searchResultList" :isShowSkeleton="isShowSkeleton" @goto-detail="clickBtnSearch"></SearchSuggest>
    </div>
  </div>
</template>

<script>

import SearchList from '@/components/Search/SearchList.vue'
import SearchSuggest from '@/components/Search/SearchSuggest.vue'

export default {

  name:'Search',

  data(){
    return{
      value:'' || this.$route.query.value,
      hotSearchList:null,
      searchSuggestList:null,
      flag:true,
      flags:true,
      searchResultList:null,
      isShowSkeleton:true
    }
  },

  
  // watch:{
  //  classifyValue:{
  //     handler(){
  //       console.log(1);
  //       classifyValue=this.$route.query.value
  //     }
  //   }
  // },

  components:{
    SearchList,
    SearchSuggest
  },

  created(){
    if(this.value==undefined){
      this.getHotSearchData()
      return
    }else{
      this.clickBtnSearch(this.$route.query.value)
    }
  },

  methods:{
    comeBack(){
      this.$router.go(-1)
    },
    //请求热门搜索数据
    async getHotSearchData(){
      const data=await axios.get('/recipe/search/hot')
      //console.log(data);
      this.hotSearchList=data.data.result.suggests
      //console.log(this.hotSearchList);
    },

    //请求搜索建议数据
    async getSearchSuggestData(){
      this.flag=false
      this.flags=true
      if(this.value==''){
        this.flag=true
        return
      }else{
        const data=await axios.get(`/recipe/search/suggests?kw=${this.value}`)
        //console.log(data);
        this.searchSuggestList=data.data.result.suggests
        //console.log(this.searchSuggestList);
      }
    },

    async addHistorySearch(){
      //console.log(this.value);
      this.isShowSkeleton=true
      this.flags=false
      if(this.value==''){
        return
      }
      this.$store.commit('addHistorySearch',{
        value:this.value
      })
      //搜索结果数据
      const data=await axios.get(`/recipe/search?keyword=${this.value}`)
      //console.log(data);
      this.searchResultList=data.data.result.list
      //console.log(this.searchResultList);
      this.value=''
      this.isShowSkeleton=false
    },

    //点击按钮添加
    async clickBtnSearch(itemData){
      //console.log(itemData);
      this.isShowSkeleton=true
      this.flag=false
      this.flags=false
      this.value=itemData
      this.$store.commit('addHistorySearch',{
        value:this.value
      })
      //搜索结果数据
      const data=await axios.get(`/recipe/search?keyword=${itemData}`)
      //console.log(data);
      this.searchResultList=data.data.result.list
      //console.log(this.searchResultList);
      this.isShowSkeleton=false
    },
    clear(){
      this.flag=true
      this.getHotSearchData()
    }
  }


}
</script>

<style lang="scss" scoped>
.auto-img{
  width: 100%;
  display: block;
}
.search-box{
  width: 375px;
  margin: 0 auto;
}
.header{
  width: 375px;
  height: 54px;
  display: flex;
  box-sizing: border-box;
  padding: 0 15px;
  .back{
    width: 20px;
    height: 20px;
    margin-top: 15px;
  }
  .search{
    width: 300px;
    height: 54px;
    margin-left: 5px;
    .van-search__content--square{
      background-color: #f5f5f5;
    }
  }
  .text{
    width: 40px;
    height: 20px;
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
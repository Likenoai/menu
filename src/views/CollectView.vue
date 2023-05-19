<template>
  <div id="collectView">
    <van-skeleton title :row="27" v-show="isShowSkeleton" />
    <div class="collect-box">
      <div class="header-kong"></div>
      <div class="header">
        <div class="back" @click="$router.push({path:'/'})"><van-icon name="arrow-left" size="20" /></div>
        <div class="title">收藏列表</div>
        <div class="search-icon" @click="$router.push({path:'/search'})"><van-icon name="search" size="18" /></div>
      </div>

      <!-- 收藏列表组件 -->
      <CollectList :collectList="collectList"></CollectList>

      <div class="footer-kong"></div>
    </div>
  </div>
</template>

<script>

import CollectList from '@/components/Collect/CollectList.vue'

export default {

  name:'collectView',

  data(){
    return{
      collectList:null,
      isShowSkeleton:true
    }
  },

  components:{
    CollectList
  },

  created(){
    this.getCollectData()
  },

  methods:{
    //请求收藏列表数据
    async getCollectData(){
      this.isShowSkeleton=true
      const data=await axios.get('/user/ufavorites/16753515/0/20')
      //console.log(data);
      this.collectList=data.data.result.recipes
      //console.log(this.collectList);
      this.isShowSkeleton=false
    },
  }

}
</script>

<style lang="scss" scoped>
.auto-img{
  width: 100%;
  display: block;
}
.classify-box{
  width: 375px;
  margin: 0 auto;
  position: relative;
}
.header-kong{
  width: 375px;
  height: 50px;
}
.header{
  width: 375px;
  box-sizing: border-box;
  height: 50px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid lightgray;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  z-index: 9;
  .back{
    width: 20px;
    height: 20px;
    margin-top: 15px;
  }
  .title{
    height: 30px;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    line-height: 30px;
    margin-top: 10px;
  }
  .search-icon{
    width: 20px;
    height: 20px;
    margin-top: 15px;
  }
}
.footer-kong{
  width: 375px;
  height: 50px;
}

</style>
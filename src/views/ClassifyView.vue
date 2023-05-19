<template>
  <div id="classifyView">
    <van-skeleton title :row="27" v-show="isShowSkeleton" />
    <div class="classify-box">
    <div class="header-kong"></div>
    <div class="header">
      <div class="back" @click="$router.push({path:'/'})"><van-icon name="arrow-left" size="20" /></div>
      <div class="title">菜谱分类</div>
      <div class="search-icon" @click="$router.push({path:'/search'})"><van-icon name="search" size="18" /></div>
    </div>

    <!-- 分类组件 -->
    <Classify :classifyList="classifyList"></Classify>

    <div class="footer-kong"></div>

    </div>
    
  </div>
</template>

<script>

import Classify from '@/components/Classify/Classify.vue'

export default {

name:'classifyView',

components:{
  Classify
},

data(){
  return{
    classifyList:null,
    loading:true,
    isShowSkeleton:true
  }
},

created(){
  this.getClassifyData()
},

mounted() {
    this.loading = false;
  },

methods:{
  //请求菜谱分类数据
  async getClassifyData(){
    this.isShowSkeleton=true
    const data=await axios.get('/recipe/flatcatalogs')
    //console.log(data);
    this.classifyList=data.data.result.cs
    //console.log(this.classifyList);
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
    font-size: 16px;
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
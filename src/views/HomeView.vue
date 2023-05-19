<template>
  <div id="HomeView">
    <div class="home-box">
      <div class="header-kong"></div>
      <div class="header-ding">
        <!-- 头部区域 -->
        <div class="header">
          <div class="ding"><van-icon name="location-o" size="20" /></div>
          <div class="search" @click="goToSearch"><van-search v-model="value" placeholder="请输入搜索关键词" /></div>
          <div class="message"><img class="auto-img" src="../assets/images/message.png"></div>
        </div>
        <!-- 首页导航栏 -->
        <div class="nav">
          <van-tabs v-model="active" title-active-color="#1989fa" sticky offset-top="54px"  animated >
            <van-tab title="推荐"><Recommend :bannerList="bannerList" :contentList="contentList"></Recommend></van-tab>
            <van-tab title="菜谱"><Note :noteList="noteList" :topicsList="topicsList"></Note></van-tab>
            <van-tab title="视频"><Play :playList="playList" :isShowSkeleton="isShowSkeleton"></Play></van-tab>
          </van-tabs>
        </div>
        <div class="xian"></div>
      </div>
    </div>
  </div>
</template>

<script>

import Recommend from '@/components/Home/Recommend.vue'
import Note from '@/components/Home/Note.vue'
import Play from '@/components/Home/Play.vue'


export default {
  name: 'HomeView',

  data(){
    return{
      value:'',
      active: 0,
      bannerList:null,
      contentList:null,
      noteList:null,
      topicsList:null,
      playList:null,
      isShowSkeleton:true
    }
  },
  components: {
    Recommend,
    Note,
    Play
  },

  created(){
    this.getRecommendData()
    this.getNoteData()
    this.getPlayData()
  },

  methods:{
    //请求推荐列表数据
    async getRecommendData(){
      const data=await axios.get('/home/recommended/20/10')
      //console.log(data);
      this.bannerList=data.data.result.banner
      //console.log(this.bannerList);
      this.contentList=data.data.result.list
      //console.log(this.contentList);
    },
    //请求菜谱列表数据
    async getNoteData(){
      const data=await axios.get('/home/notes/0/20')
      //console.log(data);
      this.topicsList=data.data.result.topics[1]
      //console.log(this.topicsList);
      this.noteList=data.data.result.list
      //console.log(this.noteList);
    },
    //请求视频列表数据
    async getPlayData(){
      this.isShowSkeleton=true
      const data=await axios.get('/home/videos/0/20')
      //console.log(data);
      this.playList=data.data.result.list
      //console.log(this.playList);
      this.isShowSkeleton=false
    },
    goToSearch(){
      this.$router.push({path:'/search'})
    }
  }
}
</script>

<style lang="scss" scoped>
.auto-img{
  width: 100%;
  display: block;
}
.home-box{
  width: 375px;
  margin: 0 auto;
}
.header-kong{
  width: 375px;
  height: 54px;
}
.header-ding{
  width: 375px;
  height: 100px;
  position: relative;
  background-color: #ffffff;
  .header{
    width: 375px;
    height: 54px;
    display: flex;
    box-sizing: border-box;
    padding: 0 10px;
    position: fixed;
    top: 0;
    z-index: 9;
    background-color: #ffffff;
    .ding{
      width: 20px;
      height: 20px;
      margin-top: 15px;
    }
    .search{
      width: 320px;
      height: 54px;
      .van-search__content--square{
        background-color: #f5f5f5;
      }
    }
    .message{
      width: 22px;
      height: 22px;
      margin-top: 15px;
    }
  }
  .nav{
    width: 375px;
    height: 40px;
    font-size: 14px;
    ::v-deep .van-tabs__line{
      background-color: #1989fa;
      height: 2px;
    }
    ::v-deep .van-tab--active{
      font-weight: 800;
    }
  }
}

.xian{
  width: 375px;
  height: 1px;
  background-color: lightgray;
  position: fixed;
  top: 99px;
}


  
</style>

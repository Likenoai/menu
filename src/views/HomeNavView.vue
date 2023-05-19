<template>
  <div id="homeNavView">
   <van-skeleton title avatar :row="3" :loading="loading">
    <div class="nav-box">
     <nav class="nav">
      <van-tabbar route>
        <van-tabbar-item replace to="/" icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item replace to="/classify" icon="bars">分类</van-tabbar-item>
        <van-tabbar-item replace to="/collect" icon="star">收藏</van-tabbar-item>
        <van-tabbar-item replace to="/my" icon="manager">我的</van-tabbar-item>
      </van-tabbar>
     </nav>
   </div>
  </van-skeleton>
  </div>
</template>

<script>
export default {

  name:'homeNavView',

  data(){
    return{
       loading:true,
    }
  },

  mounted(){
    this.loading=false
  },

}
</script>

<style lang="scss" scoped>

*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
  color: #333333;
}
.auto-img{
  width: 100%;
  display: block;
}

.nav-box{
  width: 375px;
  margin: 0 auto;
  position: relative;
}

.nav{
  width: 375px;
  height: 55px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 5px 30px 10px 30px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  border-top: 1px solid lightgray;
  z-index: 99;
}

</style>
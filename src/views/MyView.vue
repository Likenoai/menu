<template>
  <div id="myView">
    <div class="myView-box">
      <div class="header">
        <div class="portrait"><img class="auto-img" :src="myList?.user_photo"></div>
        <div class="desc">
          <div class="name">{{ myList?.nick }}</div>
          <div class="personalized">{{ myList?.introduction }}</div>
        </div>
        <div class="edit"><img class="auto-imgs" src="../assets/images/bianji@2x.png"></div>
      </div>

      <div class="my-data">
        <div class="data">
          <!-- <div class="num">{{ myList?.following_count}}</div> -->
          <div class="num">{{ addentionNum }}</div>
          <div class="text">关注</div>
        </div>
        <div class="data">
          <div class="num">{{ myList?.followers_count }}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data">
          <div class="num">{{ myList?.dishes_count }}</div>
          <div class="text">被收藏</div>
        </div>
        <div class="data">
          <div class="num">{{ myList?.recipes_count }}</div>
          <div class="text">被学做</div>
        </div>
        <div class="data">
          <div class="num">{{ myList?.draft_count }}</div>
          <div class="text">经验</div>
        </div>
      </div>

      <div class="content">
        <van-cell title="个人中心" is-link />
        <van-cell title="消息通知" is-link />
        <van-cell title="最近浏览" is-link />
      </div>

      <div class="contents">
        <van-cell title="意见反馈" is-link />
        <van-cell title="推荐给好友" is-link />
        <van-cell title="常见问题" is-link />
        <van-cell title="设置" is-link />
        <van-cell title="退出登录" is-link @click="loginOut" />
      </div>
      

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'


export default {

  name:'myView',

  data(){
    return{
      myList:null,
    }
  },

  created(){
    this.getMyListData()
  },

  computed:{
    ...mapState(['addentionNum'])
  },

  methods:{
    //请求我的列表数据
    async getMyListData(){
      const data=await axios.get('/user/info/16753515')
      //console.log(data);
      this.myList=data.data.result.user
      //console.log(this.myList);
    },
    loginOut(){
      //console.log(this.$route.fullPath);
      this.$router.push({path:'/login',query:{url:this.$route.fullPath}})
    }
  },

}
</script>

<style lang="scss" scoped>
.auto-img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.auto-imgs{
  width: 100%;
  display: block;
}
.myView-box{
  width: 375px;
  margin: 0 auto;
  background-color: #f5f5f5;
}
.header{
  width: 375px;
  height: 140px;
  background-color: #fac300;
  box-sizing: border-box;
  padding: 0 15px;
  display: flex;
  position: relative;
  .portrait{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-top: 30px;
  }
  .desc{
    width: 240px;
    height: 80px;
    margin-left: 10px;
    margin-top: 30px;
    .name{
      width: 220px;
      height: 30px;
      font-size: 20px;
      color: #ffffff;
      line-height: 30px;
    }
    .personalized{
      width: 220px;
      height: 40px;
      margin-top: 5px;
      font-size: 12px;
      color: #f8fbf9;
    }
  }
  .edit{
    width: 17px;
    height: 17px;
    position: absolute;
    top: 36px;
    right: 95px;
  }
}
.my-data{
  width: 375px;
  height: 60px;
  box-sizing: border-box;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  .data{
    width: 40px;
    height: 40px;
    .num{
      width: 40px;
      height: 20px;
      font-size: 13px;
      text-align: center;
      line-height: 20px;
      font-weight: 600;
    }
    .text{
      width: 40px;
      height: 20px;
      font-size: 12px;
      text-align: center;
      line-height: 20px;
    }
  }
}
.content{
  width: 375px;
  margin-top: 10px;
}
.contents{
  width: 375px;
  margin-top: 10px;
}

</style>
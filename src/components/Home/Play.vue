<template>
  <div id="play">

    <van-skeleton title :row="27" v-show="isShowSkeleton" />
    <div class="play-box" v-show="!isShowSkeleton">

    <!-- 内容区域 -->
    <div class="content" v-for="item in playList" :key="item.id" @click="$router.push({path:'/detail',query:{menuId:item?.r?.id} })">
      <div class="header">
        <div class="portrait"><img class="auto-imgs" :src="item?.r?.a?.p || item?.dsp?.user?.user_photo || item?.note?.author?.p"></div>
        <div class="name">{{ item?.r?.a?.n || item?.dsp?.user?.nick || item?.note?.author?.n }}</div>
        <div class="vip">lv.{{ item?.r?.a?.lvl || item?.dsp?.user?.lvl || item?.note?.author?.lvl }}</div>
      </div>
      <div class="img">
        <video v-show="item?.dsp==null" class="auto-img" :src="item?.r?.vu"></video>
        <img v-show="item?.dsp!==null" class="auto-img" :src="item?.dsp?.logo">
        <div class="play-btn" v-show="item?.dsp==null" @click="playVideo"><img class="auto-img" src="../../assets/images/play.png"></div>
      </div>
      <div class="collect">
        <div class="pic" v-for="(value,index) in item?.r?.collect_users?.slice(0,4) || item?.note?.collect_users?.slice(0,4)" :key="index+1"><img class="auto-img" :src="value?.p"></div>
        <!-- <div class="text">{{ item?.r?.fc==null ? item?.note?.like_count : item?.r?.fc==0 ? null:`${item?.r?.fc}收藏` }}</div> -->
        <div class="text">
          <span>{{ item?.r?.fc || item?.note?.like_count }}</span>
          <span>{{ item?.dsp?.like_count==null ? item?.r?.fc==0 ? null :'人收藏' : null }}</span>
        </div>
        <div class="icon"><van-icon name="star-o" size="20"  /></div>
      </div>
      <div class="desc">{{ item?.r?.n || item?.note?.title }}</div>
    </div>

    <div class="kong"></div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'


export default {

  name:'Play',

  props:{
    playList:{
      type:Array
    },
    isShowSkeleton:{
      type:Boolean
    }
  },

  data(){
    return{
      flag:true,
      loading:true,
    }
  },

  mounted() {
    this.loading = false;
  },

  computed:{
    ...mapState(['paused'])
  },

  methods:{
    playVideo(e){
      // console.log(e);
      // console.log(e.path[2].firstChild);
      e.path[2].firstChild.play()
      e.path[2].firstChild.controls=true
      this.$store.commit('playVideo')
      e.target.className='active'
    }
  }


}
</script>

<style lang="scss" scoped>
.active{
  display: none;
}
.auto-img{
  width: 100%;
  display: block;
}
.auto-imgs{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.play-box{
  width: 375px;
  margin-top: 10px;
}
.content{
  width: 375px;
  box-sizing: border-box;
  padding: 0 10px;
  .header{
    width: 355px;
    height: 60px;
    display: flex;
    box-sizing: border-box;
    padding: 10px 0;
    .portrait{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-top: 5px;
    }
    .name{
      height: 30px;
      margin-left: 10px;
      margin-top: 8px;
      font-size: 14px;
      font-weight: 600;
    }
    .vip{
      height: 20px;
      margin-left: 10px;
      margin-top: 11px;
      color: #dabe74;
      font-size: 12px;
    }
  }
  .img{
    width: 355px;
    margin-top: 5px;
    position: relative;
    img{
      border-radius: 13px;
    }
    .play-btn{
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -20px;
      margin-top: -20px;
    }
  }
  .collect{
    width: 355px;
    height: 40px;
    margin-top: 10px;
    display: flex;
    box-sizing: border-box;
    padding: 0 10px 0 15px;
    position: relative;
    .pic{
      width: 20px;
      height: 20px;
      img{
        border-radius: 50%;
        margin-left: -15px;
      }
    }
    .text{
      height: 20px;
      font-weight: 600;
    }
    .icon{
      width: 20px;
      height: 20px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }
}
.kong{
  width: 375px;
  height: 65px;
}

</style>
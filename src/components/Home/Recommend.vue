<template>
  <div id="recommend">
    <div class="box">
      <!-- 轮播图区域 -->
      <div class="lun">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(image, index) in bannerList" :key="index">
            <img class="auto-img" :src="image.i" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 内容区域 -->
      <div class="content" v-for="item in contentList" :key="item.id" @click="$router.push({path:'/detail',query:{menuId:item?.r?.id ,noteId:item?.note?.id} })">
        <div class="header">
          <div class="portrait"><img class="auto-imgs" :src="item?.r?.a?.p || item?.dsp?.user?.user_photo || item?.note?.author?.p"></div>
          <div class="name">{{ item?.r?.a?.n || item?.dsp?.user?.nick || item?.note?.author?.n }}</div>
          <div class="vip">lv.{{ item?.r?.a?.lvl || item?.dsp?.user?.lvl || item?.note?.author?.lvl }}</div>
        </div>
        <div class="img"><img class="auto-img" :src="item?.r?.img || item?.dsp?.logo || item?.note?.image_u"></div>
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
export default {

  name:'recommend',

  props:{
    bannerList:{
      type:Array
    },
    contentList:{
      type:Array
    }
  },

  data(){
    return{
      
    }
  },



}
</script>

<style lang="scss" scoped>
.auto-img{
  width: 100%;
  display: block;
}
.auto-imgs{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.box{
  width: 375px;
  margin-top: 2px;
}
.lun{
  width: 375px;
  height: 120px;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    width: 375px;
    height: 120px;
    text-align: center;
  }
  ::v-deep .van-swipe__indicators{
    bottom: 15px;
  }
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
    img{
      border-radius: 13px;
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
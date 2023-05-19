<template>
  <div id="collectList">
    <div class="collectList-box">
      <div class="content">
        <div class="list" v-for="item in collectList" :key="item.id" @click="$router.push({path:'/detail',query:{menuId:item?.id} })">
          <div class="img">
            <video v-show="item?.vfurl!==''" :src="item?.vfurl"></video>
            <img v-show="item?.vfurl==''"  :src="item?.img">
            <div class="play-btn" v-show="item?.vfurl!==''" @click="playVideo"><img class="auto-imgs" src="../../assets/images/play.png"></div>
          </div>
          <div class="desc"> 
            <div class="title">{{ item?.n }}</div>
            <div class="score">{{ item?.recommend_label }}</div>
            <div class="people">
              <div class="portrait"><img class="auto-img" :src="item?.a?.p"></div>
              <div class="name">{{ item?.a?.n }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name:'CollectList',

  props:{
    collectList:{
      type:Array
    }
  },

  methods:{
    playVideo(e){
      console.log(e);
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
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.auto-imgs{
  width: 100%;
  display: block;
}
.searchResult-box{
  width: 375px;
  margin: 0 auto;
}
.content{
  width: 375px;
  box-sizing: border-box;
  padding: 0 15px;
  margin-top: 20px;
  .list{
    width: 345px;
    height: 130px;
    display: flex;
    margin-bottom: 10px;
    .img{
      width: 180px;
      height: 130px;
      overflow: hidden;
      position: relative;
      img{
        width: 180px;
      }
      .play-btn{
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50px;
        left: 75px;
        img{
          width: 30px;
          height: 30px;
        }
      }
    }
    .desc{
      width: 160px;
      height: 130px;
      margin-left: 10px;
      box-sizing: border-box;
      padding-top: 20px;
      .title{
        width: 160px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;
        overflow:hidden; 
        text-overflow:ellipsis; 
        display:-webkit-box;
        -webkit-box-orient:vertical;  
        -webkit-line-clamp:2;
      }
      .score{
        width: 160px;
        height: 15px;
        font-size: 12px;
        margin-top: 5px;
        line-height: 15px;
      }
      .people{
        width: 160px;
        height: 30px;
        margin-top: 5px;
        display: flex;
        .portrait{
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        .name{
          width: 120px;
          height: 20px;
          font-size: 12px;
          color:#8a8a8a;
          margin-left: 5px;
        }
      }
    }
  }
}

</style>
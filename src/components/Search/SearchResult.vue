<template>
  <div id="searchResult">
    <van-skeleton title :row="27" v-if="isShowSkeleton" />
    <div class="searchResult-box" v-else>
      <div class="titles">为你搜索到以下内容：</div>
      <div class="content">
        <div class="list" v-for="item in searchResultList" :key="item.id" @click="$router.push({path:'/detail',query:{menuId:item?.r?.id} })">
          <div class="img"><img  :src="item?.r?.img"></div>
          <div class="desc"> 
            <div class="title">{{ item?.r?.n }}</div>
            <div class="score" v-if="item?.r?.rate!==0">{{ item?.r?.rate }}分</div>
            <div class="people">
              <div class="portrait"><img class="auto-img" :src="item?.r?.a?.p"></div>
              <div class="name">{{ item?.r?.a?.n }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name:'SearchResult',

  props:{
    searchResultList:{
      type:Array
    },
    isShowSkeleton:{
      type:Boolean
    }
  }

  

}
</script>

<style lang="scss" scoped>
.auto-img{
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.searchResult-box{
  width: 375px;
  margin: 0 auto;
}
.titles{
  width: 375px;
  box-sizing: border-box;
  padding: 0 15px;
  font-size: 13px;
  line-height: 20px;
  margin-top: 10px;
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
      img{
        width: 180px;
      }
    }
    .desc{
      width: 160px;
      height: 100px;
      margin-top: 20px;
      margin-left: 10px;
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
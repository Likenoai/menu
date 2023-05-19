<template>
  <div id="searchList">
    <div class="searchList-box">
      <div class="historySearch" v-show="showHistorySearch">
        <div class="title">
          <div class="text">历史搜索</div>
          <div class="del-icon" @click="deleteHistorySearch"><img class="auto-img" src="../../assets/images/delete.png"></div>
        </div>
        <div class="his-content">
          <van-button round type="info" size="small" v-for="item in historySearchList" :key="item?.id" @click="$emit('goto-detail',item)">{{ item }}</van-button>
        </div>
      </div>
      <div class="hotSearch">
        <div class="hot-title">热门搜索</div>
        <div class="content">
          <van-button round type="info" size="small" v-for="item in hotSearchList" :key="item?.id" @click="$emit('goto-detail',item?.name)">{{ item?.name }}</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {

  name:'SearchList',

  props:{
    hotSearchList:{
      type:Array
    }
  },

  computed:{
    ...mapState(['historySearchList','showHistorySearch'])
  },

  methods:{
    ...mapMutations(['deleteHistorySearch'])
  }



}
</script>

<style lang="scss" scoped>
.auto-img{
  width: 100%;
  display: block;
}
.searchList-box{
  width: 375px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 15px;
}
.historySearch{
  width: 355px;
  .title{
    width: 355px;
    height: 25px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 15px;
    .text{
      width: 150px;
      height: 25px;
      font-size: 14px;
      font-weight: 600;
    }
    .del-icon{
      width: 15px;
      height: 20px;
      margin-top: 3px;
    }
  }
  .his-content{
    width: 345px;
    ::v-deep .van-button--small{
      height: 28px;
      margin-top: 8px;
      margin-left: 5px;
      background-color: #ffffff;
      color: #333333;
      border-color: #bfbfbf;
      font-size: 12px;
    }
  }
}
.hotSearch{
  width: 355px;
  margin-top: 10px;
  .hot-title{
    width: 355px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .content{
    width: 355px;
    ::v-deep .van-button--small{
      height: 28px;
      margin-top: 8px;
      margin-left: 5px;
      background-color: #ffffff;
      color: #333333;
      border-color: #bfbfbf;
      font-size: 12px;
    }
  }
}

</style>
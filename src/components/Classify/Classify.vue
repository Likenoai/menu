<template>
  <div id="classify">
    <div class="classify-box">
      <div class="content">
        <div class="content-nav">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item v-for="item in classifyList" :key="item.id" :title="item?.name" />
          </van-sidebar>
        </div>
        <div class="content-content" v-if="classifyList">
          <div class="desc" v-for="item in classifyList[activeKey]?.cs" :key="item.id">
            <div class="title"><img class="auto-img" :src="item?.image_url"></div>
            <div class="text">
              <div v-for="value in item?.cs" :key="value.id" @click="goToSearch(value?.name)">{{ value?.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name:'Classify',

  props:{
    classifyList:{
      type:Array
    }
  },

  data() {
    return {
      activeKey: 0,
    }
  },

  methods:{
    goToSearch(value){
      //console.log(value);
      // this.$route.meta.callFunction==true
      this.$router.push({path:'/search',query:{value:value}})
    }
  }

  
}
</script>

<style lang="scss" scoped>
.auto-img{
  width: 100%;
  display: flex;
}
.classify-box{
  width: 375px;
  margin: 0 auto;
}
.content{
  width: 375px;
  box-sizing: border-box;
  padding-right: 5px;
  display: flex;
  position: relative;
  ::v-deep .van-sidebar-item{
    padding: 15px 5px 15px 12px;
  }
  ::v-deep .van-sidebar-item__text{
    font-size: 12px;
    font-weight: 600;
  }
  .content-content{
    box-sizing: border-box;
    padding: 0 10px;
    width: 290px;
    height: 550px;
    position: fixed;
    top: 50px;
    right: 5px;
    overflow: auto;
    .title{
      margin-top: 10px;
    }
    .text{
      box-sizing: border-box;
      padding: 10px 0;
      display: flex;
      flex-wrap: wrap;
      div{
        background-color: #f5f5f5;
        margin-top: 10px;
        margin-left: 10px;
        box-sizing: border-box;
        padding: 10px;
      }
    }
  }
}

</style>
<template>
  <div id="NoteDetail">
    <van-skeleton title :row="27" v-if="isShowSkeleton" />
    <div class="noteDetail-box" v-else>
    <div class="header-kong"></div>
    <div class="header">
      <div class="back" @click="comeBack"><van-icon name="arrow-left" size="20" /></div>
      <div class="title"><img :src="noteDetailList?.author?.p"></div>
      <div class="dian" @click="showShare = true">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />
    </div>

    <div class="img">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(image, index) in noteDetailList?.images" :key="index">
          <img class="auto-img" :src="image?.u" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{ noteDetailList?.images.length }}</div>
        </template>
      </van-swipe>
      <!-- <div class="view">{{ noteDetailList?.views_count_text }}人看过</div> -->
    </div>

    <div class="desc">
      <div class="title">
        <span>{{ noteDetailList?.title }}</span>
        <!-- <span>{{ noteDetailList?.title }}</span> -->
      </div>
      <div class="history">
        <div class="content">{{ noteDetailList?.contents[0]?.c }}</div>
        <div class="descs">{{ noteDetailList?.contents[1]?.c }}</div>
      </div>
      <div class="release">{{ noteDetailList?.publishtime }}</div>
    </div>

  
    <div class="footer">
      <div class="input"><input type="text" placeholder="说点什么..."></div>
      <div class="mes"><van-icon name="chat-o" size="18" /><span>101</span></div>
      <div class="shou"><van-icon name="star-o" size="18" /><span> 收藏</span></div>
    </div>

    <div class="footer-kong"></div>

    </div>
    
  </div>
</template>

<script>

import Comment from '@/components/Detail/Comment.vue'

export default {

  name:'NoteDetail',

  props:{
    noteDetailList:{
      type:Object
    },
    isShowSkeleton:{
      type:Boolean
    }
  },

  components:{
    Comment
  },

  data() {
    return {
      current: 0,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
      ],
    }
  },

  methods: {
    onChange(index) {
      this.current = index;
    },
    comeBack(){
      this.$router.go(-1)
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  },

}
</script>

<style lang="scss" scoped>
.noteDetail-box{
  width: 375px;
  margin: 0 auto;
  position: relative;
}
.auto-img{
  width: 100%;
  display: block;
}
.header-kong{
  width: 375px;
  height: 50px;
}
.header{
  width: 375px;
  box-sizing: border-box;
  height: 50px;
  padding: 0 10px 0 15px;
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
    width: 30px;
    border-radius: 50%;
    margin-top: 10px;
    img{
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
  }
  .dian{
    width: 30px;
    height: 20px;
    margin-top: 25px;
    display: flex;
    div{
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #333333;
      margin-left: 3px;
    }
  }
}
.img{
  width: 375px;
  position: relative;
  ::v-deep .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background-color: #a69997;
    color: #ffffff;
  }
  .view{
    font-size: 12px;
    background-color: #a69997;
    color: #ffffff;
    position: absolute;
    bottom: 10px;
    right: 10px;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 5px 5px;
  }
}
.desc{
  width: 375px;
  box-sizing: border-box;
  padding: 0 10px;
  margin-top: 10px;
  .title{
    width: 345px;
    display: flex;
    span{
      font-size: 16px;
      font-weight: 600;
    }
  }
  .history{
    width: 345px;
    margin-top: 10px;
    .content{
      width: 345px;
      font-size: 14px;
      font-weight: 500;
    }
    .descs{
      width: 345px;
      font-size: 14px;
      font-weight: 500;
      color: #50969F;
      margin-top: 10px;
    }
  }
  .release{
    width: 345px;
    height: 20px;
    font-size: 12px;
    color: #898989;
    line-height: 20px;
    margin-top: 10px;
  }
}
.footer{
  width: 375px;
  box-sizing: border-box;
  padding: 0 15px;
  display: flex;
  height: 50px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid lightgray;
  background-color: #ffffff;
  .input{
    width: 150px;
    height: 30px;
    margin-top: 10px;
    input{
      width: 150px;
      height: 30px;
      background-color: #f5f5f5;
      border-radius: 15px;
      border: 0;
      box-sizing: border-box;
      padding-left: 10px;
    }
  }
  .shou{
    width: 50px;
    height: 20px;
    font-size: 12px;
    margin-top: 15px;
    font-weight: 600;
    margin-left: 10px;
  }
  .mes{
    width: 50px;
    height: 20px;
    font-size: 12px;
    margin-top: 15px;
    font-weight: 600;
    margin-left: 10px;
    span{
      margin-left: 5px;
    }
  }
}
.footer-kong{
  width: 375px;
  height: 70px;
}

</style>
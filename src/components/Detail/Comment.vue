<template>
  <div class="comment">
    <div class="comment-box">
      <div class="header">
        <div class="title">热门评论</div>
        <div class="num">{{ commentList?.cc }}条评论</div>
      </div>

      <div class="desc">说点什么,让TA也认识爱做饭的你</div>

      <div class="content" v-for="item in commentList?.comments" :key="item.id">
        <div class="user">
          <div class="user-text">
            <div class="pic"><img class="auto-imgs" :src="item?.u?.p"></div>
            <div class="user-title">
              <div class="text">{{ item?.u?.n }}</div>
              <div class="vip">lv{{ item?.u?.lvl }}</div>
            </div>
          </div>
          <div class="love">
            <div class="zan" >
              <van-icon name="like-o" size="15" />
            </div>
            <div class="number" v-show="item?.like_count!==0">{{ item?.like_count }}</div>
          </div>
        </div>
        <div class="comment-text">{{ item?.content[0]?.c }}</div>
        <div class="reply" v-show="item?.child_comments.length!==0">
          <div class="reply-content" v-for="value in item?.child_comments" :key="value.id">
            <span class="reply-title">{{ value?.reply_user?.n==item?.u?.n ? value?.u?.n : `${value?.u?.n} : 回复 ${value?.reply_user?.n}` }}:</span>
            <span class="reply-text">{{ value?.content[0]?.c }}</span>
          </div>
        </div>
      </div>

      <div class="foot">点击查看全部{{ commentList?.cc }}评论</div>

    </div>
  </div>
</template>

<script>
export default {

  name:'Comment',

  props:{
    commentList:{
      type:Object
    },
  },

  data(){
    return{
      flag:true,
    }
  },

  methods:{
    
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
.comment-box{
  width: 345px;
}
.header{
  width: 345px;
  height: 30px;
  display: flex;
  .title{
    width: 70px;
    height: 30px;
    font-size: 16px;
    font-weight: 600;
  }
  .num{
    height: 30px;
    line-height: 25px;
    font-size: 14px;
    color: #75acb3;
  }
}
.desc{
  width: 345px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 20px;
  text-align: center;
  font-size: 14px;
  color: #a1a1a1;
  box-sizing: border-box;
  padding: 10px 20px;
  margin-top: 10px;
}
.content{
  width: 345px;
  margin-top: 20px;
  margin-bottom: 10px;
  .user{
    width: 335px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    .user-text{
      display: flex;
      .pic{
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .user-title{
        display: flex;
        margin-left: 10px;
        .text{
          font-weight: 600;
          line-height: 30px;
          font-size: 13px;
        }
        .vip{
          line-height: 30px;
          margin-left: 5px;
          color: #fcc21b;
        }
      }
    }
    .love{
      display: flex;
      margin-top: 8px;
      .number{
        margin-left: 2px;
        font-size: 12px;
      }
    }
  }
  .comment-text{
    width: 300px;
    margin-top: 5px;
    margin-left: 40px;
  }
  .reply{
    width: 300px;
    background-color: #f5f5f5;
    margin-left: 40px;
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
    .reply-content{
       width: 280px;
      .reply-title{
        font-size: 12px;
        font-weight: 600;
        line-height: 20px;
      }
      .reply-text{
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }
}
.foot{
  width: 200px;
  height: 40px;
  border-radius: 20px;
  background-color: #f5f5f5;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
  color: #75acb3;
  margin: 0 auto;
}
</style>
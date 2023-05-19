<template>
  <div id="note">
    <div class="note-box">
      <div class="topics">
        <div class="title">热门菜谱</div>
        <div class="topic">
          <van-button round type="info" size="small" v-for="(item,index) in topicsList" :key="index">{{ item?.name }}</van-button>
        </div>
      </div>
      <div class="content">
        <div class="list" v-for="item in noteList" :key="item.id" @click="$router.push({path:'/detail',query:{noteId:item?.note?.id} })">
          <div class="img"><img class="auto-img" :src="item?.activity?.image || item?.note?.image_u"></div>
          <div class="text">{{ item?.activity?.name || item?.note?.title }}</div> 
          <div class="desc">
            <div class="portrait"><img class="auto-img" :src="item?.activity?.author?.p || item?.note?.author?.p"></div>
            <div class="name">{{ item?.activity?.author?.n || item?.note?.author?.n }}</div>
            <div class="icon"><van-icon name="star-o" size="18" /></div>
            <div class="num">{{ item?.note?.like_count }}</div>
          </div>
        </div>
      </div>

      <div class="footer-kong"></div>
    </div>
  </div>
</template>

<script>
export default {

  name:'Note',

  props:{
    noteList:{
      type:Array
    },
    topicsList:{
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
  border-radius: 10px;
}
.auto-imgs{
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.note-box{
  width: 375px;
  margin: 0 auto;
}

.topics{
  width: 355px;
  margin: 0 auto;
  margin-top: 10px;
  .title{
    width: 355px;
    height: 20px;
    margin: 0 auto;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .topic{
    width: 355px;
    display: flex;
    flex-wrap: wrap;
    ::v-deep .van-button--small{
      height: 28px;
      margin-top: 5px;
      margin-left: 5px;
    }
  }
}

// .content{
//   width: 375px;
//   margin: 0 auto;
//   box-sizing: border-box;
//   display: flex;
//   flex-wrap: wrap;
//   .list{
//     width: 175px;
//     margin-left: 8px;
//     margin-top: 20px;
//     box-sizing: border-box;
//     .img{
//       width: 175px;
//     }
//     .text{
//       width: 165px;
//       margin: 0 auto;
//       margin-top: 10px;
//       overflow:hidden; 
//       text-overflow:ellipsis; 
//       display:-webkit-box;
//       -webkit-box-orient:vertical;  
//       -webkit-line-clamp:2;
//       font-size: 14px;
//       font-weight: 400;
//       line-height: 15px;
//     }
//     .desc{
//       width: 165px;
//       margin-top: 10px;
//       margin: 0 auto;
//       display: flex;
//       margin-top: 10px;
//       .portrait{
//         width: 20px;
//         height: 20px;
//         border-radius: 50%;
//       }
//       .name{
//         width: 100px;
//         margin-left: 5px;
//         font-size: 12px;
//         margin-top: 2px;
//         overflow:hidden;
//         text-overflow:ellipsis;
//         white-space:nowrap;
//       }
//       .icon{
//         width: 20px;
//         height: 20px;
//       }
//       .num{
//         font-size: 12px;
//         margin-top:3px;
//       }
//     }
//   }
// }
.content{
  width: 375px;
  box-sizing: border-box;
  padding: 10px 8px 0 0;
  margin-top: 10px;
  column-count: 2;
  column-gap: 0;
  column-fill: balance; 
  .list{
    width: 175px;
    margin-left: 8px;
    box-sizing: border-box;
    break-inside: avoid;
    margin-bottom: 20px;
    .img{
      width: 175px;
    }
    .text{
      width: 165px;
      margin: 0 auto;
      margin-top: 10px;
      overflow:hidden; 
      text-overflow:ellipsis; 
      display:-webkit-box;
      -webkit-box-orient:vertical;  
      -webkit-line-clamp:2;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
    .desc{
      width: 160px;
      margin-top: 10px;
      margin: 0 auto;
      display: flex;
      margin-top: 10px;
      .portrait{
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      .name{
        width: 100px;
        margin-left: 5px;
        font-size: 12px;
        margin-top: 2px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .icon{
        width: 20px;
        height: 20px;
      }
      .num{
        font-size: 12px;
        margin-top:3px;
      }
    }
  }
}

.footer-kong{
  width: 375px;
  height: 65px;
}

</style>
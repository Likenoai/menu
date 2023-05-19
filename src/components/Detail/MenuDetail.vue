<template>
  <div id="MenuDetail">
    <van-skeleton title :row="27" v-show="isShowSkeleton" />
    <div class="menuDetail-box" v-show="!isShowSkeleton">
      <!-- 头部区域 -->
      <div class="header-kong"></div>
      <div class="header">
        <div class="back" @click="comeBack"><van-icon name="arrow-left" size="20" /></div>
        <div class="title"><img :src="menuDetailList?.user?.user_photo"></div>
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
 
      <!-- 头部图片区域 -->
      <div class="img">
        <img class="auto-img" v-show="menuDetailList?.vfurl==''" :src="menuDetailList?.photo_path">
        <video v-show="menuDetailList?.vfurl!==''" :src="menuDetailList?.vfurl" controls="controls" class="video" autoplay></video>
        <div class="view" v-show="menuDetailList?.vfurl==''">{{ menuDetailList?.views_count_text }}人看过</div>
      </div>
      
      <!-- 菜品描述区域 -->
      <div class="desc">
        <div class="title">
          <span>{{ menuDetailList?.user?.nickname }}&nbsp;&nbsp;&nbsp;&nbsp;{{ menuDetailList?.title }}</span>
          <!-- <span>{{ menuDetailList?.title }}</span> -->
        </div>
        <div class="history">
          <span>浏览:{{ menuDetailList?.vc }}</span>
          <span>收藏:{{ menuDetailList?.favo_counts }}</span>
          <span>学做:{{ menuDetailList?.dish_count }}</span>
        </div>
      </div>

      <!-- 用户区域 -->
      <div class="user-text">
        <div class="user">
          <div class="pic"><img :src="menuDetailList?.user?.user_photo"></div>
          <div class="name">
            <span class="n">{{ menuDetailList?.user?.nickname }}</span>
            <span class="vip">lv{{ menuDetailList?.user?.lvl }}</span>
          </div>
          <div class="attentions" @click="addentioned(menuDetailList?.user?.user_id)" v-if="addentionId.indexOf(menuDetailList?.user?.user_id)!==-1">已关注</div>
          <div class="attention" @click="addent(menuDetailList?.user?.user_id)" v-else="addention">关注</div>
        </div>
        <div class="text">{{ menuDetailList?.cookstory }}</div>
      </div>

      <!-- 食材列表区域 -->
      <div class="foodList">
        <div class="title" v-show="menuDetailList?.cook_time!==''">
          <div class="time">
            <div class="time-icon"><img class="auto-img" :src="menuDetailList?.cook_time_image"></div>
            <div class="num">{{ menuDetailList?.cook_time }}</div>
          </div>
          <div class="grade">
            <div class="grade-icon"><img class="auto-img" :src="menuDetailList?.cook_difficulty_image"></div>
            <div class="grade-text">{{ menuDetailList?.cook_difficulty }}</div>
          </div>
        </div>

        <div class="list">
          <div class="head">
            <div class="titles">食材清单</div>
            <div class="add">加入采购清单</div>
          </div>
          <div class="content" v-for="item in menuDetailList?.major" :key="item.id">
            <div class="menu">{{ item?.title }}</div>
            <div class="number">{{ item?.note }}</div>
          </div>
        </div>
      </div>

      <!-- 营养分析区域 -->
      <div class="analyse" v-show="menuDetailList?.energy!==0">
        <div class="head">
          <div class="titles">营养分析</div>
          <div class="add">查看详情</div>
        </div>
        <div class="detail">
          <div class="analyse-desc">
            <div id="main" style="width:190px; height:100px"></div>
            <div class="direction">
              <div class="desc-num" v-for="item in menuDetailList?.nutrition_facts" :key="item.id">{{ item?.amount }}</div>
            </div>
          </div>
          <div class="xian"></div>
          <div class="total">
            <div class="total-num">{{ menuDetailList?.energy }}</div>
            <div class="tex">千卡</div>
          </div>
        </div>
        <div class="zhu">{{ menuDetailList?.nutrition_facts_hint_text }}</div>
      </div>

      <!-- 菜谱步骤区域 -->
      <div class="cookStep">
        <div class="title">菜谱步骤</div>
        <div class="list" v-for="item in menuDetailList?.cookstep" :key="item.id">
          <div class="step">步骤 <span>{{ item?.position }}</span>/<span>{{ menuDetailList?.cookstep.length }}</span></div>
          <div class="img"><img class="auto-img" :src="item?.image"></div>
          <div class="descs">{{ item?.content }}</div>
        </div>
        <div class="release">{{ menuDetailList?.release_time }}</div>
      </div>

      <!-- 评论区域 -->
      <div class="comment" v-show="commentList?.cc!==0">
        <div class="comment-title">相关推荐</div>
      </div>
      <Comment v-show="commentList?.cc!==0" :commentList="commentList"></Comment>

      <!-- 底部区域 -->
      <div class="footer">
        <div class="input"><input type="text" placeholder="说点什么..."></div>
        <div class="mes"><van-icon name="chat-o" size="18" /><span>{{ commentList?.cc }}</span></div>
        <div class="shou"><van-icon name="star-o" size="18" /><span> 收藏</span></div>
      </div>

      <div class="footer-kong"></div>

    </div>

  </div>
</template>

<script>

import Comment from '@/components/Detail/Comment.vue'
import { Toast } from 'vant';
import { mapState } from 'vuex';

export default {

  name:'MenuDetail',

  props:{
    menuDetailList:{
      type:Object
    },
    menuId:{
      type:String
    },
    commentList:{
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
      activeNames: [],
      // addention: window.localStorage.getItem('caipuaddention') ? JSON.parse(window.localStorage.getItem('caipuaddention')) : null,
      addention:true,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
      ],
    }
  },

  computed:{
    ...mapState(['addentionId'])
  },

  // watch:{
  //   addention:{
  //     handler(newValue){
  //       window.localStorage.setItem('caipuaddention',JSON.stringify(newValue))
  //     }
  //   }
  // },


  async mounted(){
     // 基于准备好的dom，初始化echarts实例
     var myChart = this.$echarts.init(document.getElementById('main'));


      // 指定图表的配置项和数据
      var option = {
        title:{
          textStyle:{
            color:'pink',
          }
        },
        legend: {
          orient: 'vertical',
          bottom: '25px',
          right: '5px',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['30%', '70%'],
            center:['23%','40%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            color:['#FF7029','#27B451','#FFB219'],
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
            ],
          }
        ]
      };


      const data=await axios.get(`/recipe/detail/${this.menuId}`)
      // console.log(data)
      const menuData=data.data.result.recipe
      //console.log(menuData)

    
      //console.log(this.menuData);
      var menuDetailListData=[] 
      menuData.nutrition_facts.forEach((item)=>{
        //console.log(item);
        var objData={value:item.calorie,name:item.nutrient}
        menuDetailListData.push(objData)
      })

      //console.log(menuDetailListData);
      
      option.series[0].data=menuDetailListData

      //console.log(option);

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
  },

  methods:{
    comeBack(){
      this.$router.go(-1)
    },
    addent(id){
      //console.log(id);
      this.addention=false
      this.$store.commit('addAddention',id)
    },
    addentioned(id){
      //console.log(id);
      this.addention=true
      this.$store.commit('subAddention',id)
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  }

}
</script>

<style lang="scss" scoped>
.menuDetail-box{
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
  .video{
    width: 375px;
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
      font-size: 18px;
      font-weight: 600;
      margin-left: 10px;
    }
  }
  .history{
    width: 345px;
    span{
      font-size: 12px;
      color: #898989;
      margin-left: 10px;
    }
  }
}
.user-text{
  width: 375px;
  margin-top: 10px;
  box-sizing: border-box;
  padding: 10px 10px 10px 15px;
  .user{
    width: 350px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    .pic{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .name{
      width: 230px;
      height: 20px;
      margin-top: 10px;
      .n{
        font-size: 12px;
        font-weight: 600;
      }
      .vip{
        font-size: 12px;
        color: #ffc533;
        margin-left: 5px;
        margin-top: 2px;
      }
    }
    .attention{
      width: 60px;
      height: 26px;
      border-radius: 13px;
      background-color: #ffc533;
      text-align: center;
      line-height: 26px;
      margin-top: 5px;
      font-weight: 600;
    }
    .attentions{
      width: 60px;
      height: 26px;
      border-radius: 13px;
      background-color: #f5f5f5;
      text-align: center;
      line-height: 26px;
      margin-top: 5px;
      font-weight: 600;
      color: #9f9f9f;
    }
  }
  .text{
    width: 350px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
  }
}
.foodList{
  width: 375px;
  box-sizing: border-box;
  padding: 0 15px;
  margin-top: 20px;
  .title{
    width: 300px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    .time{
      width: 120px;
      height: 30px;
      display: flex;
      .time-icon{
        width: 20px;
        height: 20px;
      }
      .num{
        width: 100px;
        height: 30px;
        margin-left: 10px;
        font-size: 14px;
        font-weight: 600;
      }
    }
    .grade{
      width: 100px;
      height: 30px;
      display: flex;
      .grade-icon{
        width: 20px;
        height: 20px;
      }
      .grade-text{
        width: 80px;
        height: 30px;
        margin-left: 10px;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
  .list{
    width: 345px;
    margin-top: 10px;
    .head{
      width: 345px;
      height: 30px;
      display: flex;
      justify-content: space-between;
      .titles{
        width: 80px;
        height: 30px;
        font-size: 14px;
        font-weight: 600;
      }
      .add{
        width: 75px;
        height: 20px;
        margin-top: 4px;
        font-size: 12px;
        color: #5e9ea6;
      }
    }
    .content{
      width: 345px;
      height: 30px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding-right: 5px;
      .menu{
        height: 30px;
        font-size: 14px;
        color: #5498a1;
      }
      .number{
        height: 30px;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
}
.analyse{
  width: 375px;
  box-sizing: border-box;
  padding: 0 15px;
  .head{
    width: 345px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    .titles{
      width: 80px;
      height: 30px;
      font-size: 14px;
      font-weight: 600;
    }
    .add{
      width: 55px;
      height: 20px;
      margin-top: 4px;
      font-size: 12px;
      color: #5e9ea6;
    }
  }
  .detail{
    width: 345px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .analyse-desc{
      width: 260px;
      height: 60px;
      display: flex;
      .direction{
        width: 50px;
        height: 80px;
        .desc-num{
          width: 60px;
          height: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 5px;
        }
      };
    }
    .xian{
      width: 0.5px;
      height: 40px;
      background-color: #898989;
      margin-top: 25px;
    }
    .total{
      width: 100px;
      padding: 10px 0;
      margin-top: 10px;
      .total-num{
        width: 100px;
        text-align: center;
        margin-top: 5px;
        line-height: 20px;
        height: 20px;
        font-size: 18px;
        font-weight: 600;
      }
      .tex{
        width: 100px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        color: #898989;
        font-size: 12px;
      }
    }
  }
  .zhu{
    width: 345px;
    font-size: 13px;
    font-weight: 600;
    margin-top: 25px;
  }
}
.cookStep{
  width: 375px;
  box-sizing: border-box;
  padding: 0 15px;
  margin-top: 20px;
  .title{
    width: 345px;
    height: 30px;
    font-size: 14px;
    font-weight: 600;
  }
  .list{
    width: 345px;
    .step{
      width: 345px;
      height: 30px;
      font-size: 12px;
      font-weight: 600;
    }
    .img{
      width: 345px;
      img{
        border-radius: 13px;
      }
    }
    .descs{
      width: 345px;
      font-size: 14px;
      font-weight: 600;
      line-height: 30px;
      margin-top: 5px;
    }
  }
  .release{
    width: 345px;
    height: 20px;
    font-size: 12px;
    color: #898989;
    line-height: 20px;
  }
}
.comment{
  width: 375px;
  box-sizing: border-box;
  padding: 0 15px;
  margin-top: 20px;
  .comment-title{
    width: 345px;
    height: 30px;
    font-size: 18px;
    font-weight: 600;
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
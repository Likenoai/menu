<template>
  <div id="login">
    <div class="login-box">

      <div class="text">欢迎来到美食记！点击登录注册</div>

      <div class="login-form">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
            class="from"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            class="from"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" class="submit">登录</van-button>
          </div>
        </van-form>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {

  name:'Login',


  data(){
    return{
      username: '',
      password: '',
    }
  },


  methods:{
    onSubmit(values) {
      //console.log('submit', values);
      this.$root.loginToken=Date.now()
      //console.log(this.$route.query.url);
      setTimeout(()=>{
        this.$router.replace({path:this.$route.query.url || "/" })
      },500)
    },
    // login(){
    //   this.$root.loginToken=Date.now()
    //   //console.log(this.$route.query.url);
    //   setTimeout(()=>{
    //     this.$router.replace({path:this.$route.query.url || "/" })
    //   },500)
    // }
  },

  // beforeRouteEnter(to,from,next){
  //   if(!window.localStorage.getItem('loginToken')){
  //     next((vm)=>{
  //       console.log(vm);
  //     })
  //   }
  // },



}
</script>

<style lang="scss" scoped>
.login-box{
  width: 375px;
  margin: 0 auto;
  height: 667px;
  box-sizing: border-box;
  padding-top: 150px;
}
.text{
  width: 300px;
  margin: 0 auto;
  font-size: 16px;
  margin-bottom: 20px;
}
.login-form{
  width: 300px;
  margin: 0 auto;
  .from{
    border-bottom: 1px solid lightgray;
  }
  .submit{
    background-color: #149639;
  }
}

</style>
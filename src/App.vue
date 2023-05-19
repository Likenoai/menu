<template>
  <div id="app">
    
    <HomeNavView v-show="$route.meta.showHomeNav!==false" ></HomeNavView>
    <router-view />

  </div>
</template>

<script>

import HomeNavView from '@/views/HomeNavView.vue'
import { mapState } from 'vuex'

export default {
  name:'app',

  components: {
    HomeNavView
  },


  computed:{
    ...mapState(['historySearchList','addentionNum','addentionId'])
  },

  watch:{
    historySearchList:{
      handler(newValue){
        window.localStorage.setItem('historySearchList',JSON.stringify(newValue))
      }
    },
    // addentionNum:{
    //   handler(newValue){
    //     window.localStorage.setItem('addentionNum',JSON.stringify(newValue))
    //   }
    // }
    addentionId:{
      handler(newValue){
        window.localStorage.setItem('addentionId',JSON.stringify(newValue))
      }
    }
  },

}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

</style>

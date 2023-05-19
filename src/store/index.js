import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paused:true,
    // historySearchList:['红烧肉','大白菜','鱼'],
    historySearchList: window.localStorage.getItem('historySearchList') ? JSON.parse(window.localStorage.getItem('historySearchList')) : [] ,
    showHistorySearch:true,
    addentionNum:0,
    addentionId:window.localStorage.getItem('addentionId') ? JSON.parse(window.localStorage.getItem('addentionId')) : []
  },
  getters: {
    
  },
  mutations: {
    playVideo(state){
      state.paused=false
    },
    addHistorySearch(state,{value}){
      state.showHistorySearch=true
      state.historySearchList=[...new Set([value,...state.historySearchList])]
    },
    deleteHistorySearch(state){
      state.historySearchList=[]
      state.showHistorySearch=false
    },
    addAddention(state,id){
      //console.log(id);
      state.addentionId=[id,...state.addentionId]
      state.addentionNum=state.addentionId.length
    },
    subAddention(state,id){
      //console.log(id);
      state.addentionId=state.addentionId.filter(item=>{
        return item!==id
      })
      state.addentionNum=state.addentionId.length
    }
  },
  actions: {
  },
  modules: {
  }
})

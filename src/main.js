import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import { Icon,Tabbar,TabbarItem,Search,Tab,Tabs,Button,Swipe, SwipeItem,Sidebar, SidebarItem,Cell, CellGroup,Collapse, CollapseItem,Skeleton,Form,Field,ShareSheet } from 'vant'
import 'vant/lib/index.css'
import * as echarts from 'echarts'


Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Button);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Skeleton);
Vue.use(Form);
Vue.use(Field);
Vue.use(ShareSheet);

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App),
  data(){
    return{
      loginToken:window.localStorage.getItem('loginToken') || null,
    }
  },
  watch:{
    loginToken:{
      handler(newValue){
        window.localStorage.setItem('loginToken',newValue)
      }
    }
  }
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import DetailListView from '../views/DetailListView.vue'
import LoginView from '../views/LoginView.vue'



Vue.use(VueRouter)

// 路由规则
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/classify',
    name: 'classify',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/ClassifyView.vue'),
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import(/* webpackChunkName: "about" */ '@/views/CollectView.vue'),
    meta:{
      isNeedLogin:true
    },
  },
  {
    path: '/my',
    name: 'my',
    component: () => import(/* webpackChunkName: "about" */ '@/views/MyView.vue'),
    meta:{
      isNeedLogin:true
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '@/views/SearchView.vue'),
    meta:{
      showHomeNav:false,
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/DetailListView.vue'),
    meta:{
      showHomeNav:false,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      showHomeNav:false,
    },
  },
]

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// const originalReplace = VueRouter.prototype.replace
// VueRouter.prototype.replace = function replace (location) {
//   return originalReplace.call(this, location).catch(err => err)
// }

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  const isLogin=window.localStorage.getItem('loginToken')
  //console.log(isLogin);
  if(to.meta.isNeedLogin){
    if(isLogin){
      next()
    }else{
      //next({ path:'/login',query:{url:to.fullPath} })
      router.push({ path:'/login',query:{url:to.fullPath} })
    }
  }else{
    next()
  }
})


export default router

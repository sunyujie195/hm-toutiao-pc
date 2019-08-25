// 这个router/index.js文件的作用: 创建一个router实例并导出，可供main.js使用

import Vue from 'vue'

// 引入router组件
import VueRouter from 'vue-router'

// 引入Login组件
import Login from '@/views/login/Login.vue'

// 引入Home组件
import Home from '@/views/home/Home.vue'

// 引入Welcome组件
import Welcome from '@/views/welcome/Welcome.vue'

// 引入404组件
import NotFound from '@/views/404/404.vue'

// 注册router
Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({
  // 定义路由规则（就是通过路径找对应的组件）
  routes: [
    // name选项作用是：找到对应的路由规则
    // 跳转方便一些的两种方式：$router.push('/login') 或者 $router.push({name:'login'})
    // path:'/xxx' 是指地址栏跳转的锚点信息
    // component: 组件模块
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      // 父路由和子路由都有name时，会有警告，所以按照path走就不需要父路由name值
      // name: 'home',
      component: Home,
      // 给Home挂二级路由Welcome
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    },
    // 404页面，path是*意思是，当所有页面都有错误时，才会走404页面
    { path: '*', name: '404', component: NotFound }
  ]
})

// 导出router
export default router

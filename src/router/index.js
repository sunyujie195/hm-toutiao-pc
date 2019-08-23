// 这个router/index.js文件的作用: 创建一个router实例并导出，可供main.js使用

import Vue from 'vue'

// 引入router组件
import VueRouter from 'vue-router'

// 引入Login组件
import Login from '@/views/login/Login.vue'

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
    { path: '/login', name: 'login', component: Login }
  ]
})

// 导出router
export default router

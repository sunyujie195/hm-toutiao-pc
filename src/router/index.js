// 这个router/index.js文件的作用: 创建一个router实例并导出，可供main.js使用

import Vue from 'vue'

// 引入router组件
import VueRouter from 'vue-router'

// 注册router
Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({
  routes: [
    // name选项作用是：找到对应的路由规则
    // 跳转方便一些的两种方式：$router.push('/login') 或者 $router.push({name:'login'})

  ]
})

// 导出router
export default router

// 引入vue实例
import Vue from 'vue'
// 引入App根基组件
import App from './App.vue'

// 导入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入router组件
import router from '@/router'
/*  原来的引入方式是： import VueRouter from './router/index.js'
  @是Vue-CLI提供给src的绝对路径的别名
  现在的引入方式用@别名后，index.js就被省略了，它在目录下默认索引文件(默认自动加载index.js文件名称)
  当在同一目录中有index.js、index.vue、index.json这三种文件时，会有优先级，只是默认这三种文件
*/

// 配置引入axios模块
import axios from 'axios'
// 挂axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 注册构造器ElementUI
Vue.use(ElementUI)

new Vue({
  // 在Vue实例中挂router对象
  router,

  render: h => h(App)
}).$mount('#app')

// main.js的作用是：作为项目的入口文件。
// 具体的职责是： 1.负责依赖资源全局导入文件.2.创建一个vue根实例去管理渲染 public/index.html中的app容器

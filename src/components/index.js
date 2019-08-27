// 这里index.js文件是一个封装插件：目的是全局注册components公用组件下的所有组件

// 引入需要封装MyBread组件
import MyBread from '@/components/my-bread.vue'

export default {
  install (Vue) {
    // 这里传参是Vue对象：目的是在main.js中使用 Vue.use(插件) ，再调用 install函数，传入当前封装插件中的 Vue对象
    // use是安装插件意思

    // 全局注册
    // Vue.component('组件名称', '组件配置对象')
    Vue.component(MyBread.name, MyBread)
  }
}

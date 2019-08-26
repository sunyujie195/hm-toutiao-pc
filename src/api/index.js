// api的index.js文件给项目配置请求axios，再导出进行全局配置

// 引入axios模块
import axios from 'axios'
// 引入store 本地存储文件
import store from '@/store'

// 请求配置-需要两个条件
// 1.基准路径(公共根地址)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 2.自定义headers：作用是要追加携带token值
axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

export default axios

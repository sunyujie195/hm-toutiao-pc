// api的index.js文件给项目配置请求axios，再导出进行全局配置

// 引入axios模块
import axios from 'axios'
// 引入store 本地存储文件
import store from '@/store'
// 引入router文件
import router from '@/router'

// 导入json-bigint模块包
import JSONBIG from 'json-bigint'

// 用axios配置
axios.defaults.transformResponse = [(data) => {
  // 严谨的处理后端在响应数据时，可能出现的没有响应的情况
  try {
    return JSONBIG.parse(data)
  } catch (error) {
    return data
  }
}]

// 请求配置-需要两个条件
// 1.基准路径(公共根地址)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 2.自定义headers：作用是要追加携带token值
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

// 请求拦截器(在每一次的请求之前执行)
axios.interceptors.request.use(config => { // 参数config是默认请求配置
//   console.log(config)
  // 修改配置 ==> 添加 token 信息
  config.headers.Authorization = `Bearer ${store.getUser().token}`

  return config// 返回修改好的配置 ==> 请求的时候使用你的修改后的配置
}, (error) => { // 这里的error是错误对象
  return Promise.reject(error)// 返回一个一定出错的promise对象
})

// 响应拦截器(在每一次的响应之后执行)
axios.interceptors.response.use(response => { // 响应成功
  return response
}, (error) => { // 响应失败
//   console.log(error)// {data: {…}, status: 201, statusText: "CREATED", headers: {…}, config: {…}}
  // error.response  响应对象
  // error.response.status 状态码

  // 1. 获取状态码
  const status = error.response.status
  // 2. 判断401
  if (status === 401) {
    // 3. 清除无效token
    store.delUser()
    // 4. 跳转登录
    // 4.1 原生方式改路径  router基于hash实现(router跳转的本质是修改hash值)  /login ===> #/login
    // window.location.hash = '#/login'
    // 4.2 使用router进行跳转  $router本质是main.js导入了router/index.js的实例，挂载vue根实例下
    router.push('/login')
  }
  return Promise.reject(error)
})

export default axios

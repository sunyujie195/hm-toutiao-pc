// store模块，这个index.js文件是用于用户信息的sessionStorage本地存储、获取、删除三个函数

// 将拿到的秘钥key不变，作为常量
const key = 'hm-key'
// 导出函数
export default {
  setUser (user) {
    console.log(user) // 得到的数据类型是对象
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(key, jsonStr)
  },

  getUser (user) {
    // 将获取到的json数据转成对象
    // 如果获取到的数据是null，则null.token会报错，若是{}.token返回是undefined，不会报错
    const jsonStr = window.sessionStorage.getItem(key) || '{}'
    return JSON.parse(jsonStr)
  },

  delUser (user) {
    window.sessionStorage.removeItem(key)
  }

}

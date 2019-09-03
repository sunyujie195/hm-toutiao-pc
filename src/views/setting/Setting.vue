<template>
  <div class="container">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>

      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="12">
          <!-- 用户头像 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="upload"
            >
            <!-- http-request 是自定义上传行为 -->
            <!-- userInfo.photo拿到后台头像数据，做预览效果 -->
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 引入store模块
import store from '@/store'

// 导入eventBus.js
import eventBus from '@/eventBus.js'

export default {
  data () {
    return {
      // 提交给后台数据
      userInfo: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      }

      // 用户头像数据
    /* imageUrl: null  开始用头像数据保存在imageUrl中,但后台数据返回值有 保存在 photo 中 */
    }
  },

  created () {
    this.getUserInfo()
  },

  methods: {
    // 获取用户个人信息
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      // console.log(data)
      // 此时的data就是用户数据,填充表单数据
      this.userInfo = data
    },

    // 点击保存设置按钮--提交编辑用户个人资料信息
    async save () {
      // const { data: { data } } = await this.$http.patch('user/profile', this.userInfo)
      // 这里的数据data中的已经声明好，可以直接发送。不用再接收数据

      const { name, intro, email } = this.userInfo // 拿到这三项数据
      await this.$http.patch('user/profile', { name, intro, email })// 这是从userInfo对象中给三项数据赋值

      // 成功提示
      this.$message.success('保存设置成功')

      // 更新本地存储中--用户名
      const localUser = store.getUser()// 获取本地存储用户信息
      localUser.name = name// 编辑修改后的name  赋值给 本地拿到的name值
      store.setUser(localUser)// 赋值完后再存储到本地

      // 更新Home组件--用户名 ==> 触发传递数据name值
      eventBus.$emit('updateName', name)
    },

    // 选择图片后触发事件
    async upload (reslut) {
      // console.log(reslut)// {id: 1, name: "熬", intro: "如了。", photo: "http://t", email: "第三m",}
      // 1. 获取文件对象
      const file = reslut.file

      // 2. 使用 formData 追加文件数据
      // 2.1实例FormData对象
      const formData = new FormData()
      // 2.2 追加
      formData.append('photo', file)

      // 3. 使用axios发请求
      // 3.1 后台返回的photo数据 是 头像地址
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      // 3.2 提示
      this.$message.success('修改头像成功')
      // 3.3 预览头像
      this.userInfo.photo = data.photo
      // 3.4 更新本地存储头像
      const localUser = store.getUser()
      localUser.photo = data.photo
      store.setUser(localUser)
      // 3.5 更新Home组件头像
      eventBus.$emit('updatePhoto', data.photo)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

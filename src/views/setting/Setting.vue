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
              <el-input v-model="userInfo.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="12">
          <!-- 用户头像 -->
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交给后台数据
      userInfo: {
        name: '',
        intro: '',
        email: ''
      },

      // 用户头像数据
      imageUrl: null
    }
  },

  created () {
    this.getUserInfo()
  },

  methods: {
    // 获取用户个人信息
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      console.log(data)
      // 此时的data就是用户数据,填充表单数据
      this.userInfo = data
    }
  }
}
</script>

<style lang="less" scoped>
</style>

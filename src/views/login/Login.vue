<template>
    <div class='container'>

        <!-- 显示中间卡片 -->
        <el-card class="box-card">
            <!-- 卡片中间的logo -->
            <img src="../../assets/images/logo_index.png" alt="">
            <!-- 表单容器 -->
            <el-form :model="loginForm" >
                <!-- 表单项 -->
                <el-form-item>
                    <!-- 表单元素组件 -->
                    <el-input v-model="loginForm.mobile" placeholder="请输入您的手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container{
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .box-card{
        width: 400px;
        height: 350px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        img{
          width: 200px;
          display: block;
          margin: 0 auto;
          margin-bottom: 20px;
        }
    }
}
</style>

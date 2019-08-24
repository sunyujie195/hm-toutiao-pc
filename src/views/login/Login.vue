<template>
    <div class='container' ref="divDom">

        <!-- 显示中间卡片 -->
        <el-card class="box-card">
            <!-- 卡片中间的logo -->
            <img src="../../assets/images/logo_index.png" alt="">

            <!-- 表单容器   status-icon是做反馈图标-->
            <el-form :model="loginForm" :rules="loginRules" status-icon ref="loginRef">
                <!-- 表单项 -->
                              <!-- prop是需要校验的，后面是值(字段名) -->
                <el-form-item prop="mobile">
                    <!-- 表单元素组件 -->
                    <el-input v-model="loginForm.mobile" placeholder="请输入您的手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="loginMit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>
export default {

  // // 渲然完毕时，获取div的dom对象
  // mounted () {
  //   const divDom = this.$refs.divDom
  //   console.log(divDom)
  //   const loginRef = this.$refs.loginRef
  //   console.log(loginRef)
  // },

  data () {
    // 自定义校验(函数) --手机号
    const checkMobile = (rule, value, callback) => {
      // 判断是否校验成功
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不正确'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        mobile: '',
        code: ''
      },

      // 表单校验规则对象 --- 就是校验data中的表单数据 字段
      loginRules: {
        // 给字段加上校验规则(可能是多个)
        mobile: [
          // required: true 表示必填规则
          // trigger: 'blur' == trigger是触发意思; blur是失去焦点后去触发必填规则
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // change 表示在输入内容改变时触发函数
          { validator: checkMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度是6位', trigger: 'blur' }
        ]

      }
    }
  },

  methods: {
    loginMit () {
      // 调用 validate 函数对整体表单校验
      this.$refs.loginRef.validate((valid) => {
        // 判断valid是否为真，校验成功
        if (valid) {
          // 校验成功，则调用登录接口进行登录
        }
      })
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

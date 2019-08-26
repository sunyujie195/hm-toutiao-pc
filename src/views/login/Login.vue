// 登录页面
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
                    <el-button type="primary" style="width:100%" @click="loginMit()">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>
// 导入store模块
import Store from '@/store/index.js'

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
        mobile: '18301129680',
        code: '246810'
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
      this.$refs.loginRef.validate(async (valid) => {
        // 判断valid是否为真，校验成功
        if (valid) {
          /*
          // 校验成功，则调用登录接口进行登录
          // 第二个参数this.loginForm要包括表单内所有数据字段
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              console.log(res) // {data: {…}, status: 201, statusText: "CREATED", headers: {…}, config: {…}}
              // 得到的res是一个响应对象，res.data是响应主体。 res.data.data用户信息 中包含token
              // 创建一个store模块操作 用户信息的 储存、获取、删除 -- 当登录成功时，调用函数
              // 调用之前要导入模块-- 当登录成功时，调用存储函数
              Store.setUser(res.data.data)

              // 登录成功则跳转首页
              this.$router.push('/')
            })
            .catch(() => {
              // 登录失败则提示错误
              this.$message.error('手机号或验证码错误')
            })
            */

          /* 将以上的功能用 async & await 语法实现:
              1.首先获取登录成功后的用户信息数据：    res解构赋值后就是={data:{data:'用户信息',message:'提示'}}
              2.当获取的数据失败时，要有错误的提示信息
              3.使用js基础语法==try{ 可能要报错的代码 }catch(exception:异常){ 获取到异常报错(处理异常) }==去捕获异常(错误)，可以使用在任何报错的地方
              await是获取promise的成功结果，失败使用try{}catch(exception){}进行处理。
              await的外层函数必须加上async
          */
          console.log(valid)
          try {
            // 校验成功，则调用登录接口进行登录功能
            // const res = await this.$http.post('authorizations', this.loginForm)
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            // 当登录成功时，调用存储函数
            Store.setUser(data)
            // 登录成功则跳转首页
            this.$router.push('/')
          } catch (error) {
            // 登录失败则提示错误
            this.$message.error('手机号或验证码错误')
          }
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

// 后台管理首页
<template>
<!-- 基本布局 -->
    <el-container class="my-container">

        <!--导航菜单组件 -->
        <el-aside :width="isCollapse?'64px':'200px' ">
            <!-- 导航菜单logo       给logo属性绑定v-bind的class做切换效果-->
            <div class="logo" :class="{minlogo:isCollapse}"></div>
            <!-- 激活导航菜单 -- 当你点击哪个页面，就激活什么菜单 -- 要通过 跳转的路径 去判断激活了当前哪个菜单(页面)
               怎么获取当前路径？  ==>  :default-active="当前路径"  动态绑定当前路径。
                    $router对象 和 $route对象 的区别：
                        $router 对象调用的是函数 ---- this.$router.push('/')
                        $route 对象调用的是数据 ---- this.$route.query / params
                            query获取的是地址栏？后面的 key=value 的传参  -- this.$route.query.key
                            params获取的是地址栏 路径(user/:id === user/100) 上的传参  -- this.$route.params.id
                            $route.path 是当前路径 ==> :default-active="$route.path"
             -->
                <el-menu
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    background-color="#002033"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    router
                >
                <!-- 使用属性时，若是布尔类型的router，有属性代码则true，无则false
                    router布尔值是激活以 index 作为 path 进行路由跳转-->
                    <el-menu-item index="/">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="/article">
                        <i class="el-icon-document"></i>
                        <span slot="title">内容管理</span>
                    </el-menu-item>
                    <el-menu-item index="/image">
                        <i class="el-icon-picture"></i>
                        <span slot="title">素材管理</span>
                    </el-menu-item>
                    <el-menu-item index="/publish">
                        <i class="el-icon-s-promotion"></i>
                        <span slot="title">发布文章</span>
                    </el-menu-item>
                    <el-menu-item index="/comment">
                        <i class="el-icon-chat-dot-round"></i>
                        <span slot="title">评论管理</span>
                    </el-menu-item>
                    <el-menu-item index="/fans">
                        <i class="el-icon-present"></i>
                        <span slot="title">粉丝管理</span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title">个人设置</span>
                    </el-menu-item>
                </el-menu>
        </el-aside>

        <el-container>
            <!-- 头部布局 -->
            <el-header>
                <span @click="toggleAside()" class="icon el-icon-s-fold"></span>
                <span class="text"> 江苏传智播客科技教育有限公司</span>
                <!-- 下拉菜单组件-->
                <el-dropdown class="my-dropdown" @command="clickItem">
                    <!-- 给最高父组件绑定监听点击事件 => clickItem是回调函数 => clickItem的后面不加括号()，加上是表示不传任何参数;不加上表示默认有传参 -->
                    <span class="el-dropdown-link">
                        <img class="avatar" src="photo" alt="">
                        <span class="name"> {{name}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <!-- slot是vue基础知识==插槽意思 -->
                    <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item> -->
                        <!-- <el-dropdown-item icon="el-icon-unlock" @click.native="loginOut()">退出登录</el-dropdown-item> -->
                        <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-unlock" command="loginOut">退出登录</el-dropdown-item>
                        <!-- 给回调函数clickItem传参数 =>  选项的指令=>command="setting"或是command="loginOut" -->
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>

            <!-- 主题布局：渲染展示二级路由页面 -->
            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>
    </el-container>
</template>

<script>
// 引入store模块
import store from '@/store'

export default {
  // 声明数据：让导航菜单默认展开
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },

  // Vue实例创建完,获取本地存储数据
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },

  methods: {
    toggleAside () {
      // 切换侧边栏展开与收起
      // 数据 isCollapse 默认值false 展开意思
      // 通过这个数据的状态去切换 侧边栏展开与收起 状态
      this.isCollapse = !this.isCollapse
    },

    // 使用element-ui实现给组件监听点击过选项操作
    clickItem (command) {
      console.log(command) // setting、 loginOut
      this[command]()
      // []中的 command表示调用的方法名 == 后面加上()表示调用方法，不加上()获取的只是方法或方法体
    },

    // 个人设置
    setting () {
      this.$router.push('/setting')
    },
    // 退出登录
    loginOut () {
      // 1️⃣删除用户信息
      store.delUser()
      // 2️⃣跳转登录页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.my-container{
    width: 100%;
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    // 导航菜单
    .el-aside{
        background: #002033;
        .logo{
           width: 100%;
           height: 60px;
           background: #002244 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto;
        }
        .minlogo{
            background-image: url(../../assets/images/logo_admin_01.png);
            background-size: 36px auto;
        }
        .el-menu{
            border-right: none;
        }
    }
    // 头部
    .el-header{
        border-bottom: 1px solid #ddd;
        line-height: 60px;
        .icon {
            font-size: 24px;
            vertical-align: middle;
        }
        .text{
            vertical-align: middle;
        }
        .my-dropdown{
            float:right;
            .avatar{
                width: 30px;
                height: 30px;
                vertical-align:middle;
                display: inline-block;
                // 跟个人设置头像相冲突的解决办法
            }
            .name{
                color:#333;
                // bold 有加粗的意思
                font-weight: bold;
                vertical-align:middle;
            }
        }
    }
}
</style>

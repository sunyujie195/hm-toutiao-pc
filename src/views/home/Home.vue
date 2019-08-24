// 后台管理首页
<template>
<!-- 基本布局 -->
    <el-container class="my-container">

        <!-- 导航菜单组件 -->
        <el-aside width="200px">
            <!-- 导航菜单logo -->
            <div class="logo"></div>
                <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#002033" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-document"></i>
                        <span slot="title">内容管理</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-picture"></i>
                        <span slot="title">素材管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-s-promotion"></i>
                        <span slot="title">发布文章</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-chat-dot-round"></i>
                        <span slot="title">评论管理</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <i class="el-icon-present"></i>
                        <span slot="title">粉丝管理</span>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <i class="el-icon-setting"></i>
                        <span slot="title">个人设置</span>
                    </el-menu-item>
                </el-menu>
        </el-aside>

        <el-container>
            <!-- 头部布局 -->
            <el-header>
                <span class="icon el-icon-s-fold"></span>
                <span class="text"> 江苏传智播客科技教育有限公司</span>
                <!-- 下拉菜单组件-->
                <el-dropdown class="my-dropdown">
                    <span class="el-dropdown-link">
                        <img class="avatar" src="../../assets/images/avatar.jpg" alt="">
                        <span class="name"> 用户名称</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <!-- slot是vue基础知识==插槽意思 -->
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>

            <!-- 主题布局 -->
            <el-main>Main</el-main>

        </el-container>
    </el-container>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.my-container{
    width: 100%;
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    .el-aside{
        background: #002033;
        .logo{
           width: 100%;
           height: 60px;
           background: #002244 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto;
        }
        .el-menu{
            border-right: none;
        }
    }
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

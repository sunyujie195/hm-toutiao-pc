// 全局封装面包屑组件

<template>
    <div class='container'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
                <!-- vue插槽的使用 -->
                <slot></slot>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
</style>

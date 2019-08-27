// 封装面包屑组件

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
  // 在组件里定义一个name属性，给组件取名称，供全局调用
  name: 'my-bread'
}
</script>

<style lang="less" scoped>
</style>

<template>
  <div id="app">
    <!-- <h2>App根基组件</h2> -->
    <!-- <el-button type="success">成功按钮</el-button> -->

    <!-- 定义一个一级路由出口,组件渲染的容器(位置) -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'

}
</script>

<style lang="less">
</style>

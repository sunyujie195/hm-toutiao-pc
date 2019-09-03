<template>
    <div class='container'>
        <button @click="fn">{{msg}}</button>
    </div>
</template>

<script>
// 导入eventBus.js
import eventBus from '@/eventBus.js'

export default {
  data () {
    return {
      msg: '我是COM-B内部数据'
    }
  },

  methods: {
    // 点击按钮时，提交数据
    fn () {
      eventBus.$emit('a-A', this.msg)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<template>
    <div class='container'>
        <b>{{messagee}}</b>
        <!-- <b>加粗</b> -->
    </div>
</template>

<script>
// 导入eventBus.js
import eventBus from '@/eventBus.js'

export default {
  data () {
    return {
      messagee: 'COM-A组件内部的数据'
    }
  },

  created () {
    // A要数据，在钩子函数中绑定函数
    eventBus.$on('a-A', (data) => {
      // 当接收到data数据时，把message数据改成B组件提交过来的数据，插值表达式渲染在页面上，看到数据变化
      this.messagee = data
    })
  }
}
</script>

<style lang="less" scoped>
</style>

// 封装频道组件 -- 将父组件Article.vue的拷贝到子组件

<template>
    <!-- 因为el-select属于根标签，不需要div -->
    <!-- Select 选择器         clearable是清空选项-->
    <!-- v-model的作用是既可以赋值又可以改值            因为props接收值是只读的原因=>v-model="value"要改为:value="value"给组件内部赋值 -->
    <el-select :value="value" placeholder="请选择" clearable @change="changeChannel">
        <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
</template>

<script>
// 这个组件需要的默认功能：select选择器、声明数据、获取数据
export default {
  // 在组件里定义一个name属性，给组件取名称，供全局调用
  name: 'my-channel',

  //   子组件接收值 -- 只读
  props: ['value'],

  data () {
    return {
      // 这里声明的数据和reqParams.channel_id、channelOptions无关。组件内部决定名字
    // value: null,
      // 频道下拉框中的数据
      channelOptions: []
    }
  },

  created () {
    // 调用频道后台数据
    this.getchannelOptions()
  },

  methods: {
    // 获取频道后台数据
    async getchannelOptions () {
      // 看api文档返回的最后的数据 => data.channels[ {id, name}]
      // 使用 async & await 发送axios请求
      const { data: { data } } = await this.$http.get('channels')
      // 赋值给频道下拉框中的数据
      this.channelOptions = data.channels
    },

    // 当子组件的内部发生改变，触发change事件
    changeChannel (channelId) {
      // 1.频道选项,清空功能,清空之后的值是 "" 而不是null，所以要赋值
      // === 这里是子组件自己的传值，自己处理 ===
      if (channelId === '') {
        channelId = null
      }

      // 将你选中的频道ID提交给父组件 -- (子传父值)
      this.$emit('input', channelId)
    }

  }

}
</script>

<style lang="less" scoped>
</style>

// 这里组件内部
<template>
    <div class='container'>
        <!-- 测试my-bread组件 -->

        <!-- <div>header</div> -->
        <div>
            <!-- 默认插槽 -->
            <!-- <slot></slot> -->
        </div>
        <!-- <div>footer</div> -->

        <!-- <div>header</div> -->
        <div>
            <!-- 备用内容 -->
            <!-- <slot>传入备用内容</slot> -->
        </div>
        <!-- <div>footer</div> -->

        <!-- 具名插槽：在插槽内传入多处内容 ==> 取名字分别传入 -->
        <!-- <div><slot name="header">吕1</slot></div>
        <div><slot name="conent">阿1</slot></div>
        <div><slot name="footer">帕1</slot></div> -->

        <!-- 作用域插槽 -->
        <div><slot name="div" :msg="message" list="列表"></slot></div>
        <!-- 在组件内部插槽当前作用域下，传递两项数据 -- 动态绑定msg、静态绑定list -->
    </div>
</template>

<script>
export default {
  // 声明组件内部数据
  data () {
    return {
      message: '我是组件内部数据'
    }
  }
}
</script>

<style lang="less" scoped>
</style>

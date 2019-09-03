// 测试：在index.vue组件中使用  com-a.vue组件或者其它组件
// 这里是使用组件 ==> 当使用组件时，使用组件内部的插槽需要依赖组件内部的数据，叫作用域插槽
<template>
    <div class='container'>
        <!-- 3️⃣使用组件 -->

        <!-- <com-a></com-a> -->

        <!-- <com-a>烈火军校</com-a> -->
        <!-- <com-a>九州缥缈录</com-a> -->

        <!-- <com-a> -->
            <!-- 使用组件时，没有传入内容，会使用slot中的默认内容，备用内容 -->
        <!-- </com-a> -->

        <!-- <com-a>
            <div slot="header">吕归尘</div>
            <div slot="conent">阿苏勒</div>
            <div slot="footer">帕苏尔</div>
        </com-a> -->

        <!-- <com-a><div slot="div" slot-scope="scope">{{scope.msg}}---{{scope.list}}</div></com-a> -->
        <!--  slot-scope="scope" 是接收作用域插槽上所有绑定的数据，数据的集合名字叫scope对象{msg:'',list:''}

            slot="div" 指定插槽名称
            在vue版本 2.6.0 之后提供了新的写法  v-slot:插槽名称="作用域数据对象"
            注意：v-slot必须写在 template 标签中
        -->
        <!-- <hr> -->
        <!-- <com-a>
            <template v-slot:div="scope">{{scope.msg}}---{{scope.list}}</template>
        </com-a> -->

        <!-- 使用--非父子传值测试(A.vue组件和B.vue组件) -->
        <com-a></com-a>
        <hr>
        <com-b></com-b>

    </div>
</template>

<script>
// 1️⃣引入Test.vue组件
// import ComA from './com-a.vue'

import ComA from './A'
import ComB from './B'

export default {
  // 2️⃣私有注册
  components: {
    ComA,
    ComB
  }

  // async created () {
  //   // 1. 使用promise 调用A接口后调用B接口获取所有的数据
  //   this.$http.get('http://localhost:3000/a')
  //     .then(res => {
  //       console.log(res.data) // A -- res.data是数据
  //       return this.$http.get('http://localhost:3000/b')// 只有返回的是Promise对象才可以继续.then
  //     })
  //     .then(res => {
  //       console.log(res.data) // B
  //     })

  //   // 2. 使用async await 调用A接口后调用B接口获取所有的数据
  //   // 使用 await 修饰的函数（返回值一定是promise） 那么：返回值是成功后的结果
  //   // await 同步执行这个函数，会阻碍当前程序执行
  //   // 带有await语法的函数，一行代码执行完毕后才会执行下一行代码
  //   // await 的使用必须在 async 修饰的函数内部 （await的外层函数必须加上async ）
  //   // async & await 的使用一定是基于promise
  //   const resA = await this.$http.get('http://localhost:3000/a')
  //   const resB = await this.$http.get('http://localhost:3000/b')
  //   console.log(resA.data, resB.data)
  // }

}
</script>

<style lang="less" scoped>
</style>

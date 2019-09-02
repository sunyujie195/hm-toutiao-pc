// 封面上传图片组件的封装

<template>
  <div class="img-container">

    <!-- 选择封面的图片按钮 -->
    <div class="imgBtn" @click="openDialog">
      <img src="../assets/images/default.png" alt />
    </div>

    <!--------------------------------------------------- 对话框Dialog  -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <!-- tab栏按钮 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!--------------------------- radio按钮组 -->
          <el-radio-group v-model="reqParams.collect" size="small" @change="toggleCollect">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <!------------------------------- 图片列表 -->
          <div class="imgList">
            <!-- 一张图片的布局   -->
            <!-- 这里遍历一张图片时 in 10 表示遍历10次数
                <div class="imgItem" v-for="item in 10" :key="item">
                当获取到图片列表数据后，这里不再遍历次数，而是遍历拿到的数据 => 数组里包含对象
                :key唯一标识指向对象，但是key必须是字符串或者number类型，所以取出id -->
            <div class="imgItem" v-for="item in imageData" :key="item.id">
              <!-- 动态绑定：url表示图片地址 -->
              <img :src="item.url" alt />
            </div>
          </div>
          <!---------------------------------------- 分页组件
              page-size：每页显示条目个数
              current-page：(显示)当前页码
              两项动态绑定，不写死，以便可以从声明的所有数据对象reqParams中获取
              点击切换页码，就是改变页码事件current-change，给当前页码current-page绑定click事件
              hide-on-single-page表示只有一页时是否隐藏分页组件，false为隐藏 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            hide-on-single-page
          ></el-pagination>
        </el-tab-pane>

        <el-tab-pane label="上传图片" name="upload">上传图片内容</el-tab-pane>

      </el-tabs>

      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
export default {
  // 在组件里定义一个name属性，给组件取名称，供全局调用
  name: 'my-image',

  data () {
    return {
      // 对话框的显示与隐藏（默认隐藏false）
      dialogVisible: false,

      // 激活tab栏当前选项的name属性值
      activeName: 'image',

      // api获取用户图片素材返回给后台数据参数
      reqParams: {
        // collect表示收藏，true为收藏，false为全部
        collect: false,
        page: 1,
        // 一页显示8张图
        per_page: 8
      },

      // 图片列表数据
      imageData: [],

      // 图片总张数(最开始没有数据)
      total: 0,

      // 预览图的地址 -- 上传成功后再切换到图片
      imageUrl: null
    }
  },

  methods: {
    // 打开 对话框 触发事件
    openDialog () {
      this.dialogVisible = true
      // 获取图片列表数据
      this.getimageData()
    },

    // 获取图片列表
    async getimageData () {
      // data.results 是图片列表
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      // 赋值给图片列表数据
      this.imageData = data.results

      // 在获取文章列表时拿到文章的总条数(data.total_count)，赋值给分页
      this.total = data.total_count
    },

    // 切换全部与收藏按钮触发事件
    toggleCollect () {
      // 让每次点击按钮筛选后，页码都重置到1
      this.reqParams.page = 1
      // 获取图片列表数据
      this.getimageData()
    },

    // 改变页码触发事件函数
    changePager (newPage) {
      // 将改变的页码重新赋值给页码数据，然后更新图片列表
      this.reqParams.page = newPage
      this.getimageData()
    }

  }
}
</script>

<style lang="less" scoped>
// 图片按钮样式
.imgBtn{
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    img{
        width: 100%;
        height: 100%;
        // 让后面的三图成块元素独占一行
        display: block;
    }
}
// 底部按钮样式
.dialog-footer {
  text-align: center;
  display: block;
  width: 100%;
}
// 图片列表样式
.imgList{
    margin-top: 20px;
    .imgItem{
        width: 160px;
        height: 120px;
        // dashed虚线
        border: 1px dashed #ddd;
        // inline-block行内块：一行显示多个，可设宽高
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
        // 子绝父相
        position: relative;
        img{
            width: 100%;
            height: 100%;
            // block块：独占一行，可设宽高
            display: block;
            // ----img提供的新属性:设置图片的平铺方式(contain等比例缩放，完全显示在容器内)
            object-fit: contain;
        }
    }
}
.el-pagination{
    text-align: center;
}

</style>

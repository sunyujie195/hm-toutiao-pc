// 封装--封面 对话框 组件

<template>
  <div class="img-container">

    <!-- 选择封面的图片按钮 -->
    <div class="imgBtn" @click="openDialog">
      <!-- 父组件传入地址背后的图片，在这里显示，若传入为空字符，就显示默认图 -->
      <img :src="value || defaultImage" alt />
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
                :key唯一标识指向对象，但是key必须是字符串或者number类型，所以取出id
                click选中的图片事件传参：传入后台原本的图片url
                表达式判断 :class="{selected:item.url===selectedImageUrl}"：
                  ==>class属性动态绑定：在click就有添加selected类名的照片的url地址 和 后台提交列表中的图片url地址 是否一致-->
            <div class="imgItem"
              v-for="item in imageData"
              :key="item.id"
              @click="selectedImage(item.url)"
              :class="{selected:item.url===selectedImageUrl}">
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

        <el-tab-pane label="上传图片" name="upload">
          <!-----------------------------上传图片组件
              1️⃣action--上传图片的接口地址,el-upload是element-ui提供的地址,接口地址需要完整地址。和axios的地址(只需要简短地址即可)
                  如果跟axios没有关系，再向后台上传图片时，请求头中不会携带token，所以不会成功
              2️⃣自定义请求头headers（携带token）==> 对象：Authorization = Bearer ${store.getUser().token}
              3️⃣show-file-list是显示文件列表
              4️⃣on-success属性指定的函数作用：上传图片成功的钩子函数（回调函数）
                  ==> 上传成功后，获取图片的地址
                  ==> 这个函数的三个形参：function(response, file, fileList)
              5️⃣v-if 和 v-else 的使用:
                  ==> imageUrl  接收上传成功之后的地址;有数据：预览;没数据：上传按钮
              6️⃣name  是指定上传文件数据的字段名称，和接口保持一致   -->
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleSuccess"
          name="image">
          <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-tab-pane>

      </el-tabs>

      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
// 导入store模块,供请求头使用
import store from '@/store'

// 导入默认图
import defaultImage from '../assets/images/default.png'

export default {
  // 在组件里定义一个name属性，给组件取名称，供全局调用
  name: 'my-image',

  // 子组件内部props接收数据==value是父组件传入的图片地址
  props: ['value'],

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

      // 记录选中图片的url地址
      selectedImageUrl: null,

      // 上传图片请求头声明(携带token)
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },

      // 预览图的地址 -- 上传成功后再切换到图片
      uploadImageUrl: null,

      // 声明 图片按钮：默认图src地址
      // confirmSrc: defaultImage
      // 默认图数据
      defaultImage
    }
  },

  methods: {
    // 打开 对话框 触发事件
    openDialog () {
      this.dialogVisible = true

      //  重置清空选中的图片数据
      this.activeName = 'image'
      this.selectedImageUrl = null
      this.uploadImageUrl = null

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
    },

    // 点击选中的图片触发事件 -- 传入后台url为图片唯一标识，渲染显示图片
    selectedImage (url) {
      // 点击当前选中的图片地址，赋值给url
      this.selectedImageUrl = url
    },

    // 上传图片成功函数
    handleSuccess (res) {
      // 成功后提示
      this.$message.success('上传图片成功')

      // 获取后台给的地址，赋值给imageUrl,就可以预览效果
      /* console.log(res) // {message: "OK", data: {…}} -- 所以res.data.data.url这是axios方式拿到的图片地址
      但是现在是res.data.url就是图片地址,res是响应主体 */
      this.uploadImageUrl = res.data.url
    },

    // click确定图片 -- 判断用的是什么图
    confirmImage () {
      // 定义一个为空的url地址
      let url = null

      if (this.activeName === 'image') { // 使用selectedImageUrl
        // 如果没有选择图片，就确定- 提示
        if (!this.selectedImageUrl) return this.$message.info('请选择素材图片')
        // 接收对应的素材库选中图片的url地址
        url = this.selectedImageUrl
      } else { // 使用uploadImageUrl
        if (!this.uploadImageUrl) return this.$message.info('请上传图片')
        // 接收对应的上传图片的url地址
        url = this.uploadImageUrl
      }

      // 给图片按钮的src地址 赋值
      // this.confirmSrc = url
      // 将确定的地址传给父组件
      this.$emit('input', url)

      // 关闭对话框
      this.dialogVisible = false
    }

  }
}
</script>

<style lang="less" scoped>
.img-container{
  // inline-block行内块：一行显示多个，可设宽高
  display: inline-block;
  margin-right: 20px;
}
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
        &.selected{
          &::after{
            // .imgItem.selected:::after 给图片做选中效果
            content:'';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.3) url(../assets/images/selected.png) no-repeat center / 50px;
          }
        }

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

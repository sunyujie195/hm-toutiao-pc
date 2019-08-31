<template>
  <div class="container">
    <el-card>
      <!-- image头部 -->
      <div slot="header">
        <!-- 使用封装的面包屑组件 -->
        <my-bread>素材管理</my-bread>
      </div>

      <!-- 按钮组 -->
      <el-radio-group v-model="reqParams.collect" size="small" @change="toggleCollect">
        <el-radio-button label="false">全部</el-radio-button>
        <el-radio-button label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" size="small" style="float:right">添加素材</el-button>

      <!-- 图片列表 -->
      <div class="imgList">
        <!-- 一张图片布局   -->
        <!-- 这里遍历一张图片时 in 10 表示遍历10次数
            <div class="imgItem" v-for="item in 10" :key="item">
            当获取到图片列表数据后，这里不再遍历次数，而是遍历拿到的数据 => 数组里包含对象
            :key唯一标识指向对象，但是key必须是字符串或者number类型，所以取出id
        -->
        <div class="imgItem" v-for="item in imageData" :key="item.id">
            <!-- 动态绑定：url表示图片地址 -->
            <img :src="item.url" alt="">
            <div class="footer">
                <!-- :class="{red:item.is_collected}"  class属性绑定：判断当前图片是否收藏,并将当前已经收藏的图片渲染出来-->
                <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="changeStatus(item)"></span>
                <!-- 删除图片函数 传入id-->
                <span class="el-icon-delete" @click="delImage(item.id)"></span>
            </div>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
        hide-on-single-page
        ></el-pagination>
        <!-- page-size：每页显示条目个数
             current-page：(显示)当前页码
            两项动态绑定，不写死，以便可以从声明的所有数据对象reqParams中获取
            点击切换页码，就是改变页码事件current-change，给当前页码current-page绑定click事件
          hide-on-single-page表示只有一页时是否隐藏分页组件，false为隐藏
        -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 看api获取用户图片素材返回的数据
      reqParams: {
        // collect表示收藏，true为收藏，false为全部
        collect: false,
        page: 1,
        per_page: 10
      },

      // 图片列表数据
      imageData: [],

      // 图片总张数(最开始没有数据)
      total: 0
    }
  },

  created () {
    // 调用图片列表数据
    this.getimageData()
  },

  methods: {
    // 获取图片列表
    async getimageData () {
      // data.results 是图片列表
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      // 赋值给图片列表数据
      this.imageData = data.results

      // 在获取文章列表时拿到文章的总条数(data.total_count)，赋值给分页
      this.total = data.total_count
    },

    // 改变页码触发事件函数
    changePager (newPage) {
      // 将改变的页码重新赋值给页码数据，然后更新图片列表
      this.reqParams.page = newPage
      this.getimageData()
    },

    // 切换全部与收藏按钮触发事件
    toggleCollect () {
      // 让每次点击按钮筛选后，页码都重置到1
      this.reqParams.page = 1
      // 获取图片列表数据
      this.getimageData()
    },

    // 点击收藏图标触发事件并发送put请求 -- 改变收藏状态
    async changeStatus (item) {
      // put请求传参 == collect是否收藏,false-取消收藏,true-添加收藏 == collect: !item.is_collected 取反,因为true是收藏
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      // 发送成功提示消息   data.collect 必须(是否收藏)
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 然后更新列表 ==> 重新获取数据(刷新)---->按照后台的排序会更新图片的顺序----->图片的位置改变---->用户体验不好
      // 只用更新当图片的状态即可
      item.is_collected = data.collect
    },

    // 点击删除图标删除图片触发的事件 -- 根据id发送delete请求弹出确认框
    delImage (id) {
      // 确认框
      this.$confirm('老铁，此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除成功发送delete请求
        await this.$http.delete(`user/images/${id}`)
        // 删除成功提示消息
        this.$message.success('删除图片成功')
        // 更新图片列表数据
        this.getimageData()
      }).catch(() => {
        //  取消删除
      })
    }

  }
}
</script>

<style lang="less" scoped>
.imgList{
    margin-top: 20px;
    .imgItem{
        width: 160px;
        height: 160px;
        // dashed虚线
        border: 1px dashed #ddd;
        // inline-block行内块：一行显示多个，可设宽高
        display: inline-block;
        margin-right: 50px;
        margin-bottom: 20px;
        // 子绝父相
        position: relative;
        img{
            width: 100%;
            height: 100%;
            // block块：独占一行，可设宽高
            display: block;
        }
        .footer{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            color: #fff;
            // rgba设置透明度
            background: rgba(0,0,0,0.3);
            text-align: center;
            span{
                margin: 0 20px;
                &.red{
                    color:red
                }
            }
        }
    }
}
.el-pagination{
    text-align: center;
}
</style>

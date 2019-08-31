<template>
  <div class="container">
    <el-card>
      <!-- image头部 -->
      <div slot="header">
        <!-- 使用封装的面包屑组件 -->
        <my-bread>素材管理</my-bread>
      </div>

      <!-- 按钮组 -->
      <el-radio-group v-model="reqParams.collect" size="small">
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
                <!-- class属性绑定：判断当前图片是否收藏,并将当前已经收藏的图片渲染出来-->
                <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
                <span class="el-icon-delete"></span>
            </div>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
      imageData: []
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

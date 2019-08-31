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
        <!-- 一张图片布局                   这里遍历一张图片时 in 10 表示遍历10次数-->
        <div class="imgItem" v-for="item in 10" :key="item">
            <img src="../../assets/images/avatar.jpg" alt="">
            <div class="footer">
                <span class="el-icon-star-off"></span>
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
      }
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
            }
        }
    }
}
.el-pagination{
    text-align: center;
}
</style>

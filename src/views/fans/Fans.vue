<template>
  <div class="container">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>

      <!-- tab栏切换 -->
      <el-tabs v-model="activeName" type="card">

        <el-tab-pane label="粉丝列表" name="list">
          <!-- 粉丝列表 -->
          <div class="fansList">
            <div class="fansItem" v-for="item in 24" :key="item">
              <!-- Avatar 头像组件 -->
              <el-avatar :size="80" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi"></el-avatar>
              <p>粉丝名称</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="粉丝画像" name="photo">
          <!-- 粉丝画像:需要配置 -->
        </el-tab-pane>

      </el-tabs>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 激活tab选项
      activeName: 'list'
    }
  }
}
</script>

<style lang="less" scoped>
.fansItem{
  width: 120px;
  height: 170px;
  border: 1px dashed #ddd;
  text-align: center;
  padding-top: 10px;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  p{
    font-size: 12px;
  }
}
</style>

<template>
  <div class="container">
    <el-card>
        <!-- 头部 -->
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>

      <!-- 表格组件 -->
      <el-table :data="commentsData">
        <el-table-column prop="title" label="标题" width="400px"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
            <template slot-scope="scope">
                    <!-- 状态为true是正常 -->
                    {{scope.row.comment_status ? '正常' : '关闭'}}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
                <el-button type="danger" size="small" v-if="scope.row.comment_status" @click="toggleStatus(scope.row)">关闭评论</el-button>
                <el-button type="success" size="small" v-else @click="toggleStatus(scope.row)">打开评论</el-button>
            </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage"
        ></el-pagination>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 评论文章数据:对象数组
      commentsData: [],

      //   提交给后台数据对象
      reqParams: {
        // comment 返回用于评论管理的字段
        response_type: 'comment',
        page: 1,
        // 每页20条
        per_page: 20
      },

      // 文章总条数(最开始没有数据)
      total: 0

    }
  },

  // 当在组件初始化时 才要获取数据
  created () {
    this.getComments()
  },

  methods: {
    // 获取评论列表数据
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      // console.log(data) // {total_count: 3, page: 1, per_page: 20, results: Array(0)}
      this.commentsData = data.results
    },

    // 改变页码触发事件函数
    changePage (num) {
      // 将改变的页码重新赋值给页码数据，然后更新文章列表
      this.reqParams.page = num
      this.getComments()
    },

    // 切换文章的评论状态 -- row表示当前行
    async toggleStatus (row) {
      // allow_comment 是否允许评论
      // !row.comment_status 取反是因为 评论状态 和 操作栏的按钮allow_comment 操作状态相反
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
      // 成功后提示  更新列表（局部更新  修改当前行数据中的状态）
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      // 更新列表（局部更新  修改的当前行数据状态与后台返回数据状态要一致）
      row.comment_status = data.allow_comment
    }

  }

}
</script>

<style lang="less" scoped>
.el-pagination{
    text-align: center;
    margin-top: 30px;
}
</style>

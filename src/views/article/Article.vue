<template>
    <div class='container'>

        <!-- 筛选项 -->
        <el-card class="box-card">
            <!-- 筛选项卡片的头部 -->
            <div slot="header">

                <!-- 使用封装的面包屑组件 -->
                <my-bread>内容管理</my-bread>

            </div>
            <!-- 筛选项卡片的表单 -->
            <el-form label-width="80px" size="samll">
                <!-- label-width="80px"表示文字说明的宽度，size="samll"表单的尺度大小 -->
                <el-form-item label="状态：">
                    <!-- 单选框组 -->
                    <el-radio-group v-model="reqParams.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="频道：">
                    <!-- Select 选择器 -->
                    <el-select v-model="reqParams.channel_id" placeholder="请选择">
                        <el-option
                        v-for="item in channelOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="日期：">
                    <el-date-picker
                        v-model="dataArr"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 筛选结果 -->
        <el-card>
            <!-- 筛选结果头部 -->
            <div slot="header">根据筛选条件共查询到 0 条结果：</div>
            <!-- 筛选结果表格 -->
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </el-card>

    </div>
</template>

<script>
// 引入myBread组件
import MyBread from '@/components/my-bread.vue'

export default {
  // 注册组件
  components: { MyBread },

  data () {
    return {
    // 提交请求给后台的参数对象
    // 通过axios提交给后台，status字段的值为null，这项数据不会提交
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },

      // 频道下拉框中的数据
      channelOptions: [
        { id: 1, name: 'php' }
      ],

      // 日期数据  格式数组 [起始日期，结束日期]
      dataArr: [],

      //  表格数据
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }
      ]

    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
    margin-bottom: 20px;
}
.el-button{
    font-size: 12px;
}
.el-pagination{
    text-align: center;
    margin-top: 30px;
}
</style>

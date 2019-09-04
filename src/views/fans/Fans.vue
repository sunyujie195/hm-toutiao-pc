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
            <!-- item.id是使用json-bigint插件，转换后的数据格式是对象，唯一选项key不能为对象，所以要转换string -->
            <div class="fansItem" v-for="item in fansList" :key="item.id.toString()">
              <!-- Avatar 头像组件 -->
              <el-avatar :size="80" src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
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
        </el-tab-pane>

        <el-tab-pane label="粉丝画像" name="photo">
          <!-- 粉丝画像:需要配置 -->
          <!-- 2.为 ECharts 准备一个具备大小(宽高)的 DOM容器
                要操作dom元素，在vue里是 ref 拿dom元素-->
          <div ref="dom" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 1.引入echarts插件
import echarts from 'echarts'

export default {
  data () {
    return {
      // 激活tab选项
      activeName: 'list',

      // 提交后台数据
      reqParams: {
        page: 1,
        per_page: 24
      },

      // 粉丝列表
      fansList: [],

      // 总条数
      total: 0
    }
  },

  created () {
    this.getfansList()
  },

  mounted () {
    // 3.组件渲染完毕后，供echarts插件获取dom元素
    const dom = this.$refs.dom
    const myEcharts = echarts.init(dom)
    // 4.进行配置项
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    // 5.使用配置项
    myEcharts.setOption(option)
  },

  methods: {
    // 获取粉丝列表
    async getfansList () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      // results是 item 类型的object[id、name、photo]
      this.fansList = data.results
      // 总条数赋值
      this.total = data.total_count
    },

    // 改变页码触发事件函数
    changePager (newPage) {
      // 将改变的页码重新赋值给页码数据，然后更新fans列表
      this.reqParams.page = newPage
      this.getfansList()
    }

  }
}
</script>

<style lang="less" scoped>
.fansItem {
  width: 120px;
  height: 170px;
  border: 1px dashed #ddd;
  text-align: center;
  padding-top: 10px;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  p {
    font-size: 12px;
  }
}
</style>

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
                  <!-- 这里使用封装的频道组件     父传子值 : v-model === :value @input-->
                  <my-channel v-model="reqParams.channel_id"></my-channel>
                </el-form-item>

                <el-form-item label="日期：">
                    <el-date-picker
                        v-model="dateArr"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="changeDate"
                        value-format="yyyy-MM-dd"
                        >
                        <!-- 给选择日期范围后触发的函数(事件)：value-format是组件绑定的值，格式与绑定值要一致 -->
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="search">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!------------------------------------------------------------- 筛选结果 -->
        <el-card>
            <!-- 筛选结果头部                   这里渲染文章总条数-->
            <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
            <!-- 筛选结果表格 -->
            <el-table :data="articleData">
                <!-- :data="articleData"给 table 动态绑定data对象数组
                  prop取得是遍历时每一条数据中data背后的值 => prop 作用把字段背后的值 渲染在列位置 => 列组件用 prop属性 来对应对象中的键名即可填入数据
                  封面图片是 data.data.results.0.cover.images[0] 默认取第一张图片=>得到的是图片的路径地址字符串
                  但是需要的图片img，所以用slot额外给封面内容插入渲染图片 => 自定义列表格
                  渲染图片时需要动态绑定数据=>使用作用域插槽
                -->
                <el-table-column prop="date" label="封面">
                    <!-- 自定义列表格模板 -->
                    <template slot-scope="scope">
                        <!-- row是表示当前行 => 在组件内部遍历articleData数组的每一项，在slot上用row传入内容，row相当于数组的每一条数据-->
                        <el-image :src="scope.row.cover.images[0]" style="width:160px;heigth:100px;border:1px solid #ddd" fit="contain">
                            <!-- fit是确定图片平铺容器框方式 ==> fill填满、contain包含、cover铺满容器,等比例缩放,不会压缩、none没有一个、scale-down按比例缩减 -->
                            <div slot="error" class="image-slot">
                                <!-- 处理加载失败图片 -->
                                <img src="../../assets/images/error.gif" width="160px" height="100px" alt="">
                            </div>
                        </el-image>
                    </template>
                </el-table-column>

                <el-table-column prop="title" label="标题"></el-table-column>

                <el-table-column label="状态">
                    <!-- 这里的prop不能显示自定义内容 -->
                    <template slot-scope="scope">
                      <!-- {{scope.row.id}} 这是测试 数字最大安全值 是否转换成功 -->

                        <!-- tag标签组件：不同颜色标签代表不同的语境、不同的状态
                            判断：当接收作用域插槽上所有绑定的数据scope对象中row.status为0或1，2，3，4时,对应的就是谁的相应的状态
                            状态是 data.data.results.0.status
                        -->
                        <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
                        <el-tag v-if="scope.row.status === 1">待审核</el-tag>
                        <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
                        <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
                        <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="pubdate" label="发布日期"></el-table-column>

                <el-table-column label="操作" width="120px">
                    <!-- 增加width将操作列靠右边，其它列不加width让其自定义宽度 -->
                    <template slot-scope="scope">
                            <!-- plain定义朴素button -->
                            <el-button type="primary" icon="el-icon-edit" circle plain @click="$router.push('/publish?id='+scope.row.id)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="delArticle(scope.row.id)" circle plain></el-button>
                            <!-- 这里添加事件@click="delArticle(scope.row.id)"做删除功能传入id，上面插槽定义变量对象scope，下面要使用才行 -->
                    </template>
                </el-table-column>

            </el-table>
            <!--------------------------------------------- 分页组件   :total="total"重新赋值-->
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="reqParams.per_page"
                :current-page="reqParams.page"
                @current-change="changePage"
            ></el-pagination>
            <!-- page-size：每页显示条目个数
                 current-page：(显示)当前页码
                 两项动态绑定，不写死，以便可以从声明的所有数据对象reqParams中获取
              点击切换页码，就是改变页码事件current-change，给当前页码current-page绑定click事件
            -->
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
        status: null, // 文章状态
        channel_id: null, // 频道id
        begin_pubdate: null, // 起始时间
        end_pubdate: null, // 截止时间
        page: 1, // 页码数
        per_page: 20 // 每一页的数量
      },

      // 日期数据=>格式数组 [起始日期，结束日期]
      dateArr: [],

      //  表格数据
      articleData: [],

      // 文章总条数(最开始没有数据)
      total: 0
    }
  },

  created () {
    // 调用文章列表数据
    this.getarticleData()
  },

  methods: {

    // 获取表格中的文章列表
    async getarticleData () {
      // data.results 是文章列表
      // 在post请求 =>  post(url,数据)
      // 在get请求 =>  get(url,{params:数据})
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      // 赋值
      this.articleData = data.results

      // 在获取文章列表时拿到文章的总条数(data.total_count)，赋值给分页
      this.total = data.total_count
    },

    // 改变页码触发事件函数
    changePage (num) {
      // 将改变的页码重新赋值给页码数据，然后更新文章列表
      this.reqParams.page = num
      this.getarticleData()
    },

    // 选择日期范围后触发的函数
    changeDate (valueArr) {
      // 1.首先valueArr是选中的日期范围值  [起始日期，结束日期]
      // 2.选择完后就清空功能 valueArr === null
      if (valueArr) {
        this.reqParams.begin_pubdate = valueArr[0]
        this.reqParams.end_pubdate = valueArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },

    // 点击筛选按钮触发事件
    search () {
      // // 1.频道选项,清空功能,清空之后的值是 "" 而不是null，所以要赋值 --- 让封装的子组件自己处理
      // if (this.reqParams.channel_id === '') {
      //   this.reqParams.channel_id = null
      // }
      // 2.将页码重置为1
      this.reqParams.page = 1
      // 3.根据新条件筛选数据，去重新获取文章数据
      this.getarticleData()
    },

    // 删除功能
    delArticle (id) {
      // 1.确认框
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 2.点击确认发送axios请求根据id删除当前行文章    ==> Method： delete 删除属性
        // articles/:target地址url  => :target是id  => vue基础学习axios时遇到过
        await this.$http.delete(`articles/${id}`)
        // 提示
        this.$message.success('删除成功!')
        // 删除成功后再重新获取文章列表数据
        this.getarticleData()
      }).catch(() => {
        // 3.点击取消
      })
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
